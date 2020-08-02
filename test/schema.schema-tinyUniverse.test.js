const should = require("chai").should()
const Schema = require("../schema")

describe("class | Schema | schemify tinyUniverse", () => {
  it("Maps Models and Fields", () => {
    let schema = new Schema(
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
    schema.domain.should.equal("d:/")
    schema.MODELS.size.should.equal(2)
    schema.MODELS.get("Cosmos").should.eql({
      enums: new Set(),
      fields: new Set(["size"]),
      help: "Comment Cosmos",
      name: "Cosmos",
      subs: new Set(),
    })
    schema.MODELS.get("Bigness").should.eql({
      enums: new Set(["Big"]),
      fields: new Set(),
      help: "Comment Bigness",
      name: "Bigness",
      subs: new Set(),
    })
    schema.FIELDS.size.should.equal(1)
    schema.FIELDS.get("size").should.eql({
      name: "size",
      help: "Comment size",
      models: new Set(["Cosmos"]),
      types: new Set(["Bigness", "Text"]),
    })
    schema.PRIMTS.size.should.equal(1)
    schema.PRIMTS.get("Text").should.eql({
      name: "Text",
      help: "Comment Text",
    })
  })
})
