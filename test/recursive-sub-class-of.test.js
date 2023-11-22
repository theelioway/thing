"use strict";
import fs from "fs";
import { should } from "chai";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import recursiveSubClassOf from "../src/recursive-sub-class-of.js";

should();

let DIR = dirname(fileURLToPath(import.meta.url));
const graph = JSON.parse(
  fs.readFileSync(
    join(DIR, "./fixtures/schemaorg-simplified-20231121.json"),
    "utf-8",
  ),
);
const subClassesOfGraph = recursiveSubClassOf(graph);

describe("function | recursiveSubClassOf `schemaorg` ", () => {
  it.only("recurses `Thing` parents", async () => {
    subClassesOfGraph({ subClassOf: ["Thing"] }).should.eql(["Thing"]);
  });
  it.only("recurses `ItemList` parents", async () => {
    subClassesOfGraph({ subClassOf: ["ItemList"] }).should.eql([
      "ItemList",
      "Intangible",
      "Thing",
    ]);
  });
  it.only("recurses  `CreativeWork` parents", async () => {
    subClassesOfGraph({ subClassOf: ["CreativeWork"] }).should.eql([
      "CreativeWork",
      "Thing",
    ]);
  });
  it.only("recurses `WebPage` parents", async () => {
    subClassesOfGraph({ subClassOf: ["WebPage"] }).should.eql([
      "WebPage",
      "CreativeWork",
      "Thing",
    ]);
  });
  it.only("recurses in order", async () => {
    subClassesOfGraph({ subClassOf: ["CreativeWork", "WebPage"] }).should.eql([
      "CreativeWork",
      "WebPage",
      "Thing",
    ]);
    subClassesOfGraph({ subClassOf: ["WebPage", "CreativeWork"] }).should.eql([
      "WebPage",
      "CreativeWork",
      "Thing",
    ]);
  });
  it.only("recurses deep inheritance like `GroceryStore` ", async () => {
    subClassesOfGraph({ subClassOf: ["GroceryStore"] }).should.eql([
      "GroceryStore",
      "Store",
      "LocalBusiness",
      "Place",
      "Organization",
      "Thing",
    ]);
  });
  it.only("recurses parents with multi inheritance like `LocalBusiness`", async () => {
    subClassesOfGraph({ subClassOf: ["LocalBusiness"] }).should.eql([
      "LocalBusiness",
      "Place",
      "Organization",
      "Thing",
    ]);
  });
  it.only("recurses parents of wird great-great-grand-children", async () => {
    subClassesOfGraph({
      subClassOf: ["BusOrCoach", "InfectiousDisease", "CheckOutAction"],
    }).should.eql([
      "BusOrCoach",
      "InfectiousDisease",
      "CheckOutAction",
      "Vehicle",
      "MedicalCondition",
      "CommunicateAction",
      "Product",
      "MedicalEntity",
      "InteractAction",
      "Thing",
      "Action",
    ]);
  });
});
