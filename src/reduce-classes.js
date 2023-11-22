"use strict";
import filterClassProperties from "./filter-class-properties.js";

export const reduceClasses = (graph, reducer) => (acc, className) => {
  acc[className] = graph
    .filter(filterClassProperties(className))
    .reduce(reducer, {});
  return acc;
};

export default reduceClasses;
