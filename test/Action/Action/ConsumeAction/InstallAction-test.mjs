import { should } from "chai";
import ThingUnitTest from "../../../../test-helpers/ThingUnitTest.js";
import ActionStateTest from "../../../../test-helpers/Action/ActionStateTest.js";
import InstallAction from "../../../../Action/Action/ConsumeAction/InstallAction.js";

should();

describe("Action | InstallAction", () => {
  it("ThingUnitTest", () => ThingUnitTest(InstallAction));
  it("ActionStateTest", () => ActionStateTest(InstallAction));
  it("the least InstallAction for a `thing` undefined", async () => {
    let action = await InstallAction();
    action.should.eql({
      mainEntityOfPage: "InstallAction",
      name: "Import Error",
      Action: {
        actionStatus: "FailedActionStatus",
        error: "Missing `thing.url`",
      },
      ItemList: {
        itemListElement: [],
      },
    });
  });
  it("installs `installAction.js`", async () => {
    let action = await InstallAction({
      url: "../../../../test/Action/Action/ConsumeAction/installAction.js",
    });
    action.Action.result.should.eql({
      description: "A InstallAction from `*.json` file test",
      identifier: "installAction",
      mainEntityOfPage: "InstallAction",
      name: "InstallAction Test",
      url: "https://InstallAction.theElioWay.com",
      ItemList: {
        itemListElement: [],
      },
    });
  });
});
