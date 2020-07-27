module.exports = (l1, l2) => {
  let s1 = new Set(l1)
  let s2 = new Set(l2)
  let unified = new Set([...s1, ...s2])
  return [...unified]
}
