const should = require("chai").should()
const difference = require("../utils/difference")
const _ = require("lodash")

let differenceTests = [
  [[1, 2, 3], [4, 3, 2], [1]],
  [
    [6, 9, 8, 5],
    [4, 3, 2, 7, 1],
    [6, 9, 8, 5],
  ],
  [[true], [false], [true]],
  [[true, false], [false, true], []],
  [[1, 2, 3], [3, 2, 1], []],
  [[1, 2, 1], [1], [2]],
  [[1], [1, 2, 1], []],
]

let speedTests = 11111

describe("utils | _.difference", () => {
  for (let [l1, l2, expectDifference] of differenceTests) {
    it(`spots whats missing in l2 ${l1} / ${l2} == ${expectDifference}`, () => {
      let res = _.difference(l1, l2)
      res.should.have.members(expectDifference)
    })
  }
})

describe("utils | difference", () => {
  for (let [l1, l2, expectDifference] of differenceTests) {
    it(`spots whats missing in l2 ${l1} / ${l2} == ${expectDifference}`, () => {
      let res = difference(l1, l2)
      res.should.have.members(expectDifference)
    })
  }
})

describe("utils | _.difference", () => {
  it.skip("tis fast", () => {
    let stamp = Date.now()
    for (let i = 0; i < speedTests; i++) {
      for (let [l1, l2, expectDifference] of differenceTests) {
        let res = _.difference(l1, l2)
      }
    }
    ;(Date.now() - stamp).should.be.lt(speedTests / 75)
  })
})

describe("utils | difference", () => {
  it.skip("tis faster", () => {
    let stamp = Date.now()
    for (let i = 0; i < speedTests; i++) {
      for (let [l1, l2, expectDifference] of differenceTests) {
        let res = difference(l1, l2)
      }
    }
    ;(Date.now() - stamp).should.be.lt(speedTests / 75)
  })
})
