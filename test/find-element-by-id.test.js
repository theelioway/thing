"use strict";
import { should } from "chai";

import findElementById from "../src/find-element-by-id.js";

should();

const SIMPLEGRAPH = [
  { id: "timeToComplete" },
  { id: "Airline" },
  { id: "costCurrency" },
  { id: "postalCodeRange" },
  { id: "birthPlace" },
];

describe("function | findElementById", () => {
  it("finds things by `id` in `SIMPLEGRAPH`", async () => {
    SIMPLEGRAPH.find(findElementById("timeToComplete")).should.eql({
      id: "timeToComplete",
    });
    SIMPLEGRAPH.find(findElementById("costCurrency")).should.eql({
      id: "costCurrency",
    });
  });
  it("handles no match `undefined` in `SIMPLEGRAPH`", async () => {
    should().equal(SIMPLEGRAPH.find(findElementById("no match")), undefined);
  });
});
