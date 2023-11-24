import { should } from "chai";
import ThingUnitTest from "../../../test-helpers/ThingUnitTest.js";
import ActionStateTest from "../../../test-helpers/Action/ActionStateTest.js";
import CommunicateAction from "../../../Action/Action/CommunicateAction.js";

should();

describe("Action | CommunicateAction", () => {
  it("ThingUnitTest", () => ThingUnitTest(CommunicateAction));
  it("ActionStateTest", () => ActionStateTest(CommunicateAction));
});
