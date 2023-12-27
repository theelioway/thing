import { should } from "chai";
import schemaCreator from "../src/schema-creator.js";

should();

describe("thing | schema", () => {
  it("makes a `Thing`", async () => {
    let thing = await schemaCreator("Thing");
    thing.should.be.eql({
      additionalType: {
        type: ["Property"],
        domainIncludes: ["Thing"],
        rangeIncludes: ["URL"],
      },
      alternateName: {
        type: ["Property"],
        domainIncludes: ["Thing"],
        rangeIncludes: ["Text"],
      },
      description: {
        type: ["Property"],
        domainIncludes: ["Thing"],
        rangeIncludes: ["Text"],
      },
      disambiguatingDescription: {
        type: ["Property"],
        domainIncludes: ["Thing"],
        rangeIncludes: ["Text"],
      },
      identifier: {
        type: ["Property"],
        domainIncludes: ["Thing"],
        rangeIncludes: ["URL", "Text", "PropertyValue"],
      },
      image: {
        type: ["Property"],
        domainIncludes: ["Thing"],
        rangeIncludes: ["ImageObject", "URL"],
      },
      mainEntityOfPage: {
        type: ["Property"],
        domainIncludes: ["Thing"],
        rangeIncludes: ["URL", "CreativeWork"],
      },
      name: {
        type: ["Property"],
        domainIncludes: ["Thing"],
        rangeIncludes: ["Text"],
      },
      potentialAction: {
        type: ["Property"],
        domainIncludes: ["Thing"],
        rangeIncludes: ["Action"],
      },
      sameAs: {
        type: ["Property"],
        domainIncludes: ["Thing"],
        rangeIncludes: ["URL"],
      },
      subjectOf: {
        type: ["Property"],
        domainIncludes: ["Thing"],
        rangeIncludes: ["Event", "CreativeWork"],
      },
      url: {
        type: ["Property"],
        domainIncludes: ["Thing"],
        rangeIncludes: ["URL"],
      },
      ItemList: {
        itemListElement: {
          type: ["Property"],
          domainIncludes: ["ItemList"],
          rangeIncludes: ["Thing", "ListItem", "Text"],
        },
        itemListOrder: {
          type: ["Property"],
          domainIncludes: ["ItemList"],
          rangeIncludes: ["ItemListOrderType", "Text"],
        },
        numberOfItems: {
          type: ["Property"],
          domainIncludes: ["ItemList"],
          rangeIncludes: ["Integer"],
        },
      },
    });
  });

  it("makes a `Action`", async () => {
    let thing = await schemaCreator("Action");
    thing.should.be.eql({
      additionalType: {
        type: ["Property"],
        domainIncludes: ["Thing"],
        rangeIncludes: ["URL"],
      },
      alternateName: {
        type: ["Property"],
        domainIncludes: ["Thing"],
        rangeIncludes: ["Text"],
      },
      description: {
        type: ["Property"],
        domainIncludes: ["Thing"],
        rangeIncludes: ["Text"],
      },
      disambiguatingDescription: {
        type: ["Property"],
        domainIncludes: ["Thing"],
        rangeIncludes: ["Text"],
      },
      identifier: {
        type: ["Property"],
        domainIncludes: ["Thing"],
        rangeIncludes: ["URL", "Text", "PropertyValue"],
      },
      image: {
        type: ["Property"],
        domainIncludes: ["Thing"],
        rangeIncludes: ["ImageObject", "URL"],
      },
      mainEntityOfPage: {
        type: ["Property"],
        domainIncludes: ["Thing"],
        rangeIncludes: ["URL", "CreativeWork"],
      },
      name: {
        type: ["Property"],
        domainIncludes: ["Thing"],
        rangeIncludes: ["Text"],
      },
      potentialAction: {
        type: ["Property"],
        domainIncludes: ["Thing"],
        rangeIncludes: ["Action"],
      },
      sameAs: {
        type: ["Property"],
        domainIncludes: ["Thing"],
        rangeIncludes: ["URL"],
      },
      subjectOf: {
        type: ["Property"],
        domainIncludes: ["Thing"],
        rangeIncludes: ["Event", "CreativeWork"],
      },
      url: {
        type: ["Property"],
        domainIncludes: ["Thing"],
        rangeIncludes: ["URL"],
      },
      Action: {
        actionStatus: {
          type: ["Property"],
          domainIncludes: ["Action"],
          rangeIncludes: ["ActionStatusType"],
        },
        agent: {
          type: ["Property"],
          domainIncludes: ["Action"],
          rangeIncludes: ["Person", "Organization"],
        },
        endTime: {
          type: ["Property"],
          domainIncludes: [
            "FoodEstablishmentReservation",
            "Action",
            "MediaObject",
            "Schedule",
          ],
          rangeIncludes: ["DateTime", "Time"],
        },
        error: {
          type: ["Property"],
          domainIncludes: ["Action"],
          rangeIncludes: ["Thing"],
        },
        instrument: {
          type: ["Property"],
          domainIncludes: ["Action"],
          rangeIncludes: ["Thing"],
        },
        location: {
          type: ["Property"],
          domainIncludes: ["Event", "Action", "Organization"],
          rangeIncludes: ["Text", "PostalAddress", "VirtualLocation", "Place"],
        },
        object: {
          type: ["Property"],
          domainIncludes: ["Action"],
          rangeIncludes: ["Thing"],
        },
        participant: {
          type: ["Property"],
          domainIncludes: ["Action"],
          rangeIncludes: ["Person", "Organization"],
        },
        result: {
          type: ["Property"],
          domainIncludes: ["Action"],
          rangeIncludes: ["Thing"],
        },
        startTime: {
          type: ["Property"],
          domainIncludes: [
            "MediaObject",
            "Action",
            "Schedule",
            "FoodEstablishmentReservation",
          ],
          rangeIncludes: ["Time", "DateTime"],
        },
        target: {
          type: ["Property"],
          domainIncludes: ["Action"],
          rangeIncludes: ["EntryPoint"],
        },
      },
      ItemList: {
        itemListElement: {
          type: ["Property"],
          domainIncludes: ["ItemList"],
          rangeIncludes: ["Thing", "ListItem", "Text"],
        },
        itemListOrder: {
          type: ["Property"],
          domainIncludes: ["ItemList"],
          rangeIncludes: ["ItemListOrderType", "Text"],
        },
        numberOfItems: {
          type: ["Property"],
          domainIncludes: ["ItemList"],
          rangeIncludes: ["Integer"],
        },
      },
    });
  });
});
