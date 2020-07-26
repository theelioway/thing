const should = require("chai").should()
const Crispr = require("../crispr")

describe("class | Crispr | modelMaker tinyUniverse", () => {
  before(() => {
    this.crispr = new Crispr(
      [
        {
          "@type": "rdfs:Class",
          "rdfs:label": "Cosmos",
          "rdfs:comment": "Comment Cosmos",
        },
        {
          "@type": "rdf:Property",
          "rdfs:label": "size",
          "rdfs:comment": "Comment size",
          "d:/domainIncludes": { "@id": "d:/Cosmos" },
          "d:/rangeIncludes": [{ "@id": "d:/Bigness" }, { "@id": "d:/Text" }],
        },
        {
          "@type": "rdfs:Class",
          "rdfs:label": { "@language": "en", "@value": "Bigness" },
          "rdfs:comment": "Comment Bigness",
        },
        {
          "@type": "d:/Bigness",
          "rdfs:label": "Big",
          "rdfs:comment": "Comment Big",
        },
        {
          "@type": ["rdfs:Class", "d:/DataType"],
          "rdfs:label": "Text",
          "rdfs:comment": "Comment Text",
        },
      ],
      "d:/"
    )
  })

  let SIMPLESTEXPECTEDMODEL = {
    fields: {
      size: {
        type: "Text",
        help: "Comment size",
      },
    },
    name: "Cosmos",
    help: "Comment Cosmos",
    subs: [],
  }

  it("depth 0", () => {
    let modelsMined = this.crispr.modelMiner(["Cosmos"], 0)
    this.crispr
      .modelMaker("Cosmos", modelsMined)
      .should.be.eql(SIMPLESTEXPECTEDMODEL)
  })

  it("self mines", () => {
    let modelsMined = undefined
    this.crispr
      .modelMaker("Cosmos", modelsMined)
      .should.be.eql(SIMPLESTEXPECTEDMODEL)
  })

  it("depth 1", () => {
    let modelsMined = this.crispr.modelMiner(["Cosmos"], 1)
    this.crispr.modelMaker("Cosmos", modelsMined).should.eql({
      fields: {
        size: {
          type: "Text",
          help: "Comment size",
          enums: ["Big"],
        },
      },
      name: "Cosmos",
      help: "Comment Cosmos",
      subs: [],
    })
  })

  it("raises an error", () => {
    ;() =>
      this.crispr
        .modelMaker("ForSureThisModelDoesNotExist")
        .should.throw(RangeError, /Model not found/)
  })
})
