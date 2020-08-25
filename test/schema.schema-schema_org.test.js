const ThingBuilder = require("../thing-builder")
const should = require("chai").should()
const fs = require("fs")

const schema_path =
  "/home/tim/repo/elioway/eliothing/thingBuilder/schemaorg/data/releases/3.9/all-layers.jsonld"
const schema_contents = fs.readFileSync(schema_path, "utf-8")
const SCHEMA = JSON.parse(schema_contents)

describe("class | ThingBuilder | schemify schemaorg", () => {
  it("crispy_schema_versioning_members", () => {
    let fixedPrimitives = [
      "Boolean",
      "Date",
      "DateTime",
      "Number",
      "Text",
      "Time",
      "Quantity", // Put this here to resolve Distance, Duration, Energy, Mass as Primitive.
    ]
    let thingBuilder = new ThingBuilder(
      SCHEMA["@graph"],
      "http://SCHEMA.ORG/",
      fixedPrimitives
    )
    /**Correct as of 3.9.*/
    thingBuilder.MODELS.size.should.be.equal(795)

    let modelDefs = [...thingBuilder.MODELS.values()]
    let enumedModels = modelDefs.filter(m => m.enums.size)
    enumedModels.length.should.be.equal(49)

    let enumsSize = modelDefs.reduce((enumsTotalLength, m) => {
      return m.enums.size + enumsTotalLength
    }, 0)
    enumsSize.should.be.equal(264)

    thingBuilder.FIELDS.size.should.be.equal(1268)
    thingBuilder.PRIMTS.size.should.be.equal(16)
    thingBuilder.PRIMTS.should.have.deep.keys(
      fixedPrimitives.concat([
        "CssSelectorType",
        "Distance",
        "Duration",
        "Energy",
        "Float",
        "Integer",
        "Mass",
        "URL",
        "XPathType",
      ])
    )
  })
})
