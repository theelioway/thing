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
  test("depth 0", () => {
    let result = new Crispr(this.tinyUniverse, "d:/").modelMiner(
      ["Cosmos"],
      0
    )
    expect(result).toEqual(["Cosmos", "Bigness"])
  })
  test("depth 1", () => {
    let result = new Crispr(this.tinyUniverse, "d:/").modelMiner(
      ["Cosmos"],
      1
    )
    expect(result).toEqual(["Cosmos", "Bigness"])
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

  test(" depth 0", () => {
    let result = new Crispr(this.tinyUniverse, "d:/").modelMiner(
      ["Cosmos"],
      0
    )
    expect(result).toEqual(["Cosmos"])
  })
  test("depth 1", () => {
    let result = new Crispr(this.tinyUniverse, "d:/").modelMiner(
      ["Cosmos"],
      1
    )
    expect(result).toEqual(["Cosmos"])
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
  test("depth 0", () => {
    let result = new Crispr(this.tinyUniverse, "d:/").modelMiner(
      ["Cosmos", "Bigness"],
      0
    )
    expect(result).toEqual(["Cosmos", "Bigness"])
  })
  test("depth 1", () => {
    let result = new Crispr(this.tinyUniverse, "d:/").modelMiner(
      ["Cosmos", "Bigness"],
      1
    )
    expect(result).toEqual(["Cosmos", "Bigness"])
  })
})
