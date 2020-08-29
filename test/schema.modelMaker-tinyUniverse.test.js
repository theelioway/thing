const should = require("chai").should()
const ThingBuilder = require("../thing-builder")

describe("class | ThingBuilder | modelMaker tinyUniverse", () => {
  before(() => {
    this.thingBuilder = new ThingBuilder(
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
        comment: "Comment size",
      },
    },
    name: "Cosmos",
    comment: "Comment Cosmos",
    subs: [],
  }

  it.skip("depth 0", () => {
    let modelsMined = this.thingBuilder.modelMiner(["Cosmos"], 0)
    this.thingBuilder
      .modelMaker("Cosmos", modelsMined, { comment: true })
      .should.be.eql(SIMPLESTEXPECTEDMODEL)
  })

  it.skip("self mines", () => {
    let modelsMined = undefined
    this.thingBuilder
      .modelMaker("Cosmos", modelsMined, { comment: true })
      .should.be.eql(SIMPLESTEXPECTEDMODEL)
  })

  it.skip("depth 1", () => {
    let modelsMined = this.thingBuilder.modelMiner(["Cosmos"], { depth: 1 })
    this.thingBuilder
      .modelMaker("Cosmos", modelsMined, { depth: 1, comment: true })
      .should.eql({
        fields: {
          size: {
            type: "Text",
            comment: "Comment size",
            enums: ["Big"],
          },
        },
        name: "Cosmos",
        comment: "Comment Cosmos",
        subs: [],
      })
  })

  it.skip("raises an error", () => {
    ;() =>
      this.thingBuilder
        .modelMaker("ForSureThisModelDoesNotExist")
        .should.throw(RangeError, /Model not found/)
  })
})
