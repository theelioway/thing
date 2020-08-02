const should = require("chai").should()
const Schema = require("../schema")

before(() => {
  this.schema = new Schema(
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

describe("class | Schema | modelMiner tinyUniverse [Cosmos] Primitive Integer", () => {
  it("depth 0", () => {
    this.schema.modelMiner(["Cosmos"], 0).should.have.members(["Cosmos"])
  })
  it("depth 1", () => {
    this.schema
      .modelMiner(["Cosmos"], 1)
      .should.have.members(["Cosmos", "Bigness"])
  })
  it("depth 2", () => {
    this.schema
      .modelMiner(["Cosmos"], 2)
      .should.have.members(["Cosmos", "Bigness"])
  })
})

describe("class | Schema | modelMiner tinyUniverse [Cosmos] Primitive Text", () => {
  it("depth 0", () => {
    this.schema.modelMiner(["Cosmos"], 0).should.have.members(["Cosmos"])
  })
  it("depth 1", () => {
    this.schema
      .modelMiner(["Cosmos"], 1)
      .should.have.members(["Cosmos", "Bigness"])
  })
})

describe("class | Schema | modelMiner tinyUniverse [Cosmos, Bigness] Primitive Text", () => {
  it("depth 0", () => {
    this.schema
      .modelMiner(["Cosmos", "Bigness"], 0)
      .should.have.members(["Cosmos", "Bigness"])
  })
  it("depth 1", () => {
    this.schema
      .modelMiner(["Cosmos", "Bigness"], 1)
      .should.have.members(["Cosmos", "Bigness"])
  })
})
