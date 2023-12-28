import { should } from "chai";
import { thingClone } from "../src/thing-clone.js";

should();

describe("thing | thingClone", () => {
  it("fully and deeply cloned", async () => {
    let element1 = { identifier: 1 };
    let element2 = { identifier: 2 };
    let element3 = { identifier: 3 };
    let thing = {
      identifier: "thing1",
      ItemList: {
        itemListElement: [element1, element2, element3],
      },
    };
    thing.identifier.should.be.eql("thing1");
    thing.ItemList.itemListElement[0].should.be.eql(element1);
    thing.ItemList.itemListElement[0].should.be.equal(element1);

    let thing2 = thingClone(thing);
    thing2.should.be.eql(thing);
    thing2.should.not.be.equal(thing);
    thing2.ItemList.itemListElement[0].should.be.eql(element1);
    thing2.ItemList.itemListElement[0].should.not.be.equal(element1);

    thing2.identifier = "thing2";
    thing2.should.not.be.eql(thing);
    thing2.identifier.should.be.eql("thing2");
    thing.identifier.should.be.eql("thing1");
  });
});
