const should = require("chai").should()
const Schema = require("../schema")
const space = require("./space")

describe("class | Schema | schemify space", () => {
  it("Maps Models and Fields", () => {
    let schema = new Schema(space["@graph"], "d:/", [])
    schema.domain.should.equal("d:/")

    schema.MODELS.size.should.equal(16)
    schema.MODELS.should.have.deep.keys([
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

    schema.FIELDS.size.should.equal(11)
    schema.FIELDS.should.have.deep.keys([
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

    schema.PRIMTS.size.should.equal(11)
    schema.PRIMTS.should.have.deep.keys(
      ["Boolean", "DateTime", "Date", "Number", "Text", "Time"].concat(
        // + Sub Classes of Primitive
        ["Duration", "Float", "Integer", "Quantity", "URL"]
      )
    )
  })
})
