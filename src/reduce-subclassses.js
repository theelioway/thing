"use strict";
import filterProperties from "./filter-properties.js";

export const reduceSubclasses = (graph, reducer) => (acc, className) => {
  acc[className] = graph
    .filter(filterProperties(className))
    .reduce(reducer, {});
  return acc;
};

export default reduceSubclasses;
