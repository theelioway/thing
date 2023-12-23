"use strict";
import { should } from "chai";

import findOf from "../../src/find-by-id.js";

should();

const SIMPLEGRAPH = [
  { id: "timeToComplete" },
  { id: "Airline" },
  { id: "costCurrency" },
  { id: "postalCodeRange" },
  { id: "birthPlace" },
];

describe("function | findOf", () => {
  it("finds things by `id` in `SIMPLEGRAPH`", async () => {
    SIMPLEGRAPH.find(findOf("timeToComplete")).should.eql({
      id: "timeToComplete",
    });
    SIMPLEGRAPH.find(findOf("costCurrency")).should.eql({
      id: "costCurrency",
    });
  });
  it("handles no match `undefined` in `SIMPLEGRAPH`", async () => {
    should().equal(SIMPLEGRAPH.find(findOf("no match")), undefined);
  });
});
