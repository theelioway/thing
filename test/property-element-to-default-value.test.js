"use strict";
import { should } from "chai";
import propertyElementToDefaultValue from "../src/property-element-to-default-value.js";

should();

describe("function | propertyElementToDefaultValue", () => {
  it("Integer", async () => {
    propertyElementToDefaultValue({
      id: "doesntMatter",
      rangeIncludes: ["Integer"],
    }).should.be.eql(0);
  });
  it("Distance", async () => {
    propertyElementToDefaultValue({
      id: "doesntMatter",
      rangeIncludes: ["Distance"],
    }).should.be.eql(0);
  });
  it("Duration", async () => {
    propertyElementToDefaultValue({
      id: "doesntMatter",
      rangeIncludes: ["Duration"],
    }).should.be.eql(0);
  });
  it("Number", async () => {
    propertyElementToDefaultValue({
      id: "doesntMatter",
      rangeIncludes: ["Number"],
    }).should.be.eql(0);
  });
  it("Quantity", async () => {
    propertyElementToDefaultValue({
      id: "doesntMatter",
      rangeIncludes: ["Quantity"],
    }).should.be.eql(0);
  });
  it("Text", async () => {
    propertyElementToDefaultValue({
      id: "doesntMatter",
      rangeIncludes: ["Text"],
    }).should.be.eql("");
  });
  it("DateTime", async () => {
    propertyElementToDefaultValue({
      id: "doesntMatter",
      rangeIncludes: ["DateTime"],
    }).should.be.eql("1970-01-01T00:00:00.000Z");
  });
  it("Date", async () => {
    propertyElementToDefaultValue({
      id: "doesntMatter",
      rangeIncludes: ["Date"],
    }).should.be.eql("1970-01-01");
  });
  it("Time", async () => {
    propertyElementToDefaultValue({
      id: "doesntMatter",
      rangeIncludes: ["Time"],
    }).should.be.eql("00:00:00.000");
  });
  it("Boolean", async () => {
    propertyElementToDefaultValue({
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
      propertyElementToDefaultValue({
        id: propName,
        rangeIncludes: ["DoesntMatter"],
      }).should.be.eql(0.0);
    }
  });
  it("mainEntityOfPage", async () => {
    propertyElementToDefaultValue({
      id: "mainEntityOfPage",
      domainIncludes: ["Matters"],
      rangeIncludes: ["DoesntMatter"],
    }).should.be.eql("Matters");
  });
  it("else defaults Text", async () => {
    propertyElementToDefaultValue({
      id: "doesntMatter",
      rangeIncludes: ["DoesntMatter"],
    }).should.be.eql("");
  });
});
