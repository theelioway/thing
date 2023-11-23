"use strict";

export const filterProperties =
  (_id) =>
  ({ domainIncludes }) =>
    domainIncludes && domainIncludes.includes(_id);

export default filterProperties;
