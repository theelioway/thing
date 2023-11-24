import chai from "chai";

const should = chai.should();

/**
* @file Wrapper for routine before/beforeEach/after mongoose server prep in tests.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
import Person from "../Thing/Person.js"
import ItemListUnitTest from "../test-helpers/Intangible/ItemListUnitTest.js"
ItemListUnitTest(Person)
* ============================================================================ *
* @param {Function} Thing as an endpoint.
* @param {String} testDescription for the describe wrapper which groups tests.
* @param {Function} testsCallBack being the context "inside" which tests run.
*/
export const ItemListUnitTest = async (ItemList) => {
  let typeName = ItemList.name;
  describe(`${typeName} Unit Test`, () => {
    it("returns `ItemList` for undefined `thing`", async () => {
      let thing = await ItemList();
      should.equal(thing.identifier, undefined);
      thing.ItemList.itemListElement.should.eql([]);
    });
    it("returns `ItemList` for defined `thing`", async () => {
      let thing = await ItemList({ identifier: "thing" });
      thing.ItemList.itemListElement.should.eql([]);
    });
    it("returns `ItemList` undisturbed", async () => {
      let thing = await ItemList({
        ItemList: {
          itemListElement: [
            { identifier: "0001" },
            { identifier: "0002" },
            { identifier: "0002" },
          ],
        },
      });
      thing.ItemList.itemListElement.should.eql([
        { identifier: "0001" },
        { identifier: "0002" },
        { identifier: "0002" },
      ]);
    });
  });
};

export default ItemListUnitTest;
