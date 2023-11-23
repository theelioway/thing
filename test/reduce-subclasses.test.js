"use strict";
import fs from "fs";
import { should } from "chai";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import reduceSubclasses from "../src/reduce-subclassses.js";

should();

const DIR = dirname(fileURLToPath(import.meta.url));
const reducerToTested = () => "has properties";
const graph = JSON.parse(
  fs.readFileSync(
    join(DIR, "./fixtures/schemaorg-subclasses-20231123.json"),
    "utf-8",
  ),
);
const subclassesToTested = reduceSubclasses(graph, reducerToTested);

describe("function | reduceSubclasses", () => {
  it("reduces `schemaorgv9.0` `Thing`", async () => {
    const mainEntityOfPage = "Thing";
    const thing = graph.find((t) => t.id === mainEntityOfPage);
    [...(thing.subClassOf || [])].reduce(subclassesToTested, {}).should.eql({
      [mainEntityOfPage]: "has properties",
    });
  });
  it("reduces `schemaorgv9.0` `WebPage`", async () => {
    const mainEntityOfPage = "WebPage";
    const thing = graph.find((t) => t.id === mainEntityOfPage);
    thing.subClassOf.reduce(subclassesToTested, {}).should.eql({
      [mainEntityOfPage]: "has properties",
      CreativeWork: "has properties",
      Thing: "has properties",
    });
  });
  it("reduces `schemaorgv9.0` `GroceryStore`", async () => {
    const mainEntityOfPage = "GroceryStore";
    const thing = graph.find((t) => t.id === mainEntityOfPage);
    thing.subClassOf.reduce(subclassesToTested, {}).should.eql({
      [mainEntityOfPage]: {},
      Store: {},
      LocalBusiness: "has properties",
      Organization: "has properties",
      Place: "has properties",
      Thing: "has properties",
    });
  });
});
