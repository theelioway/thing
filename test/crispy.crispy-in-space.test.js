const should = require("chai").should()
const Crispy = require("../crispy")
const space = require("./space")

describe("class | Crispy | crispify space", () => {
  it("Maps Models and Fields", () => {
    let crispy = new Crispy(space["@graph"], "d:/", [])
    crispy.domain.should.equal("d:/")

    crispy.MODELS.size.should.equal(16)
    crispy.MODELS.should.have.deep.keys([
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

    crispy.FIELDS.size.should.equal(11)
    crispy.FIELDS.should.have.deep.keys([
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

    crispy.PRIMTS.size.should.equal(11)
    crispy.PRIMTS.should.have.deep.keys(
      ["Boolean", "DateTime", "Date", "Number", "Text", "Time"].concat(
        // + Sub Classes of Primitive
        ["Duration", "Float", "Integer", "Quantity", "URL"]
      )
    )
  })
})
