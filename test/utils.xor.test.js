const should = require("chai").should()
const xor = require("../utils/xor")
const _ = require("lodash")

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

let speedTests = 11111

describe("utils | _.<xor>", () => {
  for (let [l1, l2, expectXor] of xorTests) {
    it(` xor either way ${l1} - ${l2} == ${expectXor}`, () => {
      let res = _.union(_.difference(l1, l2), _.difference(l2, l1))
      res.should.have.members(expectXor)
    })
  }
})

describe("utils | xor", () => {
  for (let [l1, l2, expectXor] of xorTests) {
    it(`finds xor either way ${l1} - ${l2} == ${expectXor}`, () => {
      let res = xor(l1, l2)
      res.should.have.members(expectXor)
    })
  }
})

describe("utils | _.<xor>", () => {
  it.skip("tis faster", () => {
    let stamp = Date.now()
    for (let i = 0; i < speedTests; i++) {
      for (let [l1, l2, expectXor] of xorTests) {
        let res = _.union(_.difference(l1, l2), _.difference(l2, l1))
      }
    }
    ;(Date.now() - stamp).should.be.lt(speedTests / 75)
  })
})

describe("utils | xor", () => {
  it.skip("tis faster", () => {
    let stamp = Date.now()
    for (let i = 0; i < speedTests; i++) {
      for (let [l1, l2, expectXor] of xorTests) {
        let res = xor(l1, l2)
      }
    }
    ;(Date.now() - stamp).should.be.lt(speedTests / 75)
  })
})
