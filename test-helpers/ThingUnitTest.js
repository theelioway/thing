// import { should } from "chai";
// should();
import chai from "chai";

const should = chai.should();

/**
* @file Wrapper for routine before/beforeEach/after mongoose server prep in tests.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
import Thing from "../Thing.js"
import ActionUnitTest from "../test-helpers/Thing/ThingUnitTest.js"
ThingUnitTest(Thing)
* ============================================================================ *
* @param {Function} Thing as an endpoint.
* @param {String} testDescription for the describe wrapper which groups tests.
* @param {Function} testsCallBack being the context "inside" which tests run.
*/
export const ThingUnitTest = async (Thing) => {
  let typeName = Thing.name;
  describe(`${typeName} Unit Test`, () => {
    it("returns a `thing` from undefined input", async () => {
      let thing = await Thing();
      should.equal(thing.identifier, "");
      thing.mainEntityOfPage.should.eql(typeName);
      thing.ItemList.itemListElement.should.eql([]);
    });
    it("returns the `thing` that was input", async () => {
      let thing = await Thing({ identifier: "thing" });
      thing.identifier.should.eql("thing");
      thing.mainEntityOfPage.should.eql(typeName);
      thing.ItemList.itemListElement.should.eql([]);
    });
  });
};

export default ThingUnitTest;
