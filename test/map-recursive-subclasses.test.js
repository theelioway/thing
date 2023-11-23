"use strict";
import { should } from "chai";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import mapRecursiveSubclasses from "../src/map-recursive-subclassses.js";

should();

let newFixtureDate = false;
/** @TODO Uncomment if anything changes and you need a new fixture. */
// newFixtureDate = new Date().toISOString().replace(/\D/g, "").slice(0, 8);
const DIR = dirname(fileURLToPath(import.meta.url));

describe("function | mapRecursiveSubclasses", () => {
  it("recursed `schemaorgv9.0` subClassOf", async () => {
    const graph = JSON.parse(
      fs.readFileSync(
        join(DIR, "./fixtures/schemaorg-simplified-20231121.json"),
        "utf-8",
      ),
    );
    if (newFixtureDate) {
      fs.writeFileSync(
        join(DIR, `./fixtures/schemaorg-subclasses-${newFixtureDate}.json`),
        JSON.stringify(graph.map(mapRecursiveSubclasses), null, 2),
        "utf-8",
      );
    }
    const subclassed = JSON.parse(
      fs.readFileSync(
        join(DIR, "./fixtures/schemaorg-subclasses-20231123.json"),
        "utf-8",
      ),
    );
    const subclasses = graph.map(mapRecursiveSubclasses);
    subclasses.length.should.eql(2565);
    subclasses.find((c) => c.id === "Thing").subClassOf.should.eql(["Thing"]);
    subclasses
      .find((c) => c.id === "Review")
      .subClassOf.should.eql(["Review", "CreativeWork", "Thing"]);
    subclasses
      .find((c) => c.id === "GroceryStore")
      .subClassOf.should.eql([
        "GroceryStore",
        "Store",
        "LocalBusiness",
        "Place",
        "Organization",
        "Thing",
      ]);
    subclasses.should.eql(subclassed);
  });
});
