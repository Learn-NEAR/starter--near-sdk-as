import { storage, Context } from "near-sdk-core"

@nearBindgen
export class Contract {
  private message: string = 'hello world'

  // return the string 'hello world'
  helloWorld(): string {
    return this.message
  }

  // read the given key from account (contract) storage
  read(key: string): string {
    if (storage.hasKey(key)) {
      return `✅ Key [ ${key} ] has value [ ${storage.getString(key)!} ]`
    } else {
      return `🚫 Key [ ${key} ] not found in storage. ( ${this.storageReport()} )`
    }
  }

  // write the given value at the given key to account (contract) storage
  @mutateState()
  write(key: string, value: string): string {
    storage.set(key, value)
    return `✅ Data saved. ( ${this.storageReport()} )`
  }

  // private helper method used by read() and write() above
  private storageReport(): string {
    return `storage [ ${Context.storageUsage} bytes ]`
  }
}
