"use strict";
import { arrayDifference, valueIsLengthlessArray } from "@elioway/abdiel";

const areDiff = (a1, a2) => !valueIsLengthlessArray(arrayDifference(a1, a2));

export const recursiveSubclasses = (inGraph) => (simplerElement) => {
  const recursiveParentsOf = (knownParents) => {
    if (Array.isArray(knownParents) && knownParents.length) {
      let parentClasses = inGraph
        .filter((c) => knownParents.includes(c.id))
        .map((c) => c?.subClassOf || [])
        .flat();
      if (parentClasses?.length && areDiff(knownParents, parentClasses)) {
        let parentClassesOfParentClasses = recursiveParentsOf(parentClasses);
        if (parentClassesOfParentClasses?.length) {
          knownParents = knownParents.concat(parentClassesOfParentClasses);
        } else {
          knownParents = knownParents.concat(parentClasses);
        }
      }
      return [...new Set(knownParents)];
    } else {
      // Just return whatever value failed the lengthy knownParents test
      // AKA: recursion loop "get-out-jail-free" card!
      return knownParents;
    }
  };
  const { id, subClassOf } = simplerElement;
  const knownParents = subClassOf || [];
  return recursiveParentsOf([id, ...knownParents]);
};

export default recursiveSubclasses;
