"use strict";
import filterTypeProperties from "./filter-type-properties.js";
import reducePropertiesToThinglet from "./reduce-properties-to-thinglet.js";

export const reduceSubTypesToThinglet = (graph) => (acc, type) => {
  acc[type] = graph
    .filter(filterTypeProperties(type))
    .reduce(reducePropertiesToThinglet);
  return acc;
};

export default reduceSubTypesToThinglet;
