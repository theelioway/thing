import { should } from "chai";
import { objectArrayReduceProperties } from "@elioway/belial";
import thingletCreatorCreator from "../src/thing-creator-creator.js";

should();

let reducer = objectArrayReduceProperties(({ id }) => id);

describe("thing | -let", () => {
  it("makes a `thing`", async () => {
    let thingletCreator = thingletCreatorCreator(reducer, reducer);
    let thing = await thingletCreator("Thing");
    thing.should.be.eql({
      additionalType: "additionalType",
      alternateName: "alternateName",
      description: "description",
      disambiguatingDescription: "disambiguatingDescription",
      identifier: "identifier",
      image: "image",
      mainEntityOfPage: "mainEntityOfPage",
      name: "name",
      potentialAction: "potentialAction",
      sameAs: "sameAs",
      subjectOf: "subjectOf",
      url: "url",
      ItemList: "ItemList",
    });
  });
  it("makes a `hotel`", async () => {
    let thingletCreator = thingletCreatorCreator(reducer, reducer);
    let thing = await thingletCreator("Hotel");
    thing.should.be.eql({
      additionalType: "additionalType",
      alternateName: "alternateName",
      description: "description",
      disambiguatingDescription: "disambiguatingDescription",
      identifier: "identifier",
      image: "image",
      mainEntityOfPage: "mainEntityOfPage",
      name: "name",
      potentialAction: "potentialAction",
      sameAs: "sameAs",
      subjectOf: "subjectOf",
      url: "url",
      LodgingBusiness: "LodgingBusiness",
      LocalBusiness: "LocalBusiness",
      Organization: "Organization",
      Place: "Place",
      Hotel: "Hotel",
      ItemList: "ItemList",
    });
  });
});
