import { should } from "chai";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import readGraphFile from "../../src/read-graph-file.js";
import mapSimpleElements from "../../src/map-simple-elements.js";

should();

const TIMESTAMP = new Date().toISOString().replace(/\D/g, "").slice(0, 8);
const DIR = dirname(fileURLToPath(import.meta.url));

describe("function | mapSimpleElements", () => {
  it("simplifies quantumUniverse", async () => {
    const rdfPath = join(DIR, "./fixtures/quantumUniverse.jsonld");
    const simpler = readGraphFile(rdfPath).map(mapSimpleElements("d:/"));
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
    const expected = JSON.parse(
      fs.readFileSync(
        join(DIR, "./fixtures/quantumUniverse-simplified-20231121.json"),
        "utf-8",
      ),
    );
    simpler.should.eql(expected);
    // fs.writeFileSync(
    //   join(DIR, `./fixtures/quantumUniverse-simplified-${TIMESTAMP}.json`),
    //   JSON.stringify(simpler, null, 2),
    //   "utf-8",
    // );
  });
  it("simplifies tinyUniverse", async () => {
    const rdfPath = join(DIR, "./fixtures/tinyUniverse.jsonld");
    const simpler = readGraphFile(rdfPath).map(mapSimpleElements("d:/"));
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
    const expected = JSON.parse(
      fs.readFileSync(
        join(DIR, "./fixtures/tinyUniverse-simplified-20231121.json"),
        "utf-8",
      ),
    );
    simpler.should.eql(expected);
    // fs.writeFileSync(
    //   join(DIR, `./fixtures/tinyUniverse-simplified-${TIMESTAMP}.json`),
    //   JSON.stringify(simpler, null, 2),
    //   "utf-8",
    // );
  });
  it("simplifies schemaorg 9.0", async () => {
    const rdfPath = join(
      DIR,
      "../../schemaorg/data/releases/9.0/schemaorg-all-http.jsonld",
    );
    const simpler = readGraphFile(rdfPath).map(
      mapSimpleElements("http://schema.org/"),
    );
    const expected = JSON.parse(
      fs.readFileSync(
        join(DIR, "./fixtures/schemaorg-simplified-20231121.json"),
        "utf-8",
      ),
    );
    simpler.should.eql(expected);
    // fs.writeFileSync(
    //   join(DIR, `./fixtures/schemaorg-simplified-${TIMESTAMP}.json`),
    //   JSON.stringify(simpler, null, 2),
    //   "utf-8",
    // );
  });
});
