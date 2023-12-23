"use strict";

export const findOf =
  (byId) =>
  ({ id }) =>
    id === byId;

export default findOf;
