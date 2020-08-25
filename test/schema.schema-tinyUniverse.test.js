const should = require("chai").should()
const ThingBuilder = require("../thing-builder")

describe("class | ThingBuilder | schemify tinyUniverse", () => {
  it("Maps Models and Fields", () => {
    let thingBuilder = new ThingBuilder(
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
      "d:/",
      []
    )
    thingBuilder.domain.should.equal("d:/")
    thingBuilder.MODELS.size.should.equal(2)
    thingBuilder.MODELS.get("Cosmos").should.eql({
      enums: new Set(),
      fields: new Set(["size"]),
      help: "Comment Cosmos",
      name: "Cosmos",
      subs: new Set(),
    })
    thingBuilder.MODELS.get("Bigness").should.eql({
      enums: new Set(["Big"]),
      fields: new Set(),
      help: "Comment Bigness",
      name: "Bigness",
      subs: new Set(),
    })
    thingBuilder.FIELDS.size.should.equal(1)
    thingBuilder.FIELDS.get("size").should.eql({
      name: "size",
      help: "Comment size",
      models: new Set(["Cosmos"]),
      types: new Set(["Bigness", "Text"]),
    })
    thingBuilder.PRIMTS.size.should.equal(1)
    thingBuilder.PRIMTS.get("Text").should.eql({
      name: "Text",
      help: "Comment Text",
    })
  })
})
