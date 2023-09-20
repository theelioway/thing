"use strict"

/** The perfect union between two lists. */
export const union = (l1, l2) => {
  let s1 = new Set(l1)
  let s2 = new Set(l2)
  let unified = new Set([...s1, ...s2])
  return [...unified]
}

export default union
