const union = require("./union")
const _ = require("lodash")

module.exports = (l1, l2) => {
  let s1 = new Set(l1)
  let s2 = new Set(l2)
  return _.union(
    [...s1].filter(x => !s2.has(x)),
    [...s2].filter(x => !s1.has(x))
  )
}
