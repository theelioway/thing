import { should } from "chai";
import SearchAction from "../../Thing/Action/SearchAction.js";

should();

describe("Action | SearchAction", () => {
  it("the least SearchAction for a `thing` undefined", async () => {
    let action = await SearchAction({
      SearchAction: { query: "sameAs:Dog" },
      Action: { object: engagedThing },
    });
    action.Action.actionStatus.should.eql("CompletedActionStatus");
    action.Action.result.ItemList.itemListElement.length.should.eql(0);
  });
  it("SearchAction on list", async () => {
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
    let action = await SearchAction({
      SearchAction: { query: "sameAs:Dog" },
      Action: { object: engagedThing },
    });
    action.Action.result.ItemList.itemListElement.length.should.eql(3);
    action.Action.result.ItemList.itemListElement
      .map((t) => t.identifier)
      .should.eql(["Alsation", "Poodle", "Terrier"]);
  });
  it("SearchAction on list", async () => {
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
    let action = await SearchAction({
      SearchAction: { query: "sameAs:Dog,additionalType:Small" },
      Action: { object: engagedThing },
    });
    action.Action.result.ItemList.itemListElement.length.should.eql(4);
    action.Action.result.ItemList.itemListElement
      .map((t) => t.identifier)
      .should.eql(["Poodle", "Terrier", "Siamese", "Tabby"]);
  });
  it("SearchAction on list", async () => {
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
    let action = await SearchAction({
      SearchAction: { query: "sameAs:Dog,sameAs:Cat" },
      Action: { object: engagedThing },
    });
    action.Action.result.ItemList.itemListElement.length.should.eql(5);
    action.Action.result.ItemList.itemListElement
      .map((t) => t.identifier)
      .should.eql(["Alsation", "Siamese", "Tabby", "Poodle", "Terrier"]);
  });
});
