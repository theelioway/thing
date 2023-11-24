import { should } from "chai";
import ThingUnitTest from "../../../test-helpers/ThingUnitTest.js";
import ActionStateTest from "../../../test-helpers/Action/ActionStateTest.js";
import ConsumeAction from "../../../Action/Action/ConsumeAction.js";

should();

describe("Action | ConsumeAction", () => {
  it("ThingUnitTest", () => ThingUnitTest(ConsumeAction));
  it("ActionStateTest", () => ActionStateTest(ConsumeAction));
  it("returns nothing if fields not present", async () => {
    let action = await ConsumeAction({
      ConsumeAction: { actionAccessibilityRequirement: ["identifier"] },
    });
    action.Action.result.should.eql({});
  });
  it("returns fields if fields present", async () => {
    let action = await ConsumeAction({
      ConsumeAction: { actionAccessibilityRequirement: ["mainEntityOfPage"] },
    });
    action.Action.result.should.eql({ mainEntityOfPage: "ConsumeAction" });
  });
  it("has ItemList even for blank `thing`", async () => {
    let action = await ConsumeAction({
      ConsumeAction: { actionAccessibilityRequirement: ["ItemList"] },
    });
    action.Action.result.should.eql({
      ItemList: {
        itemListElement: [],
      },
    });
  });
  it("returns fields if fields present", async () => {
    let action = await ConsumeAction({
      ConsumeAction: {
        actionAccessibilityRequirement: ["identifier", "mainEntityOfPage"],
      },
    });
    quoteAction({ identifier: "test" }).should.eql({
      identifier: "test",
      mainEntityOfPage: "ConsumeAction",
    });
  });
});
