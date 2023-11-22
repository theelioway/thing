"use strict";
import { should } from "chai";

import sortElementsById from "../src/sort-elements-by-id.js";

should();

const SIMPLEGRAPH = [
  { id: "timeToComplete" },
  { id: "Person" },
  { id: "costCurrency" },
  { id: "postalCodeRange" },
  { id: "birthPlace" },
];
describe("function | sortElementsById", () => {
  it("sorts `SIMPLEGRAPH`", async () => {
    SIMPLEGRAPH.sort(sortElementsById)
      .map((p) => p.id)
      .should.eql([
        "Person",
        "birthPlace",
        "costCurrency",
        "postalCodeRange",
        "timeToComplete",
      ]);
  });
});
