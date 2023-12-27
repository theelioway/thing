import { should } from "chai";
import { identifier } from "../../src/Thing/identifier.js";

should();

describe("thing | identifier", () => {
  it("assigns the identifier using the func", async () => {
    let identifierIdentifier = identifier(() => "1");
    identifierIdentifier({}).should.eql({ identifier: "1" });
  });
  it("doesn't overwrite existing identifier", async () => {
    for (let i = 0; i < 10; i++) {
      let identifierIdentifier = identifier(() => "3");
      identifierIdentifier({ identifier: "2" }).should.eql({ identifier: "2" });
    }
  });
  it("the func is assigned the thing", async () => {
    let identifierIdentifier = identifier(
      ({ mainEntityOfPage }) => mainEntityOfPage,
    );
    identifierIdentifier({ mainEntityOfPage: "Thing" }).should.eql({
      mainEntityOfPage: "Thing",
      identifier: "Thing",
    });
  });
});
