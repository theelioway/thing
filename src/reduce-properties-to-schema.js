"use strict";

export const reducePropertiesToSchema = (acc, property) => {
  acc[property.id] = property;
  return acc;
};

export default reducePropertiesToSchema;
