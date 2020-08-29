const should = require("chai").should()
const ThingBuilder = require("../thing-builder")
const space = require("./fixtures/space")

describe("class | ThingBuilder | schemify space", () => {
  it.only("Maps Models and Fields", () => {
    let thingBuilder = new ThingBuilder(space["@graph"], "d:/", [])
    thingBuilder.domain.should.equal("d:/")

    thingBuilder.MODELS.size.should.equal(16)
    thingBuilder.MODELS.should.have.deep.keys([
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

    thingBuilder.FIELDS.size.should.equal(11)
    thingBuilder.FIELDS.should.have.deep.keys([
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

    thingBuilder.PRIMTS.size.should.equal(11)
    thingBuilder.PRIMTS.should.have.deep.keys(
      ["Boolean", "DateTime", "Date", "Number", "Text", "Time"].concat(
        // + Sub Classes of Primitive
        ["Duration", "Float", "Integer", "Quantity", "URL"]
      )
    )
  })
})
