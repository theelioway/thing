import { should } from "chai";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import filterTypeProperties from "../../src/filter-type-properties.js";

should();

let DIR = dirname(fileURLToPath(import.meta.url));

describe("function | filterTypeProperties", () => {
  it("gets tinyUniverse", async () => {
    const tinyUniverse = JSON.parse(
      fs.readFileSync(
        join(DIR, "./fixtures/tinyUniverse-simplified-20231121.json"),
        "utf-8",
      ),
    );
    tinyUniverse
      .filter(filterTypeProperties("Cosmos"))
      .map((p) => p.id)
      .should.eql(["size"]);
  });
  it("gets schemaorg 9.0", async () => {
    const schemaorg = JSON.parse(
      fs.readFileSync(
        join(DIR, "./fixtures/schemaorg-simplified-20231121.json"),
        "utf-8",
      ),
    );
    schemaorg
      .filter(filterTypeProperties("Thing"))
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
