import { should } from "chai";

should();

/**
* @file Wrapper for routine before/beforeEach/after mongoose server prep in tests.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
import Action from "../Thing/Action.js"
import ActionUnitTest from "../test-helpers/Thing/ActionUnitTest.js"
ActionUnitTest(Action)
* ============================================================================ *
* @param {Function} Thing as an enpoint.

*/
export const ActionUnitTest = async (Action) => {
  let typeName = Action.name;
  describe(`${typeName} Unit Test`, () => {
    it("returns a `thing` from undefined input", async () => {
      let action = await Action();
      should().be.equal(action.identifier, undefined);
      action.mainEntityOfPage.should.eql(typeName);
      action.ItemList.itemListElement.should.eql([]);
    });

    it("returns a `thing` for a `thing`", async () => {
      let action = await Action({ identifier: "action-0001" });
      action.identifier.should.eql("action-0001");
      action.mainEntityOfPage.should.eql(typeName);
      action.ItemList.itemListElement.should.eql([]);
    });

    it("returns an `action` for an `action`", async () => {
      let action = await Action({
        identifier: "action-0001",
        Action: {
          object: {
            identifier: "thing-0001",
            mainEntityOfPage: "Thing",
          },
        },
      });
      // As proven elsewhere.
      action.identifier.should.eql("action-0001");
      action.mainEntityOfPage.should.eql(typeName);
      action.ItemList.itemListElement.should.eql([]);
      // Input becomes `object` `thing`.
      action.Action.object.identifier.should.eql("thing-0001");
      action.Action.object.mainEntityOfPage.should.eql("Thing");
      action.Action.object.ItemList.itemListElement.should.eql([]);
    });

    it("`name` and `description`", async () => {
      let action = await Action({
        Action: {
          object: {
            identifier: "thing-0001",
            mainEntityOfPage: "Thing",
          },
        },
      });
      // Input becomes `object` `thing`.
      action.name.should.eql("thing-0001 Thing Action");
      action.description.should.eql("Action [instrument:{}]");
    });

    it("pipes default Action.target", async () => {
      const actualThing = await Action();
      actualThing.Action.target({}).should.eql({});
    });

    it("pipes blank Action", async () => {
      const actualThing = await Action();
      // Can't test for equality against functions.
      delete actualThing.Action.target;
      actualThing.name.should.eql("Thing Action");
      actualThing.description.should.eql("Action [instrument:{}]");
      actualThing.mainEntityOfPage.should.eql(typeName);
      actualThing.Action.actionStatus.should.eql("PotentialActionStatus");
      actualThing.Action.instrument.should.eql({});
      actualThing.Action.object.should.eql({
        ItemList: {
          itemListElement: [],
        },
        mainEntityOfPage: "Thing",
      });
      should.equal(actualThing.Action.result, undefined);
    });
  });
};

export default ActionUnitTest;
