"use strict";
import fs from "fs";
import { should } from "chai";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import reduceClasses from "../src/reduce-classes.js";

should();

const DIR = dirname(fileURLToPath(import.meta.url));
const reducerTypePropertiesTo = () => "tested!";

describe("function | reduceClasses", () => {
  it("reduces `graph` 9.0 `Thing` fixture", async () => {
    const graph = JSON.parse(
      fs.readFileSync(
        join(DIR, "./fixtures/schemaorg-simplified-20231121.json"),
        "utf-8",
      ),
    );
    const thing = graph.find((t) => t.id === "Thing");
    [...(thing.subClassOf || [])]
      .reduce(reduceClasses(graph, reducerTypePropertiesTo), {})
      .should.eql({});
  });
  it("reduces `graph` 9.0 `WebPage` fixture", async () => {
    const graph = JSON.parse(
      fs.readFileSync(
        join(DIR, "./fixtures/schemaorg-simplified-20231121.json"),
        "utf-8",
      ),
    );
    const mainEntityOfPage = "WebPage";
    const thing = graph.find((t) => t.id === mainEntityOfPage);
    [...(thing.subClassOf || [])]
      .reduce(reduceClasses(graph, reducerTypePropertiesTo), {})
      .should.eql({
        [mainEntityOfPage]: "tested!",
        CreativeWork: "tested!",
      });
  });
  it("reduces `graph` 9.0 `GroceryStore` fixture", async () => {
    const graph = JSON.parse(
      fs.readFileSync(
        join(DIR, "./fixtures/schemaorg-simplified-20231121.json"),
        "utf-8",
      ),
    );
    const mainEntityOfPage = "GroceryStore";
    const thing = graph.find((t) => t.id === mainEntityOfPage);
    const subTypes = thing.subClassOf || [];
    subTypes
      .reduce(reduceClasses(graph, reducerTypePropertiesTo), {})
      .should.eql({
        [mainEntityOfPage]: "tested!",
      });
  });
});
