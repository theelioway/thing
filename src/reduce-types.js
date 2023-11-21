"use strict";
import filterTypeProperties from "./filter-type-properties.js";

export const reduceTypes = (graph, reducer) => (acc, type) => {
  acc[type] = graph.filter(filterTypeProperties(type)).reduce(reducer);
  return acc;
};

export default reduceSubTypes;
