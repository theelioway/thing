"use strict";

export const recursiveSubClassOf = (graph) => (classElement) => {
  const recursiveParentsOf = (knownParents) => {
    if (Array.isArray(knownParents) && knownParents.length) {
      let parentClasses = graph
        .filter((c) => knownParents.includes(c.id))
        .map((c) => c?.subClassOf || [])
        .flat();
      if (parentClasses?.length) {
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
  const knownParents = classElement?.subClassOf || [];
  return recursiveParentsOf(knownParents);
};
export default recursiveSubClassOf;
