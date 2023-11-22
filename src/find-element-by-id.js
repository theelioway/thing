"use strict";

export const findElementById =
  (byId) =>
  ({ id }) =>
    id === byId;

export default findElementById;
