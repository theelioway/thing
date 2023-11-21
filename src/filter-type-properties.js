"use strict";

export const filterTypeProperties =
  (_id) =>
  ({ domainIncludes }) =>
    domainIncludes && domainIncludes.includes(_id);

export default filterTypeProperties;
