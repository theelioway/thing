"use strict"
import union from "./union.js"

/**Returns what is left in both lists because the function makes same values
 * in each list cancel each other out.
 * @tutorial Retains an item in the list if it is not in the other list.
 * @example
 * >> xor([], []) === []
 * >> xor([false], []) === [false]
 * >> xor([], [false]) === [false]
 * >> xor([false], [false]) === []
 * >> xor([true], []) === [true]
 * >> xor([], [true]) === [true]
 * >> xor([true], [true]) === []
 * >> xor([true, false], []) === [true, false]
 * >> xor([false], [true]) === [false, true]
 * >> xor([true, false], [true]) === [false]
 * >> xor([true, false], [false]) === [true]
 * >> xor([true, false], [false, true]) === []
 */
export const xor = (l1, l2) => {
  let s1 = new Set(l1)
  let s2 = new Set(l2)
  return union(
    [...s1].filter((x) => !s2.has(x)),
    [...s2].filter((x) => !s1.has(x)),
  )
}
export default xor
