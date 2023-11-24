import chai from "chai";
import ThingUnitTest from "../../../test-helpers/ThingUnitTest.js";
import ActionStateTest from "../../../test-helpers/Action/ActionStateTest.js";
import UpdateAction from "../../../Action/Action/UpdateAction.js";

const should = chai.should();

describe("Action | UpdateAction", () => {
  it("ThingUnitTest", () => ThingUnitTest(UpdateAction));
  it("ActionStateTest", () => ActionStateTest(UpdateAction));
  it("updates `thing`", async () => {
    let engagedThing = { identifier: "thing-0001", name: "BlueThing" };
    let action = await UpdateAction({
      Action: {
        object: engagedThing,
        instrument: {
          name: "RedThing",
          sameAs: "NewStuff",
          Person: { firstName: "Tim" },
        },
      },
    });
    action.Action.object.should.equal(engagedThing);
    action.Action.result.should.eql({
      ...engagedThing,
      name: "RedThing",
      sameAs: "NewStuff",
      Person: { firstName: "Tim" },
    });
  });
});
