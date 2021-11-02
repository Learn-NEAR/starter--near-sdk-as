import { storage, Context, logging } from "near-sdk-core";
import { Yatzy } from "./yatzy";

@nearBindgen
export class Contract {
  private game: Yatzy = new Yatzy();
  private currentTurn: string = "";
  private points: string = ",,,,,";
  
  // --------------------------------------------------------------------------
  // Public VIEW methods
  // --------------------------------------------------------------------------
  how_to_play(): string {
    return this.game.how_to_play();
  }

  current_turn(): string {
    return this.currentTurn.split("").join(" ");
  }

  current_points(): string {
    const array = this.points.split(",");
    let totalPoints = "";
    let score = 0;
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      score += element === "" ? 0 : <i32>parseInt(element);
      totalPoints += `${index + 1} - ${element === "" ? "0" : element};`;
    }
    return `Score: ${score}. Points: ${totalPoints}`;
  }

  // --------------------------------------------------------------------------
  // Public CHANGE methods
  // --------------------------------------------------------------------------
  @mutateState()
  end_round(combination: u32): string {
    this.assert_owner();
    this.points = this.game.choose_combination(
      combination,
      this.currentTurn,
      this.points
    );
    this.currentTurn = "";
    return this.points.split(",")[combination - 1];
  }

  @mutateState()
  start_round(): string {
    this.assert_owner();
    this.currentTurn = this.game.throw_dice(this.currentTurn);
    return this.currentTurn;
  }

  @mutateState()
  reset_game(): void {
    this.assert_owner();
    this.currentTurn = "";
    this.points = ",,,,,";
  }

  // read the given key from account (contract) storage
  read(key: string): string {
    if (isKeyInStorage(key)) {
      return `✅ Key [ ${key} ] has value [ ${storage.getString(key)!} ]`;
    } else {
      return `🚫 Key [ ${key} ] not found in storage. ( ${this.storageReport()} )`;
    }
  }

  // write the given value at the given key to account (contract) storage
  @mutateState()
  write(key: string, value: string): string {
    storage.set(key, value);
    return `✅ Data saved. ( ${this.storageReport()} )`;
  }

  // private helper method used by read() and write() above
  private storageReport(): string {
    return `storage [ ${Context.storageUsage} bytes ]`;
  }

  private assert_owner(): void {
    const caller = Context.predecessor;
    const sender = Context.sender;
    logging.log(`Caller: [${caller}]`);
    logging.log(`Self: [${sender}]`);
    assert(caller == sender, "Only the contract owner may call this contract.");
  }
}

/**
 * This function exists only to avoid a compiler error
 *

ERROR TS2339: Property 'contains' does not exist on type 'src/singleton/assembly/index/Contract'.

     return this.contains(key);
                 ~~~~~~~~
 in ~lib/near-sdk-core/storage.ts(119,17)

/Users/sherif/Documents/code/near/_projects/edu.t3/starter--near-sdk-as/node_modules/asbuild/dist/main.js:6
        throw err;
        ^

 * @param key string key in account storage
 * @returns boolean indicating whether key exists
 */
function isKeyInStorage(key: string): bool {
  return storage.hasKey(key);
}
