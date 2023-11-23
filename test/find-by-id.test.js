"use strict";
import { should } from "chai";

import findById from "../src/find-by-id.js";

should();

const SIMPLEGRAPH = [
  { id: "timeToComplete" },
  { id: "Airline" },
  { id: "costCurrency" },
  { id: "postalCodeRange" },
  { id: "birthPlace" },
];

describe("function | findById", () => {
  it("finds things by `id` in `SIMPLEGRAPH`", async () => {
    SIMPLEGRAPH.find(findById("timeToComplete")).should.eql({
      id: "timeToComplete",
    });
    SIMPLEGRAPH.find(findById("costCurrency")).should.eql({
      id: "costCurrency",
    });
  });
  it("handles no match `undefined` in `SIMPLEGRAPH`", async () => {
    should().equal(SIMPLEGRAPH.find(findById("no match")), undefined);
  });
});
