import chai from "chai";
import ThingUnitTest from "../../../../../test-helpers/ThingUnitTest.js";
import ActionStateTest from "../../../../../test-helpers/Action/ActionStateTest.js";
import ChooseAction from "../../../../Action/Action/FindAction/DiscoverAction.js";

chai.should();

describe("Action | | ChooseAction", async () => {
  it("ThingUnitTest", () => ThingUnitTest(ViewAction));
  it("ActionStateTest", () => ActionStateTest(ViewAction));
  it("the least ChooseAction for a `thing` undefined", async () => {
    let action = await ChooseAction();
    action.should.Action.actionStatus.should.eql("FailedActionStatus");
    action.should.Action.error.should.eql(
      "{} not found in `thing.ItemList.itemListElement`",
    );
    action.should.Action.object.should.eql({
      ItemList: {
        itemListElement: [],
      },
      mainEntityOfPage: "Thing",
    });
    action.should.ChooseAction.actionOption.should.eql({});
    action.should.CreativeWork.abstract.should.eql("failed to complete");
  });

  it("ChooseAction first `thing`", async () => {
    let engagedThing = {
      identifier: "pets",
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
    let action = await ChooseAction({
      Action: { object: engagedThing },
      ChooseAction: {
        actionOption: "additionalType:Small",
      },
    });
    action.Action.result.should.eql({
      sameAs: "Cat",
      identifier: "Siamese",
      additionalType: "Small",
    });
  });
  it("ChooseAction first `thing` multiple criteria", async () => {
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
    let action = await ChooseAction({
      Action: { object: engagedThing },
      ChooseAction: {
        actionOption: "sameAs:Dog,additionalType:Small",
      },
    });
    action.Action.result.should.eql({
      sameAs: "Dog",
      identifier: "Poodle",
      additionalType: "Small",
    });
  });
});
