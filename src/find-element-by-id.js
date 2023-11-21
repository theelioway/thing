"use strict";

export const findElementById =
  (_id) =>
  ({ id }) =>
    id === _id;

export default findElementById;
