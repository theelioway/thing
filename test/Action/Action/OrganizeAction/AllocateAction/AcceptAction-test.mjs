import { should } from "chai";
import ThingUnitTest from "../../../../test-helpers/ThingUnitTest.js";
import ActionStateTest from "../../../../test-helpers/Action/ActionStateTest.js";
import AcceptAction from "../../../../Action/Action/ConsumeAction/AcceptAction.js";

should();

describe("Action | AcceptAction", () => {
  it("ThingUnitTest", () => ThingUnitTest(AcceptAction));
  it("ActionStateTest", () => ActionStateTest(AcceptAction));
  it("handles `url`-less AcceptAction", async () => {
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
    let readAction = await AcceptAction();
    readAction.should.eql({
      mainEntityOfPage: "AcceptAction",
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
  it("handles `url` AcceptAction", async () => {
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
    let expectedJSON = JSON.stringify(
      {
        description: "A AcceptAction from `*.json` file test",
        identifier: "readAction",
        mainEntityOfPage: "AcceptAction",
        name: "AcceptAction Test",
        url: "https://AcceptAction.theElioWay.com",
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
