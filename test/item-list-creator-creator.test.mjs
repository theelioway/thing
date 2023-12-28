import { promises as fs } from "fs";
import { should } from "chai";
import { helloWorldReducer } from "../src/reducers.js";
import itemListCreatorCreator from "../src/item-list-creator-creator.js";

should();

describe("thing | subs", () => {
  it("lists `thing` subtypes", async () => {
    let itemListCreator = itemListCreatorCreator(
      helloWorldReducer,
      ({ id }) => id,
    );
    let thing = await itemListCreator("Thing");
    fs.writeFile("./subtypes1.json", JSON.stringify(thing), "utf-8");
    thing.should.be.eql({
      identifier: "hello, i am the identifier entity",
      mainEntityOfPage: "hello, i am the mainEntityOfPage entity",
      ItemList: {
        itemListElement: [
          "Action",
          "CreativeWork",
          "Event",
          "Intangible",
          "MedicalEntity",
          "Organization",
          "Person",
          "Place",
          "Product",
          "StupidType",
        ],
        numberOfItems: 10,
      },
    });
  });
  it("subtypes mapper function", async () => {
    let itemListCreator = itemListCreatorCreator(
      helloWorldReducer,
      ({ id }) => new Object({ identifier: id }),
    );
    let thing = await itemListCreator("Thing");
    fs.writeFile("./subtypes2.json", JSON.stringify(thing), "utf-8");
    thing.should.be.eql({
      identifier: "hello, i am the identifier entity",
      mainEntityOfPage: "hello, i am the mainEntityOfPage entity",
      ItemList: {
        itemListElement: [
          { identifier: "Action" },
          { identifier: "CreativeWork" },
          { identifier: "Event" },
          { identifier: "Intangible" },
          { identifier: "MedicalEntity" },
          { identifier: "Organization" },
          { identifier: "Person" },
          { identifier: "Place" },
          { identifier: "Product" },
          { identifier: "StupidType" },
        ],
        numberOfItems: 10,
      },
    });
  });
});
