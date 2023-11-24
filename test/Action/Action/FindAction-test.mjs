import { should } from "chai";
import ThingUnitTest from "../../../test-helpers/ThingUnitTest.js";
import ActionStateTest from "../../../test-helpers/Action/ActionStateTest.js";
import FindAction from "../../../Thing/Action/FindAction.js";

should();

describe("Action | FindAction", () => {
  it("ThingUnitTest", () => ThingUnitTest(FindAction));
  it("ActionStateTest", () => ActionStateTest(FindAction));
  it("the least FindAction  for a `thing` undefined", () => {
    let action = FindAction().should.eql({
      description: `Find ""`,
      mainEntityOfPage: "FindAction",
      name: "Find Results",
      Action: {
        instrument: "",
      },
      ItemList: {
        itemListElement: [],
      },
    });
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
    action.Action.result.ItemList.itemListElement.length.should.eql(2);
    action.Action.result.ItemList.itemListElement
      .map((t) => t.identifier)
      .should.eql(["Poodle", "Terrier"]);
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
