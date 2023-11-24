import { should } from "chai";

should();

/**
* @file Wrapper for routine before/beforeEach/after mongoose server prep in tests.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
import Action from "../Action/Action.js"
import ActionStateTest from "../test-helpers/Action/ActionStateTest.js"
ActionStateTest(Action)
* ============================================================================ *
* @param {Function} Thing as an enpoint.
* @param {String} testDescription for the describe wrapper which groups tests.
* @param {Function} testsCallBack being the context "inside" which tests run.
*/
export const ActionStateTest = async (Action) => {
  let typeName = Action.name;

  describe(`${typeName} State Test`, () => {
    it("returns a Message `thing`", async () => {
      let thing = {
        identifier: "thing-0001",
        mainEntityOfPage: "Thing",
        name: "BlueThing",
      };
      let action = await Action({
        Action: { object: thing },
      });
      action.CreativeWork.about.should.eql({
        identifier: "thing-0001",
        mainEntityOfPage: "Thing",
        name: "BlueThing",
        ItemList: {
          itemListElement: [],
        },
      });
      action.CreativeWork.abstract.should.eql("already taken place");
      action.ItemList.should.eql({
        itemListElement: [],
      });
      should().be.equal(!isNaN(new Date(action.Message.dateSent)), true);
    });

    it("completes a `action`", async () => {
      let action = await Action();
      action.Action.actionStatus.should.eql("CompletedActionStatus");
    });

    it("returns a `action` type", async () => {
      let thing = {
        identifier: "thing-0001",
        mainEntityOfPage: "Thing",
        name: "BlueThing",
      };
      let action = await Action({
        Action: { object: thing },
      });
      should().not.exist(action.identifier);
      action.name.should.eql(
        `${thing.identifier} ${thing.mainEntityOfPage} ${typeName}`,
      );
      action.description.should.eql(`${typeName} [instrument:{}]`);
      action.mainEntityOfPage.should.eql(typeName);
      action.Action.actionStatus.should.exist;
      action.Action.object.identifier.should.eql("thing-0001");
      action.Action.instrument.should.eql({});
    });

    it("returns a `action` result", async () => {
      let thing = {
        identifier: "thing-0001",
        mainEntityOfPage: "Thing",
        name: "BlueThing",
      };
      let action = await Action({
        Action: { object: thing },
      });
      action.Action.result.identifier.should.eql("thing-0001");
      action.Action.result.name.should.eql("BlueThing");
    });

    it("mutates `thing` cloned", async () => {
      let thing = {
        identifier: "thing-0001",
        mainEntityOfPage: "Thing",
        name: "BlueThing",
      };
      let action = await Action({
        Action: { object: thing },
      });
      action.Action.object.should.eql(thing);
      action.Action.object.should.equal(thing);
      action.Action.result.should.not.equal(action.Action.object);
      action.Action.result.should.not.equal(thing);
    });

    it("default `thing` result untouched", async () => {
      let thing = {
        identifier: "thing-0001",
        mainEntityOfPage: "Thing",
        name: "BlueThing",
      };
      let action = await Action({
        Action: { object: thing },
      });
      action.Action.result.should.eql(action.Action.object);
      action.Action.result.should.eql(thing);
    });
  });
};

export default ActionStateTest;
