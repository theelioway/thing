const Crispr = require("../crispr")
const should = require("chai").should()
const fs = require("fs")

const schema_path =
  "/home/tim/repo/elioway/eliothing/crispr/schemaorg/data/releases/3.9/all-layers.jsonld"
const schema_contents = fs.readFileSync(schema_path, "utf-8")
const SCHEMA = JSON.parse(schema_contents)

describe("class | Crispr | crispify schemaorg", () => {
  it("crispr_schema_versioning_members", () => {
    let fixedPrimitives = [
      "Boolean",
      "Date",
      "DateTime",
      "Number",
      "Text",
      "Time",
      "Quantity", // Put this here to resolve Distance, Duration, Energy, Mass as Primitive.
    ]
    let crispr = new Crispr(
      SCHEMA["@graph"],
      "http://schema.org/",
      fixedPrimitives
    )
    /**Correct as of 3.9.*/
    crispr.MODELS.size.should.be.equal(795)
    crispr.FIELDS.size.should.be.equal(1268)
    crispr.PRIMTS.size.should.be.equal(16)
    crispr.PRIMTS.should.have.deep.keys(
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