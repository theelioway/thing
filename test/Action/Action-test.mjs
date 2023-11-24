import chai from "chai";
import ThingUnitTest from "../../test-helpers/ThingUnitTest.js";
import ActionStateTest from "../../test-helpers/Action/ActionStateTest.js";
import Action from "../../Action/Action.js";

const should = chai.should();

describe("Action | Action", () => {
  it("ThingUnitTest", () => ThingUnitTest(Action));
  it("ActionStateTest", () => ActionStateTest(Action));
  it("default Action has no affect on `thing`", async () => {
    let engagedThing = { identifier: "thing-0001", name: "BlueThing" };
    let action = await Action({
      Action: { object: thing },
    });
    // Hold reference to the original thing.
    action.Action.object.should.eql(engagedThing);
    action.Action.object.should.equal(engagedThing);
    // Equal values but not the same thing.
    action.Action.result.should.eql(action.Action.object);
    action.Action.result.should.eql(engagedThing);
    action.Action.result.should.not.equal(action.Action.object);
    action.Action.result.should.not.equal(engagedThing);
  });
});
