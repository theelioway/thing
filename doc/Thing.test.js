import { should } from "chai";
import Thing from "../Thing.js";

should();

describe("module | Thing", () => {
  it("returns `thing` from blank", async () => {
    await Thing().then((thing) => {
      thing.should.eql({
        alternateName: "",
        additionalType: "",
        description: "",
        disambiguatingDescription: "",
        identifier: "",
        image: "",
        mainEntityOfPage: "Thing",
        name: "",
        potentialAction: "",
        sameAs: "",
        subjectOf: "",
        url: "",
        ItemList: {
          itemListElement: [],
          itemListOrder: "",
          numberOfItems: 0,
        },
      });
    });
  });
  it("returns fuller `thing` from skinny `thing`", async () => {
    await Thing({ identifier: "skinny-thing" }).then((thing) => {
      thing.should.eql({
        alternateName: "",
        additionalType: "",
        description: "",
        disambiguatingDescription: "",
        identifier: "skinny-thing",
        image: "",
        mainEntityOfPage: "Thing",
        name: "",
        potentialAction: "",
        sameAs: "",
        subjectOf: "",
        url: "",
        ItemList: {
          itemListElement: [],
          itemListOrder: "",
          numberOfItems: 0,
        },
      });
    });
  });
  it("returns the `mainEntityOfPage` type of `thing`", async () => {
    await Thing({ mainEntityOfPage: "Action" }).then((thing) => {
      thing.should.eql({
        alternateName: "",
        additionalType: "",
        description: "",
        disambiguatingDescription: "",
        identifier: "",
        image: "",
        mainEntityOfPage: "Action",
        name: "",
        potentialAction: "",
        sameAs: "",
        subjectOf: "",
        url: "",
        Action: {
          actionStatus: "",
          agent: "",
          endTime: "",
          error: "",
          instrument: "",
          location: "",
          object: "",
          participant: "",
          result: "",
          startTime: "",
          target: "",
        },
        ItemList: {
          itemListElement: [],
          itemListOrder: "",
          numberOfItems: 0,
        },
      });
    });
  });
  it("returns with all the types of a `thing`", async () => {
    await Thing({
      identifier: "finns-photos",
      mainEntityOfPage: "ImageGallery",
    }).then((thing) => {
      thing.should.have.keys([
        "CreativeWork",
        "WebPage",
        "CollectionPage",
        "MediaGallery",
        "ImageGallery",
        "ItemList",
        "additionalType",
        "alternateName",
        "description",
        "disambiguatingDescription",
        "identifier",
        "image",
        "mainEntityOfPage",
        "name",
        "potentialAction",
        "sameAs",
        "subjectOf",
        "url",
      ]);
      thing.identifier.should.eql("finns-photos");
      thing.mainEntityOfPage.should.eql("ImageGallery");
      thing.CreativeWork.should.be.instanceOf(Object);
      thing.WebPage.should.be.instanceOf(Object);
      thing.CollectionPage.should.be.instanceOf(Object);
      thing.MediaGallery.should.be.instanceOf(Object);
      thing.ImageGallery.should.be.instanceOf(Object);
    });
  });
});
