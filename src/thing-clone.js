"use strict";
import { jsonClone } from "@elioway/abdiel";

/**
 * Creates a deep clone of an thing by serializing it to JSON and then parsing it.
 *
 * @param {Object} thing - The thing to be cloned.
 * @returns {Object} Returns a deep copy of the input thing.
 * @example
 * const originalObject = { address: { city: 'New York' } };
 * const clonedObject = thingCloner(originalObject);
 * originalObject.address.city = "London";
 * console.assert(clonedObject.address.city === "New York")
 */
export const thingClone = (thing) =>
  Object.assign({
    ...thing,
    ItemList: {
      ...thing.ItemList,
      itemListElement: thing.ItemList.itemListElement.map(jsonClone),
    },
  });

export default thingClone;
