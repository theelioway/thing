import { should } from "chai";
import ThingUnitTest from "../test-helpers/ThingUnitTest.js";
import Thing from "../Thing.js";

should();

describe("Thing", () => {
  it.only("ThingUnitTest", () => {
    ThingUnitTest(Thing);
  });
});
