const should = require("chai").should()
const Crispr = require("../crispr")

describe("class | Crispr | modelMiner tinyUniverse [Cosmos] Primitive Integer", () => {
  beforeEach(() => {
    this.tinyUniverse = [
      { "@type": "rdfs:Class", "rdfs:label": "Cosmos" },
      { "@type": "rdfs:Class", "rdfs:label": "Bigness" },
      { "@type": ["rdfs:Class", "d:/DataType"], "rdfs:label": "Integer" },
      {
        "@type": "rdf:Property",
        "rdfs:label": "isBig",
        "d:/domainIncludes": { "@id": "d:/Cosmos" },
        "d:/rangeIncludes": [{ "@id": "d:/Bigness" }, { "@id": "d:/Text" }],
      },
    ]
  })

  it("depth 0", () => {
    new Crispr(this.tinyUniverse, "d:/")
      .modelMiner(["Cosmos"], 0)
      .should.have.members(["Cosmos"])
  })
  it("depth 1", () => {
    new Crispr(this.tinyUniverse, "d:/")
      .modelMiner(["Cosmos"], 1)
      .should.have.members(["Cosmos", "Bigness"])
  })
  it("depth 2", () => {
    new Crispr(this.tinyUniverse, "d:/")
      .modelMiner(["Cosmos"], 2)
      .should.have.members(["Cosmos", "Bigness"])
  })
})

describe("class | Crispr | modelMiner tinyUniverse [Cosmos] Primitive Text", () => {
  beforeEach(() => {
    this.tinyUniverse = [
      { "@type": "rdfs:Class", "rdfs:label": "Cosmos" },
      { "@type": "rdfs:Class", "rdfs:label": "Bigness" },
      { "@type": ["rdfs:Class", "d:/DataType"], "rdfs:label": "Text" },
      {
        "@type": "rdf:Property",
        "rdfs:label": "isBig",
        "d:/domainIncludes": { "@id": "d:/Cosmos" },
        "d:/rangeIncludes": [{ "@id": "d:/Bigness" }, { "@id": "d:/Text" }],
      },
    ]
  })

  it("depth 0", () => {
    new Crispr(this.tinyUniverse, "d:/")
      .modelMiner(["Cosmos"], 0)
      .should.have.members(["Cosmos"])
  })
  it("depth 1", () => {
    new Crispr(this.tinyUniverse, "d:/")
      .modelMiner(["Cosmos"], 1)
      .should.have.members(["Cosmos", "Bigness"])
  })
})

describe("class | Crispr | modelMiner tinyUniverse [Cosmos, Bigness] Primitive Text", () => {
  beforeEach(() => {
    this.tinyUniverse = [
      { "@type": "rdfs:Class", "rdfs:label": "Cosmos" },
      { "@type": "rdfs:Class", "rdfs:label": "Bigness" },
      { "@type": ["rdfs:Class", "d:/DataType"], "rdfs:label": "Text" },
      {
        "@type": "rdf:Property",
        "rdfs:label": "isBig",
        "d:/domainIncludes": { "@id": "d:/Cosmos" },
        "d:/rangeIncludes": [{ "@id": "d:/Bigness" }, { "@id": "d:/Text" }],
      },
    ]
  })
  it("depth 0", () => {
    new Crispr(this.tinyUniverse, "d:/")
      .modelMiner(["Cosmos", "Bigness"], 0)
      .should.have.members(["Cosmos", "Bigness"])
  })
  it("depth 1", () => {
    new Crispr(this.tinyUniverse, "d:/")
      .modelMiner(["Cosmos", "Bigness"], 1)
      .should.have.members(["Cosmos", "Bigness"])
  })
})
