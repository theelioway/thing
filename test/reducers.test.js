import { should } from "chai";
import {
  helloWorldReducer,
  schemaReducer,
  thingletReducer,
} from "../src/reducers.js";

should();

const SIMPLEGRAPH = [
  { id: "Person", type: "ClassInnit" },
  { id: "timeToComplete", type: "PropertyInnit" },
  { id: "costCurrency", type: "PropertyInnit" },
  { id: "postalCodeRange", type: "PropertyInnit" },
  {
    id: "birthPlace",
    type: "PropertyInnit",
    domainIncludes: "birthPlace domainIncludes",
    rangeIncludes: ["birthPlace rangeIncludes"],
  }, // this are the only meta fields provided.
];

describe("module | reducers", () => {
  it("helloWorldReducer", async () => {
    SIMPLEGRAPH.reduce(helloWorldReducer, {}).should.be.eql({
      Person: "hello, i am the Person entity",
      birthPlace: "hello, i am the birthPlace entity",
      costCurrency: "hello, i am the costCurrency entity",
      timeToComplete: "hello, i am the timeToComplete entity",
      postalCodeRange: "hello, i am the postalCodeRange entity",
    });
  });
  it("schemaReducer", async () => {
    SIMPLEGRAPH.reduce(schemaReducer, {}).should.be.eql({
      Person: { type: "ClassInnit" },
      birthPlace: {
        type: "PropertyInnit",
        domainIncludes: "birthPlace domainIncludes",
        rangeIncludes: ["birthPlace rangeIncludes"],
      },
      costCurrency: { type: "PropertyInnit" },
      timeToComplete: { type: "PropertyInnit" },
      postalCodeRange: { type: "PropertyInnit" },
    });
  });
  it("thingletReducer", async () => {
    SIMPLEGRAPH.reduce(thingletReducer, {}).should.be.eql({
      Person: "",
      birthPlace: "",
      costCurrency: "",
      timeToComplete: "",
      postalCodeRange: "",
    });
  });
});
