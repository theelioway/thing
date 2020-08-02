const should = require("chai").should()
const Schema = require("../schema")

describe("class | Schema | modelMaker tinyUniverse", () => {
  before(() => {
    this.schema = new Schema(
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
    let modelsMined = this.schema.modelMiner(["Cosmos"], 0)
    this.schema
      .modelMaker("Cosmos", modelsMined, { help: true })
      .should.be.eql(SIMPLESTEXPECTEDMODEL)
  })

  it("self mines", () => {
    let modelsMined = undefined
    this.schema
      .modelMaker("Cosmos", modelsMined, { help: true })
      .should.be.eql(SIMPLESTEXPECTEDMODEL)
  })

  it("depth 1", () => {
    let modelsMined = this.schema.modelMiner(["Cosmos"], 1)
    this.schema.modelMaker("Cosmos", modelsMined, { help: true }).should.eql({
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
      this.schema
        .modelMaker("ForSureThisModelDoesNotExist")
        .should.throw(RangeError, /Model not found/)
  })
})
