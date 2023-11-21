import fs from "fs";
import { should } from "chai";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import filterTypeProperties from "../../src/filter-type-properties.js";
import reducePropertiesToSchema from "../../src/reduce-properties-to-schema.js";

should();

let DIR = dirname(fileURLToPath(import.meta.url));

describe("function | reducePropertiesToSchema", () => {
  it("reduces to `Cosmos` schema in `quantumUniverse`", async () => {
    const quantumUniverse = JSON.parse(
      fs.readFileSync(
        join(DIR, "./fixtures/quantumUniverse-simplified-20231121.json"),
        "utf8",
      ),
    );
    quantumUniverse
      .filter(filterTypeProperties("Cosmos"))
      .reduce(reducePropertiesToSchema, {})
      .should.eql({
        isBig: {
          domainIncludes: ["Cosmos"],
          id: "isBig",
          rangeIncludes: ["Bigness", "Text"],
          type: ["Property"],
        },
      });
  });
  it("reduces to `Cosmos` schema in `tinyUniverse`", async () => {
    const tinyUniverse = JSON.parse(
      fs.readFileSync(
        join(DIR, "./fixtures/tinyUniverse-simplified-20231121.json"),
        "utf8",
      ),
    );
    tinyUniverse
      .filter(filterTypeProperties("Cosmos"))
      .reduce(reducePropertiesToSchema, {})
      .should.eql({
        size: {
          comment: "Comment size",
          domainIncludes: ["Cosmos"],
          id: "size",
          rangeIncludes: ["Bigness", "Text"],
          type: ["Property"],
        },
      });
  });
  it("reduces `TransferAction` to schema in `schemaorg` 9.0", async () => {
    const schemaorg = JSON.parse(
      fs.readFileSync(
        join(DIR, "./fixtures/schemaorg-simplified-20231121.json"),
        "utf8",
      ),
    );
    schemaorg
      .filter(filterTypeProperties("AggregateRating"))
      .reduce(reducePropertiesToSchema, {})
      .should.eql({
        itemReviewed: {
          comment: "The item that is being reviewed/rated.",
          domainIncludes: ["AggregateRating", "Review"],
          id: "itemReviewed",
          rangeIncludes: ["Thing"],
          type: ["Property"],
        },
        ratingCount: {
          comment: "The count of total number of ratings.",
          domainIncludes: ["AggregateRating"],
          id: "ratingCount",
          rangeIncludes: ["Integer"],
          type: ["Property"],
        },
        reviewCount: {
          comment: "The count of total number of reviews.",
          domainIncludes: ["AggregateRating"],
          id: "reviewCount",
          rangeIncludes: ["Integer"],
          type: ["Property"],
        },
      });
    schemaorg
      .filter(filterTypeProperties("TransferAction"))
      .reduce(reducePropertiesToSchema, {})
      .should.eql({
        fromLocation: {
          comment:
            "A sub property of location. The original location of the object or the agent before the action.",
          domainIncludes: ["TransferAction", "ExerciseAction", "MoveAction"],
          id: "fromLocation",
          rangeIncludes: ["Place"],
          subPropertyOf: ["location"],
          type: ["Property"],
        },
        toLocation: {
          comment:
            "A sub property of location. The final location of the object or the agent after the action.",
          domainIncludes: [
            "TransferAction",
            "ExerciseAction",
            "InsertAction",
            "MoveAction",
          ],
          id: "toLocation",
          rangeIncludes: ["Place"],
          subPropertyOf: ["location"],
          type: ["Property"],
        },
      });
  });
});
