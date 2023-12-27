"use strict";
import { should } from "chai";
import abdiel from "../thing.js";

should();

describe("module | abdiel", () => {
  it("exports these functions", async () => {
    let oldab = await abdiel();
    Object.keys(oldab).should.be.eql([
      "itemListCreatorCreator",
      "schemaCreator",
      "schemaReducer",
      "subTypeReducer",
      "thingClone",
      "thingCreatorCreator",
      "thingletCreator",
      "thingletReducer",
    ]);
  });
});
