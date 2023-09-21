"use strict"
import { should } from "chai"
import ThingBuilder from "../thing-builder.js"

should()

describe("class | ThingBuilder | schemify tinyUniverse", () => {
  it("Maps Models and Fields", () => {
    let thingBuilder = new ThingBuilder(
      "./test/fixtures/tinyUniverse",
      "d:/",
      [],
    )
    thingBuilder.domain.should.equal("d:/")
    thingBuilder.MODELS.size.should.equal(9)
    thingBuilder.MODELS.get("Cosmos").should.eql({
      enums: new Set(),
      fields: new Set(["size"]),
      comment: "Comment Cosmos",
      name: "Cosmos",
      subs: new Set(),
    })
    thingBuilder.MODELS.get("Bigness").should.eql({
      enums: new Set(["Big"]),
      fields: new Set(),
      comment: "Comment Bigness",
      name: "Bigness",
      subs: new Set(),
    })
    thingBuilder.FIELDS.size.should.equal(1)
    thingBuilder.FIELDS.get("size").should.eql({
      name: "size",
      comment: "Comment size",
      models: new Set(["Cosmos"]),
      types: new Set(["Bigness", "Text"]),
    })
    thingBuilder.PRIMTS.size.should.equal(1)
    thingBuilder.PRIMTS.get("Text").should.eql({
      name: "Text",
      comment: "Comment Text",
    })
  })
})
