import { should } from "chai";
import ThingUnitTest from "../../../../test-helpers/ThingUnitTest.js";
import ActionStateTest from "../../../../test-helpers/Action/ActionStateTest.js";
import AllocateAction from "../../../../Action/Action/ConsumeAction/AllocateAction.js";

should();

describe("Action | AllocateAction", () => {
  it("ThingUnitTest", () => ThingUnitTest(AllocateAction));
  it("ActionStateTest", () => ActionStateTest(AllocateAction));
  it("handles `url`-less AllocateAction", async () => {
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
    let readAction = await AllocateAction();
    readAction.should.eql({
      mainEntityOfPage: "AllocateAction",
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
  it("handles `url` AllocateAction", async () => {
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
    let readAction = await AllocateAction({
      url: "./test/Action/readAction.json",
    });
    let expectedJSON = JSON.stringify(
      {
        description: "A AllocateAction from `*.json` file test",
        identifier: "readAction",
        mainEntityOfPage: "AllocateAction",
        name: "AllocateAction Test",
        url: "https://AllocateAction.theElioWay.com",
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
