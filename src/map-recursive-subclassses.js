"use strict";
import recursiveSubclasses from "./recursive-subclassses.js";

export const mapRecursiveSubclasses = (simpleElement, _, inGraph) => {
  const { type } = simpleElement;
  if (type && type.includes("Class")) {
    simpleElement.subClassOf = recursiveSubclasses(inGraph)(simpleElement);
  }
  return simpleElement;
};

export default mapRecursiveSubclasses;
