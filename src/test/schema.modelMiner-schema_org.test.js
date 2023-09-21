"use strict"
import { should } from "chai"
import ThingBuilder from "../thing-builder.js"
import { schemaDomainUrl } from "../utils/get-schema.js"

should()

describe("class | ThingBuilder | modelMiner schemaorg 3.9", () => {
  const fixedPrimitives = [
    "Boolean",
    "Date",
    "DateTime",
    "Number",
    "Text",
    "Time",
    "Quantity", // Put this here to resolve Distance, Duration, Energy, Mass as Primitive.
  ]
  const thingBuilder = new ThingBuilder(
    "./schemaorg/data/releases/3.9/all-layers",
    schemaDomainUrl,
    fixedPrimitives,
  )

  it("Thing", () => {
    let modelsMined = thingBuilder.modelMiner(["Thing"])
    modelsMined.should.have.members(["Thing"])
  })

  it("Thing at depth 0", () => {
    let modelsMined = thingBuilder.modelMiner(["Thing"], { depth: 0 })
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
    let modelsMined = thingBuilder.modelMiner(["Thing"], { depth: 1 })
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
    let modelsMined = thingBuilder.modelMiner(["Thing"], { depth: 2 })
    modelsMined.should.have.members(thus)
  })

  /**Three tier subclasses otherwise only primitive types because no depth.*/
  it("MusicComposition at depth 0", () => {
    let thus = ["CreativeWork", "MusicComposition", "Thing"]
    let modelsMined = thingBuilder.modelMiner(["MusicComposition"])
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
    let modelsMined = thingBuilder.modelMiner(["Notary"])
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
      {
        depth: depth
      }
      let modelsMined = thingBuilder.modelMiner(["Thing"], {
        depth: depth,
      })
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
      let modelsMined = thingBuilder.modelMiner(["MusicComposition"], {
        depth: depth,
      })
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
      let modelsMined = thingBuilder.modelMiner(["Notary"], {
        depth: depth,
      })
      modelsMined.length.should.be.equal(modelCount)
    })
  }
})
