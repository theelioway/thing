"use strict";
import { should } from "chai";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import filterProperties from "../src/filter-properties.js";

should();

let DIR = dirname(fileURLToPath(import.meta.url));

describe("function | filterProperties", () => {
  it("filtered `tinyUniverse` properties of `Cosmos`", async () => {
    const graph = JSON.parse(
      fs.readFileSync(
        join(DIR, "./fixtures/tinyUniverse-simplified-20231121.json"),
        "utf-8",
      ),
    );
    graph
      .filter(filterProperties("Cosmos"))
      .map((p) => p.id)
      .should.eql(["size"]);
  });
  it("filtered `schemaorgv9.0` properties of `Thing`", async () => {
    const graph = JSON.parse(
      fs.readFileSync(
        join(DIR, "./fixtures/schemaorg-simplified-20231121.json"),
        "utf-8",
      ),
    );
    graph
      .filter(filterProperties("Thing"))
      .map((p) => p.id)
      .should.eql([
        "potentialAction",
        "identifier",
        "sameAs",
        "url",
        "image",
        "alternateName",
        "name",
        "description",
        "mainEntityOfPage",
        "disambiguatingDescription",
        "subjectOf",
        "additionalType",
      ]);
  });
});
