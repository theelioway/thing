import { should } from "chai";
import ThingUnitTest from "../../../../test-helpers/ThingUnitTest.js";
import ActionStateTest from "../../../../test-helpers/Action/ActionStateTest.js";
import RejectAction from "../../../../Action/Action/ConsumeAction/RejectAction.js";

should();

describe("Action | RejectAction", () => {
  it("ThingUnitTest", () => ThingUnitTest(RejectAction));
  it("ActionStateTest", () => ActionStateTest(RejectAction));
  it("handles `url`-less RejectAction", async () => {
    let engagedThing = {
      identifier: "dogs",
      ItemList: {
        itemListElement: [
          { sameAs: "Dog", identifier: "Alsation", additionalType: "Big" },
          { sameAs: "Cat", identifier: "Siamese", additionalType: "Small" },
          { sameAs: "Cat", identifier: "Tabby", additionalType: "Small" },
          { sameAs: "Dog", identifier: "Poodle", additionalType: "Small" },
          { sameAs: "Dog", identifier: "Terrier", additionalType: "Small" },
        ],
      },
    };
    let readAction = await RejectAction();
    readAction.should.eql({
      mainEntityOfPage: "RejectAction",
      name: "Read Error",
      Action: {
        actionStatus: "FailedActionStatus",
        error: "Missing `thing.url`",
      },
      ItemList: {
        itemListElement: [],
      },
    });
  });
  it("handles `url` RejectAction", async () => {
    let engagedThing = {
      identifier: "dogs",
      ItemList: {
        itemListElement: [
          { sameAs: "Dog", identifier: "Alsation", additionalType: "Big" },
          { sameAs: "Cat", identifier: "Siamese", additionalType: "Small" },
          { sameAs: "Cat", identifier: "Tabby", additionalType: "Small" },
          { sameAs: "Dog", identifier: "Poodle", additionalType: "Small" },
          { sameAs: "Dog", identifier: "Terrier", additionalType: "Small" },
        ],
      },
    };
    let readAction = await RejectAction({
      url: "./test/Action/readAction.json",
    });
    let expectedJSON = JSON.stringify(
      {
        description: "A RejectAction from `*.json` file test",
        identifier: "readAction",
        mainEntityOfPage: "RejectAction",
        name: "RejectAction Test",
        url: "https://RejectAction.theElioWay.com",
        ItemList: {
          itemListElement: [],
        },
      },
      null,
      2,
    );
    readAction.trim().should.eql(expectedJSON.trim());
  });
});
