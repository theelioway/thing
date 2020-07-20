const Crispr = require("../crispr")

describe("class | Crispr | crispify tinyUniverse", () => {
  test("Maps Models and Fields", () => {
    let crispr = new Crispr(
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
          "rdfs:label": "Bigness",
          "rdfs:comment": "Comment Bigness",
        },
        {
          "@type": "d:/Bigness",
          "rdfs:label": "Big",
          "rdfs:comment": "Comment Big",
        },
        { "@type": ["rdfs:Class", "d:/DataType"], "rdfs:label": "Text" },
      ],
      "d:/"
    )
    expect(crispr.domain).toBe("d:/")
    expect(crispr.models.size).toBe(2)
    expect(crispr.fields.size).toBe(1)
    expect(crispr.models.get("Cosmos")).toEqual({
      enums: new Set(),
      fields: new Set(["size"]),
      help: "Comment Cosmos",
      name: "Cosmos",
      subs: new Set(),
    })
    expect(crispr.models.get("Bigness")).toEqual({
      enums: new Set(["Big"]),
      fields: new Set(),
      help: "Comment Bigness",
      name: "Bigness",
      subs: new Set(),
    })
    expect(crispr.fields.get("size")).toEqual({
      name: "size",
      help: "Comment size",
      models: new Set(["Cosmos"]),
      types: new Set(["Bigness", "Text"]),
    })
  })
})
