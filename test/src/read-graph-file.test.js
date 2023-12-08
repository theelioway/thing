"use strict";
import { should } from "chai";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import readGraphFile from "../../src/read-graph-file.js";

should();

let DIR = dirname(fileURLToPath(import.meta.url));

describe("function | readGraphFile", () => {
  it("gets quantumUniverse", async () => {
    const rdfPath = join(DIR, "./fixtures/quantumUniverse.jsonld");
    readGraphFile(rdfPath).length.should.eql(4);
  });
  it("gets tinyUniverse", async () => {
    const rdfPath = join(DIR, "./fixtures/tinyUniverse.jsonld");
    readGraphFile(rdfPath).length.should.eql(5);
  });
  it("gets schemaorg 9.0", async () => {
    const rdfPath = join(
      DIR,
      "../../schemaorg/data/releases/9.0/schemaorg-all-http.jsonld",
    );
    readGraphFile(rdfPath).length.should.eql(2565);
  });
});
