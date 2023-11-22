"use strict";

export const filterClassProperties =
  (_id) =>
  ({ domainIncludes }) =>
    domainIncludes && domainIncludes.includes(_id);

export default filterClassProperties;
