"use strict";
import fs from "fs";
import { should } from "chai";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import recursiveSubclasses from "../src/recursive-subclassses.js";

should();

let DIR = dirname(fileURLToPath(import.meta.url));
const graph = JSON.parse(
  fs.readFileSync(
    join(DIR, "./fixtures/schemaorg-simplified-20231121.json"),
    "utf-8",
  ),
);
const ancestorsOf = recursiveSubclasses(graph);

describe("function | recursiveSubclasses `schemaorg` ", () => {
  it("recurses `Thing` parents", async () => {
    ancestorsOf({ id: "Thing" }).should.eql(["Thing"]);
  });
  it("recurses `Review` parents", async () => {
    ancestorsOf({ id: "Review", subClassOf: ["CreativeWork"] }).should.eql([
      "Review",
      "CreativeWork",
      "Thing",
    ]);
  });
  it("recurses `ItemList` parents", async () => {
    ancestorsOf({ id: "ItemList", subClassOf: ["Intangible"] }).should.eql([
      "ItemList",
      "Intangible",
      "Thing",
    ]);
  });
  it("recurses `CreativeWork` parents", async () => {
    ancestorsOf({ id: "CreativeWork", subClassOf: ["Thing"] }).should.eql([
      "CreativeWork",
      "Thing",
    ]);
  });
  it("recurses `WebPage` parents", async () => {
    ancestorsOf({ id: "WebPage", subClassOf: ["CreativeWork"] }).should.eql([
      "WebPage",
      "CreativeWork",
      "Thing",
    ]);
  });
  it("recurses in order", async () => {
    ancestorsOf({
      id: "Thing",
      subClassOf: ["CreativeWork", "WebPage"],
    }).should.eql(["Thing", "CreativeWork", "WebPage"]);
    ancestorsOf({
      id: "Thing",
      subClassOf: ["WebPage", "CreativeWork"],
    }).should.eql(["Thing", "WebPage", "CreativeWork"]);
  });
  it("recurses deep inheritance like `GroceryStore` ", async () => {
    ancestorsOf({ id: "GroceryStore", subClassOf: ["Store"] }).should.eql([
      "GroceryStore",
      "Store",
      "LocalBusiness",
      "Place",
      "Organization",
      "Thing",
    ]);
  });
  it("recurses parents with multi inheritance like `LocalBusiness`", async () => {
    ancestorsOf({
      id: "LocalBusiness",
      subClassOf: ["Place", "Organization"],
    }).should.eql(["LocalBusiness", "Place", "Organization", "Thing"]);
  });
  it("recurses parents of disparate great-great-grand-children", async () => {
    ancestorsOf({
      id: "Thing",
      subClassOf: ["BusOrCoach", "InfectiousDisease", "CheckOutAction"],
    }).should.eql([
      "Thing",
      "BusOrCoach",
      "InfectiousDisease",
      "CheckOutAction",
      "Vehicle",
      "MedicalCondition",
      "CommunicateAction",
      "Product",
      "MedicalEntity",
      "InteractAction",
      "Action",
    ]);
  });
  it("recurses from `id`", async () => {
    ancestorsOf({ id: "InfectiousDisease" }).should.eql([
      "InfectiousDisease",
      "MedicalCondition",
      "MedicalEntity",
      "Thing",
    ]);
  });
});
