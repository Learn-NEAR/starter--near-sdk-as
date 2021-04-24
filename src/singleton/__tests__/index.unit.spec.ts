import { Contract } from "../assembly";

let contract: Contract

beforeEach(() => {
  contract = new Contract()
})

describe("Contract", () => {
  // VIEW method tests

  it("says hello", () => {
    expect(contract.helloWorld()).toStrictEqual("hello world")
  })

  it("reads data", () => {
    expect(contract.read("some key")).toStrictEqual("🚫 Key [ some key ] not found in storage. ( storage [ 0 bytes ] )")
  })

  // CHANGE method tests

  it("saves data to contract storage", () => {
    expect(contract.write("some-key", "some value")).toStrictEqual("✅ Data saved. ( storage [ 18 bytes ] )")
  })
})
