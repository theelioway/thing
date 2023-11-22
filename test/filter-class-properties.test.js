"use strict";
import { should } from "chai";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import filterClassProperties from "../src/filter-class-properties.js";

should();

let DIR = dirname(fileURLToPath(import.meta.url));

describe("function | filterClassProperties", () => {
  it("gets tinyUniverse", async () => {
    const graph = JSON.parse(
      fs.readFileSync(
        join(DIR, "./fixtures/tinyUniverse-simplified-20231121.json"),
        "utf-8",
      ),
    );
    graph
      .filter(filterClassProperties("Cosmos"))
      .map((p) => p.id)
      .should.eql(["size"]);
  });
  it("gets schemaorg 9.0", async () => {
    const graph = JSON.parse(
      fs.readFileSync(
        join(DIR, "./fixtures/schemaorg-simplified-20231121.json"),
        "utf-8",
      ),
    );
    graph
      .filter(filterClassProperties("Thing"))
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
