const should = require("chai").should()
const Crisp = require("../crispy")

before(() => {
  this.crispy = new Crisp(
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

describe("class | Crisp | modelMiner tinyUniverse [Cosmos] Primitive Integer", () => {
  it("depth 0", () => {
    this.crispy.modelMiner(["Cosmos"], 0).should.have.members(["Cosmos"])
  })
  it("depth 1", () => {
    this.crispy
      .modelMiner(["Cosmos"], 1)
      .should.have.members(["Cosmos", "Bigness"])
  })
  it("depth 2", () => {
    this.crispy
      .modelMiner(["Cosmos"], 2)
      .should.have.members(["Cosmos", "Bigness"])
  })
})

describe("class | Crisp | modelMiner tinyUniverse [Cosmos] Primitive Text", () => {
  it("depth 0", () => {
    this.crispy.modelMiner(["Cosmos"], 0).should.have.members(["Cosmos"])
  })
  it("depth 1", () => {
    this.crispy
      .modelMiner(["Cosmos"], 1)
      .should.have.members(["Cosmos", "Bigness"])
  })
})

describe("class | Crisp | modelMiner tinyUniverse [Cosmos, Bigness] Primitive Text", () => {
  it("depth 0", () => {
    this.crispy
      .modelMiner(["Cosmos", "Bigness"], 0)
      .should.have.members(["Cosmos", "Bigness"])
  })
  it("depth 1", () => {
    this.crispy
      .modelMiner(["Cosmos", "Bigness"], 1)
      .should.have.members(["Cosmos", "Bigness"])
  })
})
