import { u128, Context, ContractPromise } from "near-sdk-as";

/**
 * == TYPES ====================================================================
 */

/**
 * Account IDs in NEAR are just strings.
 */
export type AccountId = string;

/**
 * Gas is u64
 */
export type Gas = u64;

/**
 * Amounts, Balances, and Money in NEAR is are u128.
 */

export type Amount = u128;

export type Balance = Amount;

export type Money = Amount;

/**
 * Timestamp in NEAR is a number.
 */
export type Timestamp = u64;

/**
 * == CONSTANTS ================================================================
 *
 * ONE_NEAR = unit of NEAR token in yocto Ⓝ (1e24)
 * XCC_GAS = gas for cross-contract calls, ~5 Tgas (teragas = 1e12) per "hop"
 * MIN_ACCOUNT_BALANCE = 3 NEAR min to keep account alive via storage staking
 *
 * TODO: revist MIN_ACCOUNT_BALANCE after some real data is included b/c this
 *  could end up being much higher
 */

export const ONE_NEAR = u128.from("1000000000000000000000000");
export const XCC_GAS: Gas = 20_000_000_000_000;
export const MIN_ACCOUNT_BALANCE: u128 = u128.mul(ONE_NEAR, u128.from(3));

/**
 * == FUNCTIONS ================================================================
 */

/**
 * @function asNEAR
 * @param amount {u128} - Yocto Ⓝ token quantity as an unsigned 128-bit integer
 * @returns {string}    - Amount in NEAR, as a string
 *
 * @example
 *
 *    asNEAR(7000000000000000000000000)
 *    // => '7'
 */
export function asNEAR(amount: u128): string {
  return u128.div(amount, ONE_NEAR).toString();
}

/**
 * @function toYocto
 * @param amount {number} - Integer to convert
 * @returns {u128}        - Amount in yocto Ⓝ as an unsigned 128-bit integer
 *
 * @example
 *
 *    toYocto(7)
 *    // => 7000000000000000000000000
 */
export function toYocto(amount: number): u128 {
  return u128.mul(ONE_NEAR, u128.from(amount))
}

/**
 * Function to assert that the contract has called itself
 */
export function assert_self(): void {
  const caller = Context.predecessor
  const self = Context.contractName
  assert(caller == self, "Only this contract may call itself");
}

export function assert_single_promise_success(): void {
  const x = ContractPromise.getResults()
  assert(x.length == 1, "Expected exactly one promise result")
  assert(x[0].succeeded, "Expected PromiseStatus to be successful")
}
