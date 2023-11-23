"use strict";
import { should } from "chai";

import { reduceProperties } from "../src/reduce-properties.js";

should();

const SIMPLEGRAPH = [
  { id: "timeToComplete" },
  { id: "Person" },
  { id: "costCurrency" },
  { id: "postalCodeRange" },
  { id: "birthPlace" },
];
const testTransformer = () => "found!";

describe("function | reduceProperties", () => {
  it("reduces `SIMPLEGRAPH` to `testTransformer`", async () => {
    SIMPLEGRAPH.reduce(reduceProperties(testTransformer), {}).should.eql({
      Person: "found!",
      birthPlace: "found!",
      costCurrency: "found!",
      postalCodeRange: "found!",
      timeToComplete: "found!",
    });
  });
});
