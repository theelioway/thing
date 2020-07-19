const Crispr = require("../crispr")
const space = require("./space")

describe("class | Crispr | crispify space", () => {
  test("Maps Models and Fields", () => {
    let crispr = new Crispr(space["@graph"], "d:/", [])
    expect(crispr.domain).toBe("d:/")

    expect(crispr.models.size).toBe(16)
    expect([...crispr.models.keys()].sort()).toEqual(
      [
        "Cosmos",
        "Universe",
        "Galaxy",
        "SolarSystem",
        "Sun",
        "Planet",
        "Moon",
        "Belt",
        "Asteroid",
        "Gravitation",
        "Interestingness",
        "Satellite",
        "GPS",
        "CreativeForce",
        "ImageObject",
        "MeteorObject",
      ].sort()
    )

    expect(crispr.fields.size).toBe(11)
    expect([...crispr.fields.keys()].sort()).toEqual(
      [
        "name",
        "isInteresting",
        "milkiness",
        "qualifications",
        "naics",
        "email",
        "sunny",
        "moonShine",
        "image",
        "belt",
        "satelliteName",
      ].sort()
    )

    expect(crispr.primts.size).toBe(11)
    expect([...crispr.primts.keys()].sort()).toEqual(
      ["Boolean", "DateTime", "Date", "Number", "Text", "Time"]
        .concat(
          // + Sub Classes of Primitive
          ["Duration", "Float", "Integer", "Quantity", "URL"]
        )
        .sort()
    )
  })
})
