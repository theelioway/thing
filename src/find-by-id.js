"use strict";

export const findById =
  (byId) =>
  ({ id }) =>
    id === byId;

export default findById;
