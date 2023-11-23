"use strict";
import { should } from "chai";
import propertyDefaultValue from "../src/property-default-value.js";

should();

describe("function | propertyDefaultValue", () => {
  it("Integer", async () => {
    propertyDefaultValue({
      id: "doesntMatter",
      rangeIncludes: ["Integer"],
    }).should.be.eql(0);
  });
  it("Distance", async () => {
    propertyDefaultValue({
      id: "doesntMatter",
      rangeIncludes: ["Distance"],
    }).should.be.eql(0);
  });
  it("Duration", async () => {
    propertyDefaultValue({
      id: "doesntMatter",
      rangeIncludes: ["Duration"],
    }).should.be.eql(0);
  });
  it("Number", async () => {
    propertyDefaultValue({
      id: "doesntMatter",
      rangeIncludes: ["Number"],
    }).should.be.eql(0);
  });
  it("Quantity", async () => {
    propertyDefaultValue({
      id: "doesntMatter",
      rangeIncludes: ["Quantity"],
    }).should.be.eql(0);
  });
  it("Text", async () => {
    propertyDefaultValue({
      id: "doesntMatter",
      rangeIncludes: ["Text"],
    }).should.be.eql("");
  });
  it("DateTime", async () => {
    propertyDefaultValue({
      id: "doesntMatter",
      rangeIncludes: ["DateTime"],
    }).should.be.eql("1970-01-01T00:00:00.000Z");
  });
  it("Date", async () => {
    propertyDefaultValue({
      id: "doesntMatter",
      rangeIncludes: ["Date"],
    }).should.be.eql("1970-01-01");
  });
  it("Time", async () => {
    propertyDefaultValue({
      id: "doesntMatter",
      rangeIncludes: ["Time"],
    }).should.be.eql("00:00:00.000");
  });
  it("Boolean", async () => {
    propertyDefaultValue({
      id: "doesntMatter",
      rangeIncludes: ["Boolean"],
    }).should.be.false;
  });
  it("minPrice, maxPrice, minValue, maxValue, price, value", async () => {
    let props = [
      "minPrice",
      "maxPrice",
      "minValue",
      "maxValue",
      "price",
      "value",
    ];
    for (let p = 0; p < props.length; p++) {
      let propName = props[p];
      propertyDefaultValue({
        id: propName,
        rangeIncludes: ["DoesntMatter"],
      }).should.be.eql(0.0);
    }
  });
  it("mainEntityOfPage", async () => {
    propertyDefaultValue({
      id: "mainEntityOfPage",
      domainIncludes: ["Matters"],
      rangeIncludes: ["DoesntMatter"],
    }).should.be.eql("Matters");
  });
  it("else defaults Text", async () => {
    propertyDefaultValue({
      id: "doesntMatter",
      rangeIncludes: ["DoesntMatter"],
    }).should.be.eql("");
  });
});
