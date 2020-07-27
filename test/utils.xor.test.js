const should = require("chai").should()
const xor = require("../utils/xor")
const _ = require("lodash")

let xorTests = [
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
  [[true], [false], [true, false]],
  [[true, false], [false, true], []],
  [[1, 2, 3], [3, 2, 1], []],
  [[1, 2, 1], [1], [2]],
  [[1], [1, 2, 1], [2]],
]

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
    for (let i = 0; i < 9999; i++) {
      for (let [l1, l2, expectXor] of xorTests) {
        let res = _.union(_.difference(l1, l2), _.difference(l2, l1))
      }
    }
    ;(Date.now() - stamp).should.be.lt(200)
  })
})

describe("utils | xor", () => {
  it.skip("tis faster", () => {
    let stamp = Date.now()
    for (let i = 0; i < 9999; i++) {
      for (let [l1, l2, expectXor] of xorTests) {
        let res = xor(l1, l2)
      }
    }
    ;(Date.now() - stamp).should.be.lt(200)
  })
})
