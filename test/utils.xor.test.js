"use strict"
import { should } from "chai"
import { difference, union } from "lodash-es"
import xor from "../utils/xor.js"

should()

let xorTests = [
  [[], [], []],
  [[false], [], [false]],
  [[], [false], [false]],
  [[false], [false], []],
  [[true], [true], []],
  [[], [true], [true]],
  [[true], [], [true]],
  [[true], [false], [true, false]],
  [[false], [true], [false, true]],
  [[false, true], [true], [false]],
  [[false, true], [false], [true]],
  [[1], [1], []],
  [[1], [], [1]],
  [[], [1], [1]],
  [[1], [2], [1, 2]],
  [[1], [1, 2], [2]],
  [[1, 2], [2], [1]],
  [[1], [1], []],
  [[1, 2, 1], [1], [2]],
  [[1], [1, 2, 1], [2]],
  [[1, 2, 3], [3, 2, 1], []],
  [
    [1, 2, 3],
    [4, 3, 2],
    [1, 4],
  ],
  [
    [6, 9, 8, 5],
    [4, 3, 2, 7, 1],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
  ],
  [
    [1, 2],
    [2, 3],
    [1, 3],
  ],
  [[1, 2], [1, 2, 3], [3]],
  [
    [1, 3],
    [2, 3],
    [1, 2],
  ],
  [[1, 2, 3], [1, 2, 3], []],
  [
    [1, 2, 3],
    [4, 2, 3],
    [4, 1],
  ],
]

let speedTests = 5000

describe("utils | _.<xor>", () => {
  for (let [l1, l2, expectXor] of xorTests) {
    it(`lodash version for ${l1} + ${l2} == ${expectXor}`, () => {
      let res = union(difference(l1, l2), difference(l2, l1))
      res.should.have.members(expectXor)
    })
  }
})

describe("utils | xor", () => {
  for (let [l1, l2, expectXor] of xorTests) {
    it(`xor either way ${l1} + ${l2} == ${expectXor}`, () => {
      let res = xor(l1, l2)
      res.should.have.members(expectXor)
    })
  }
})

describe("utils | xor", () => {
  it("xor faster than lodash", () => {
    let stamp = Date.now()
    for (let i = 0; i < speedTests; i++) {
      for (let [l1, l2, _] of xorTests) {
        union(difference(l1, l2), difference(l2, l1))
      }
    }
    const lodashTime = Date.now() - stamp  
    stamp = Date.now()
    for (let i = 0; i < speedTests; i++) {
      for (let [l1, l2, _] of xorTests) {
        xor(l1, l2)
      }
    }
    const xorTime = Date.now() - stamp
    xorTime.should.be.lt(lodashTime)
  })
})
