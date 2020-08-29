const should = require("chai").should()
const ThingBuilder = require("../thing-builder")

before(() => {
  this.thingBuilder = new ThingBuilder(
    [
      { "@type": "rdfs:Class", "rdfs:label": "Cosmos" },
      { "@type": "rdfs:Class", "rdfs:label": "Bigness" },
      { "@type": ["rdfs:Class", "d:/DataType"], "rdfs:label": "Integer" },
      {
        "@type": "rdf:Property",
        "rdfs:label": "isBig",
        "d:/domainIncludes": { "@id": "d:/Cosmos" },
        "d:/rangeIncludes": [{ "@id": "d:/Bigness" }, { "@id": "d:/Text" }],
      },
    ],
    "d:/"
  )
})

describe("class | ThingBuilder | modelMiner tinyUniverse [Cosmos] Primitive Integer", () => {
  it("depth 0", () => {
    this.thingBuilder
      .modelMiner(["Cosmos"], { depth: 0 })
      .should.have.members(["Cosmos"])
  })
  it("depth 1", () => {
    this.thingBuilder
      .modelMiner(["Cosmos"], { depth: 1 })
      .should.have.members(["Cosmos", "Bigness"])
  })
  it("depth 2", () => {
    this.thingBuilder
      .modelMiner(["Cosmos"], { depth: 2 })
      .should.have.members(["Cosmos", "Bigness"])
  })
})

describe("class | ThingBuilder | modelMiner tinyUniverse [Cosmos] Primitive Text", () => {
  it("depth 0", () => {
    this.thingBuilder
      .modelMiner(["Cosmos"], { depth: 0 })
      .should.have.members(["Cosmos"])
  })
  it("depth 1", () => {
    this.thingBuilder
      .modelMiner(["Cosmos"], { depth: 1 })
      .should.have.members(["Cosmos", "Bigness"])
  })
})

describe("class | ThingBuilder | modelMiner tinyUniverse [Cosmos, Bigness] Primitive Text", () => {
  it("depth 0", () => {
    this.thingBuilder
      .modelMiner(["Cosmos", "Bigness"], { depth: 0 })
      .should.have.members(["Cosmos", "Bigness"])
  })
  it("depth 1", () => {
    this.thingBuilder
      .modelMiner(["Cosmos", "Bigness"], { depth: 1 })
      .should.have.members(["Cosmos", "Bigness"])
  })
})
