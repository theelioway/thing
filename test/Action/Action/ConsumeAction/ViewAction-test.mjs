import chai from "chai";
import ThingUnitTest from "../../../../test-helpers/ThingUnitTest.js";
import ActionStateTest from "../../../../test-helpers/Action/ActionStateTest.js";
import ViewAction from "../../../../Action/Action/ConsumeAction/ViewAction.js";

chai.should();

describe("Action | ViewAction", () => {
  it("ThingUnitTest", () => ThingUnitTest(ViewAction));
  it("ActionStateTest", () => ActionStateTest(ViewAction));
  it("views `thing`", async () => {
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
    let action = await ViewAction({ Action: { object: engagedThing } });
    action.Action.result.should.eql({
      ...engagedThing,
      ItemList: {
        itemListElement: [1, 2, 3, 4, 5, 6],
      },
    });
  });
});
