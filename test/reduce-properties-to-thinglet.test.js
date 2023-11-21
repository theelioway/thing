import fs from "fs";
import { should } from "chai";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import filterTypeProperties from "../../src/filter-type-properties.js";
import reducePropertiesToThinglet from "../../src/reduce-properties-to-thinglet.js";

should();

let DIR = dirname(fileURLToPath(import.meta.url));

describe("function | reducePropertiesToThinglet", () => {
  it("reduces quantumUniverse fixture", async () => {
    const quantumUniverse = JSON.parse(
      fs.readFileSync(
        join(DIR, "./fixtures/quantumUniverse-simplified-20231121.json"),
        "utf-8",
      ),
    );
    quantumUniverse
      .filter(filterTypeProperties("Cosmos"))
      .reduce(reducePropertiesToThinglet, {})
      .should.eql({ isBig: "" });
  });
  it("reduces tinyUniverse fixture", async () => {
    const tinyUniverse = JSON.parse(
      fs.readFileSync(
        join(DIR, "./fixtures/tinyUniverse-simplified-20231121.json"),
        "utf-8",
      ),
    );
    tinyUniverse
      .filter(filterTypeProperties("Cosmos"))
      .reduce(reducePropertiesToThinglet, {})
      .should.eql({ size: "" });
  });
  it("reduces schemaorg 9.0 fixture", async () => {
    const schemaorg = JSON.parse(
      fs.readFileSync(
        join(DIR, "./fixtures/schemaorg-simplified-20231121.json"),
        "utf-8",
      ),
    );
    schemaorg
      .filter(filterTypeProperties("Thing"))
      .reduce(reducePropertiesToThinglet, {})
      .should.eql({
        additionalType: "",
        alternateName: "",
        description: "",
        disambiguatingDescription: "",
        identifier: "",
        image: "",
        mainEntityOfPage: "Thing",
        name: "",
        potentialAction: "",
        sameAs: "",
        subjectOf: "",
        url: "",
      });
    schemaorg
      .filter(filterTypeProperties("AggregateRating"))
      .reduce(reducePropertiesToThinglet, {})
      .should.eql({ itemReviewed: "", ratingCount: 0, reviewCount: 0 });
    schemaorg
      .filter(filterTypeProperties("Rating"))
      .reduce(reducePropertiesToThinglet, {})
      .should.eql({
        author: "",
        bestRating: 0,
        ratingExplanation: "",
        ratingValue: 0,
        reviewAspect: "",
        worstRating: 0,
      });
    schemaorg
      .filter(filterTypeProperties("TransferAction"))
      .reduce(reducePropertiesToThinglet, {})
      .should.eql({ fromLocation: "", toLocation: "" });
    schemaorg
      .filter(filterTypeProperties("Trip"))
      .reduce(reducePropertiesToThinglet, {})
      .should.eql({
        arrivalTime: "1970-01-01T00:00:00.000Z",
        departureTime: "1970-01-01T00:00:00.000Z",
        itinerary: "",
        offers: "",
        partOfTrip: "",
        provider: "",
        subTrip: "",
      });
  });
});
