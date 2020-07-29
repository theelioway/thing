const should = require("chai").should()
const Crispy = require("../crispy")

describe("class | Crispy | crispify tinyUniverse", () => {
  it("Maps Models and Fields", () => {
    let crispy = new Crispy(
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
    crispy.domain.should.equal("d:/")
    crispy.MODELS.size.should.equal(2)
    crispy.MODELS.get("Cosmos").should.eql({
      enums: new Set(),
      fields: new Set(["size"]),
      help: "Comment Cosmos",
      name: "Cosmos",
      subs: new Set(),
    })
    crispy.MODELS.get("Bigness").should.eql({
      enums: new Set(["Big"]),
      fields: new Set(),
      help: "Comment Bigness",
      name: "Bigness",
      subs: new Set(),
    })
    crispy.FIELDS.size.should.equal(1)
    crispy.FIELDS.get("size").should.eql({
      name: "size",
      help: "Comment size",
      models: new Set(["Cosmos"]),
      types: new Set(["Bigness", "Text"]),
    })
    crispy.PRIMTS.size.should.equal(1)
    crispy.PRIMTS.get("Text").should.eql({
      name: "Text",
      help: "Comment Text",
    })
  })
})
