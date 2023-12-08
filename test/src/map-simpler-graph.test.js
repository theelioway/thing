"use strict";
import { should } from "chai";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import readGraphFile from "../../src/read-graph-file.js";
import mapSimplerGraph from "../../src/map-simpler-graph.js";

should();

let newFixtureDate = false;
/** @TODO Uncomment if anything changes and you need a new fixture. */
// newFixtureDate = new Date().toISOString().replace(/\D/g, "").slice(0, 8);
const DIR = dirname(fileURLToPath(import.meta.url));

describe("function | mapSimplerGraph", () => {
  it("simplified the `quantumUniverse` graph", async () => {
    const rdfPath = join(DIR, "./fixtures/quantumUniverse.jsonld");
    const simpler = readGraphFile(rdfPath).map(mapSimplerGraph("d:/"));
    const graph = JSON.parse(
      fs.readFileSync(
        join(DIR, "./fixtures/quantumUniverse-simplified-20231121.json"),
        "utf-8",
      ),
    );
    simpler.should.eql([
      {
        id: "Cosmos",
        type: ["Class"],
      },
      {
        id: "Bigness",
        type: ["Class"],
      },
      {
        id: "Integer",
        type: ["Class", "DataType"],
      },
      {
        id: "isBig",
        type: ["Property"],
        domainIncludes: ["Cosmos"],
        rangeIncludes: ["Bigness", "Text"],
      },
    ]);
    simpler.should.eql(graph);
    if (newFixtureDate) {
      fs.writeFileSync(
        join(
          DIR,
          `./fixtures/quantumUniverse-simplified-${newFixtureDate}.json`,
        ),
        JSON.stringify(simpler, null, 2),
        "utf-8",
      );
    }
  });
  it("simplified the `tinyUniverse` graph", async () => {
    const rdfPath = join(DIR, "./fixtures/tinyUniverse.jsonld");
    const simpler = readGraphFile(rdfPath).map(mapSimplerGraph("d:/"));
    simpler.should.eql([
      {
        id: "Cosmos",
        type: ["Class"],
        comment: "Comment Cosmos",
      },
      {
        id: "size",
        type: ["Property"],
        comment: "Comment size",
        domainIncludes: ["Cosmos"],
        rangeIncludes: ["Bigness", "Text"],
      },
      {
        id: "Bigness",
        type: ["Class"],
        comment: "Comment Bigness",
      },
      {
        id: "Big",
        type: ["Bigness"],
        comment: "Comment Big",
      },
      {
        id: "Text",
        type: ["Class", "DataType"],
        comment: "Comment Text",
      },
    ]);
    const graph = JSON.parse(
      fs.readFileSync(
        join(DIR, "./fixtures/tinyUniverse-simplified-20231121.json"),
        "utf-8",
      ),
    );
    simpler.should.eql(graph);
    if (newFixtureDate) {
      fs.writeFileSync(
        join(DIR, `./fixtures/tinyUniverse-simplified-${newFixtureDate}.json`),
        JSON.stringify(simpler, null, 2),
        "utf-8",
      );
    }
  });
  it("simplified the `schemaorgv9.0` graph", async () => {
    const rdfPath = join(
      DIR,
      "../../schemaorg/data/releases/9.0/schemaorg-all-http.jsonld",
    );
    const simpler = readGraphFile(rdfPath).map(
      mapSimplerGraph("http://schema.org/"),
    );
    const graph = JSON.parse(
      fs.readFileSync(
        join(DIR, "./fixtures/schemaorg-simplified-20231121.json"),
        "utf-8",
      ),
    );
    simpler.should.eql(graph);
    if (newFixtureDate) {
      fs.writeFileSync(
        join(DIR, `./fixtures/schemaorg-simplified-${newFixtureDate}.json`),
        JSON.stringify(simpler, null, 2),
        "utf-8",
      );
    }
  });
});
