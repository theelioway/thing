"use strict";

const propertyValue = (property) => {
  let { id, rangeIncludes, domainIncludes } = property;
  if (id === "mainEntityOfPage") {
    return domainIncludes[0];
  } else if (id === "itemListElement") {
    return [];
  } else if (
    ["minPrice", "maxPrice", "minValue", "maxValue", "price", "value"].includes(
      id,
    )
  ) {
    return 0.0;
  } else if (rangeIncludes.includes("DateTime")) {
    return new Date(0).toISOString();
  } else if (rangeIncludes.includes("Time")) {
    return new Date(0).toISOString().slice(11);
  } else if (rangeIncludes.includes("Date")) {
    return new Date(0).toISOString().slice(0, 10);
  } else if (rangeIncludes.includes("Boolean")) {
    return false;
  } else if (
    rangeIncludes.some((propertyType) =>
      ["Distance", "Duration", "Integer", "Number", "Quantity"].includes(
        propertyType,
      ),
    )
  ) {
    return 0;
  } else {
    return "";
  }
};

export const reducePropertiesToThinglet = (acc, property) => {
  acc[property.id] = propertyValue(property);
  return acc;
};

export default reducePropertiesToThinglet;
