import fs from "fs/promises";
import { should } from "chai";
import ThingUnitTest from "../../../../test-helpers/ThingUnitTest.js";
import ActionStateTest from "../../../../test-helpers/Action/ActionStateTest.js";
import PhotographAction from "../../../../Action/Action/CreateAction/PhotographAction.js";

should();

describe("Action | UpdateAction", () => {
  it("ThingUnitTest", () => ThingUnitTest(UpdateAction));
  it("ActionStateTest", () => ActionStateTest(UpdateAction));
  it("handles `url`-less PhotographAction", async () => {
    let writeAction = await PhotographAction();
    writeAction.Action.actionStatus.should.eql("FailedActionStatus");
    writeAction.Action.error.should.eql("Missing `thing.url`");
  });
  it("handles `url` PhotographAction", async () => {
    const filePath = "./test/Action/Action/CreateAction/writeAction.json";
    // Delete the file
    try {
      await fs.unlink(filePath);
    } catch (error) {}

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
    // Rewrite the file
    let writeAction = await PhotographAction({
      url: filePath,
      Action: { object: engagedThing },
    });
    // File Exists
    const fileExists = await fs
      .access(filePath)
      .then(() => true)
      .catch(() => false);
    // Tests
    fileExists.should.eql(true);
    writeAction.Action.actionStatus.should.eql("CompletedActionStatus");
    writeAction.Action.result.should.eql(engagedThing);
  });
});
