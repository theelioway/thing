"use strict";
import { should } from "chai";
import ThingBuilder from "../thing-builder.js";
import { schemaDomainUrl } from "../utils/get-schema.js";

should();

describe("class | ThingBuilder | schemify schemaorg  3.9", () => {
  it("crispy_schema_versioning_members", () => {
    let fixedPrimitives = [
      "Boolean",
      "Date",
      "DateTime",
      "Number",
      "Text",
      "Time",
      "Quantity", // Put this here to resolve Distance, Duration, Energy, Mass as Primitive.
    ];
    let thingBuilder = new ThingBuilder(
      "./schemaorg/data/releases/3.9/all-layers",
      schemaDomainUrl,
      fixedPrimitives,
    );
    /**Correct as of 3.9.*/
    thingBuilder.MODELS.size.should.be.equal(802);

    let modelDefs = [...thingBuilder.MODELS.values()];
    let enumedModels = modelDefs.filter((m) => m.enums.size);
    enumedModels.length.should.be.equal(56);

    let enumsSize = modelDefs.reduce((enumsTotalLength, m) => {
      return m.enums.size + enumsTotalLength;
    }, 0);
    enumsSize.should.be.equal(306);

    thingBuilder.FIELDS.size.should.be.equal(1268);
    thingBuilder.PRIMTS.size.should.be.equal(16);
    thingBuilder.PRIMTS.should.have.deep.keys(
      fixedPrimitives.concat([
        "CssSelectorType",
        "Distance",
        "Duration",
        "Energy",
        "Float",
        "Integer",
        "Mass",
        "URL",
        "XPathType",
      ]),
    );
  });
});
