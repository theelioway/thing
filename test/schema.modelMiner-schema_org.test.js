const Schema = require("../schema")
const should = require("chai").should()
const fs = require("fs")

const schema_path =
  "/home/tim/repo/elioway/eliothing/schema/schemaorg/data/releases/3.9/all-layers.jsonld"
const schema_contents = fs.readFileSync(schema_path, "utf-8")
const SCHEMA = JSON.parse(schema_contents)

describe("class | Schema | modelMiner schemaorg", () => {
  before(() => {
    this.fixedPrimitives = [
      "Boolean",
      "Date",
      "DateTime",
      "Number",
      "Text",
      "Time",
      "Quantity", // Put this here to resolve Distance, Duration, Energy, Mass as Primitive.
    ]
    this.schema = new Schema(
      SCHEMA["@graph"],
      "http://schema.org/",
      this.fixedPrimitives
    )
  })

  it("Thing", () => {
    let modelsMined = this.schema.modelMiner(["Thing"])
    modelsMined.should.have.members(["Thing"])
  })

  it("Thing at depth 0", () => {
    let modelsMined = this.schema.modelMiner(["Thing"], 0)
    modelsMined.should.have.members(["Thing"])
  })

  it("Thing at depth 1", () => {
    let thus = [
      "Action",
      "CreativeWork",
      "Event",
      "ImageObject",
      "Intangible",
      "MediaObject",
      "PropertyValue",
      "Thing",
      "StructuredValue",
    ]
    let modelsMined = this.schema.modelMiner(["Thing"], 1)
    modelsMined.should.have.members(thus)
  })

  it("Thing at depth 2", () => {
    let thus = [
      "Thing",
      "ImageObject",
      "PropertyValue",
      "CreativeWork",
      "Event",
      "Action",
      "MediaObject",
      "Place",
      "Organization",
      "Person",
      "Clip",
      "Audience",
      "QuantitativeValue",
      "AlignmentObject",
      "PublicationEvent",
      "Review",
      "AggregateRating",
      "ItemList",
      "Offer",
      "Language",
      "Product",
      "InteractionCounter",
      "Rating",
      "DefinedTerm",
      "Comment",
      "CorrectionComment",
      "StructuredValue",
      "Intangible",
      "Enumeration",
      "EventStatusType",
      "PostalAddress",
      "ActionStatusType",
      "EntryPoint",
      "ContactPoint",
    ]
    let modelsMined = this.schema.modelMiner(["Thing"], 2)
    modelsMined.should.have.members(thus)
  })

  /**Three tier subclasses otherwise only primitive types because no depth.*/
  it("MusicComposition at depth 0", () => {
    let thus = ["CreativeWork", "MusicComposition", "Thing"]
    let modelsMined = this.schema.modelMiner(["MusicComposition"])
    modelsMined.should.have.members(thus)
  })

  /**Four tier multi subclasses (LocalBusiness=Place+Org) otherwise primitive types.*/
  it("Notary at depth 0", () => {
    let thus = [
      "LegalService",
      "LocalBusiness",
      "Notary",
      "Organization",
      "Place",
      "Thing",
    ]
    let modelsMined = this.schema.modelMiner(["Notary"])
    // Subclass dependency otherwise primitive types.
    modelsMined.should.have.members(thus)
  })

  /**Highest dependency with many, many more primitive types.*/
  for (let [depth, modelCount] of Object.entries({
    3: 70,
    4: 85,
    5: 89,
    6: 91,
    7: 91, // eventually we reach a max
  })) {
    it(`Thing at depth ${depth}`, () => {
      let modelsMined = this.schema.modelMiner(["Thing"], depth)
      modelsMined.length.should.be.equal(modelCount)
    })
  }
  /**Three tier subclasses with depth.*/
  for (let [depth, modelCount] of Object.entries({
    1: 7,
    2: 48,
    3: 83,
    4: 94,
    5: 97,
    6: 99,
    7: 99, // eventually we reach a max
  })) {
    it(`MusicComposition at depth ${depth}`, () => {
      let modelsMined = this.schema.modelMiner(["MusicComposition"], depth)
      modelsMined.length.should.be.equal(modelCount)
    })
  }
  /**Four tier multi subclasses (LocalBusiness=Place+Org) with depth.*/
  for (let [depth, modelCount] of Object.entries({
    1: 6,
    2: 35,
    3: 71,
    4: 87,
    5: 94,
    6: 96,
    7: 98,
    8: 98, // eventually we reach a max
  })) {
    it(`Notary at depth ${depth}`, () => {
      let modelsMined = this.schema.modelMiner(["Notary"], depth)
      modelsMined.length.should.be.equal(modelCount)
    })
  }
})
