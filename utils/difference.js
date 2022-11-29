"use strict"

/* Returns items in the first list which are not in the second list.. */
module.exports = (l1, l2) => {
  let s1 = new Set(l1)
  let s2 = new Set(l2)
  let differing = new Set([...s1].filter(x => !s2.has(x)))
  return [...differing]
}
