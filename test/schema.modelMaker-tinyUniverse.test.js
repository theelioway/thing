const should = require("chai").should()
const ThingBuilder = require("../thing-builder")

describe("class | ThingBuilder | modelMaker tinyUniverse", () => {
  before(() => {
    this.thingBuilder = new ThingBuilder("test/fixtures/tinyUniverse", "d:/")
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

  it("depth 0", () => {
    let modelsMined = this.thingBuilder.modelMiner(["Cosmos"], 0)
    this.thingBuilder
      .modelMaker("Cosmos", modelsMined, { comment: true })
      .should.be.eql(SIMPLESTEXPECTEDMODEL)
  })

  it("self mines", () => {
    let modelsMined = undefined
    this.thingBuilder
      .modelMaker("Cosmos", modelsMined, { comment: true })
      .should.be.eql(SIMPLESTEXPECTEDMODEL)
  })

  it("depth 1", () => {
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

  it("raises an error", () => {
    ;() =>
      this.thingBuilder
        .modelMaker("ForSureThisModelDoesNotExist")
        .should.throw(RangeError, /Model not found/)
  })
})
