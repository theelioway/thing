import { should } from "chai";
import ThingUnitTest from "../../../../test-helpers/ThingUnitTest.js";
import ActionStateTest from "../../../../test-helpers/Action/ActionStateTest.js";
import ReadAction from "../../../../Action/Action/ConsumeAction/ReadAction.js";

should();

describe("Action | ReadAction", () => {
  it("ThingUnitTest", () => ThingUnitTest(ReadAction));
  it("ActionStateTest", () => ActionStateTest(ReadAction));
  it("handles `url`-less ReadAction", async () => {
    let readAction = await ReadAction();
    readAction.should.eql({
      mainEntityOfPage: "ReadAction",
      name: "Read Error",
      Action: {
        actionStatus: "FailedActionStatus",
        error: "Missing `thing.url`",
      },
      ItemList: {
        itemListElement: [],
      },
    });
  });
  it("handles `url` ReadAction", async () => {
    let readAction = await ReadAction({ url: "./test/Action/readAction.json" });
    let expectedJSON = JSON.stringify(
      {
        description: "A ReadAction from `*.json` file test",
        identifier: "readAction",
        mainEntityOfPage: "ReadAction",
        name: "ReadAction Test",
        url: "https://ReadAction.theElioWay.com",
        ItemList: {
          itemListElement: [],
        },
      },
      null,
      2,
    );
    readAction.trim().should.eql(expectedJSON.trim());
  });
});
