const should = require("chai").should()
const Crispr = require("../crispr")
const space = require("./space")

describe("class | Crispr | crispify space", () => {
  it("Maps Models and Fields", () => {
    let crispr = new Crispr(space["@graph"], "d:/", [])
    crispr.domain.should.equal("d:/")

    crispr.MODELS.size.should.equal(16)
    crispr.MODELS.should.have.deep.keys([
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
    ])

    crispr.FIELDS.size.should.equal(11)
    crispr.FIELDS.should.have.deep.keys([
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
    ])

    crispr.PRIMTS.size.should.equal(11)
    crispr.PRIMTS.should.have.deep.keys(
      ["Boolean", "DateTime", "Date", "Number", "Text", "Time"].concat(
        // + Sub Classes of Primitive
        ["Duration", "Float", "Integer", "Quantity", "URL"]
      )
    )
  })
})
