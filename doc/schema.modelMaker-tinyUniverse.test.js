"use strict";
import { should } from "chai";
import ThingBuilder from "../thing-builder.js";

should();

describe("class | ThingBuilder | modelMaker tinyUniverse", () => {
  const thingBuilder = new ThingBuilder("./test/fixtures/tinyUniverse", "d:/");

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
  };

  it("depth 0", () => {
    let modelsMined = thingBuilder.modelMiner(["Cosmos"], 0);
    thingBuilder
      .modelMaker("Cosmos", modelsMined, { comments: true })
      .should.be.eql(SIMPLESTEXPECTEDMODEL);
  });

  it("self mines", () => {
    let modelsMined = undefined;
    thingBuilder
      .modelMaker("Cosmos", modelsMined, { comments: true })
      .should.be.eql(SIMPLESTEXPECTEDMODEL);
  });

  it("depth 1", () => {
    let modelsMined = thingBuilder.modelMiner(["Cosmos"], { depth: 1 });
    thingBuilder
      .modelMaker("Cosmos", modelsMined, { depth: 1, comments: true })
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
      });
  });

  it("raises an error", () => {
    () =>
      thingBuilder
        .modelMaker("ForSureThisModelDoesNotExist")
        .should.throw(RangeError, /Model not found/);
  });
});
