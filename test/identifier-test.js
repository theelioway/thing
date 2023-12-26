import { should } from "chai";
import identifier from "../Thing/Thing/identifier.js";

should();

describe("Thing", () => {
  it("identifier()", async () => {
    for (let i = 0; i < 10; i++) {
      let identity = await identifier();
      identity.should.eql({ identifier: String(i) });
    }
  });
  it("identifier({identifier})", async () => {
    for (let i = 0; i < 10; i++) {
      let identity = await identifier({ identifier: "1" });
      identity.should.eql({ identifier: "1" });
    }
  });
  it("identifier({name})", async () => {
    for (let i = 0; i < 10; i++) {
      let identity = await identifier({ name: `name${i}` });
      identity.should.eql({
        name: `name${i}`,
        identifier: `name${i}-${i + 10}`,
      });
    }
  });
  it("identifier({disambiguatingDescription})", async () => {
    for (let i = 0; i < 10; i++) {
      let identity = await identifier({
        disambiguatingDescription: `disambiguatingDescription${i}`,
      });
      identity.should.eql({
        disambiguatingDescription: `disambiguatingDescription${i}`,
        identifier: `disambiguatingdescription${i}-${i + 20}`,
      });
    }
  });
  it("identifier({name, disambiguatingDescription})", async () => {
    for (let i = 0; i < 10; i++) {
      let identity = await identifier({
        name: `name${i}`,
        disambiguatingDescription: `disambiguatingDescription${i}`,
      });
      identity.should.eql({
        name: `name${i}`,
        disambiguatingDescription: `disambiguatingDescription${i}`,
        identifier: `name${i}-disambiguatingdescription${i}-${i + 30}`,
      });
    }
  });
});
