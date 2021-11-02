import { logging, RNG } from "near-sdk-core";

@nearBindgen
export class Yatzy {
  private DICE_AMOUNT: number = 5;
  private rng: RNG<u32> = new RNG<u32>(1, 6);
  private combinations: u32[] = [1, 2, 3, 4, 5, 6];

  how_to_play(): string {
    return "Players take turns rolling five dice. After each roll, the player chooses which dice to keep, and which to reroll. A player may reroll some or all of the dice up to two times on a turn. The player must put a score or zero into a score box each turn. The game ends when all score boxes are used. The player with the highest total score wins the game.";
  }

  @mutateState()
  choose_combination(
    combination: u32,
    currentTurn: string,
    points: string
  ): string {
    logging.log(`combination [${combination}]`);
    logging.log(`currentTurn [${currentTurn}]`);
    logging.log(`points [${points}]`);

    assert(
      currentTurn.length != 0,
      "There is no active round, please throw the dice first."
    );

    assert(
      this.combinations.indexOf(combination) > -1,
      `Wrong combination index [${combination}], plase try again with the correct number from 1 to 6.`
    );

    const index = combination - 1;
    const existingPoints = points.split(",");
    assert(
      existingPoints[index] == "",
      "This combination has already been played."
    );
    const diceAmount =
      this.DICE_AMOUNT - currentTurn.replaceAll(`${combination}`, "").length;
    logging.log(`diceAmount [${diceAmount}]`);
    const totalPoints = diceAmount * combination;
    existingPoints[index] = `${totalPoints}`;
    return existingPoints.join(",");
  }

  @mutateState()
  throw_dice(currentTurn: string): string {
    assert(
      currentTurn.length != 5,
      "Previous turn is not finished yet, please choose the combination from 1 to 6 in which you want to include your results."
    );
    let newTurn = "";
    for (let index = 0; index < this.DICE_AMOUNT; index++) {
      newTurn = newTurn.concat(`${this.rng.next() + 1}`);
    }
    logging.log(`throw dice result: ${newTurn.toString()}`);
    return newTurn;
  }
}
