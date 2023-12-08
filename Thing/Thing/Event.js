import ItemList from "./Intangible/ItemList.js";

/**
 * An event happening at a certain time and location.
 * @example
 * let Event = require("@elioway/michael/Thing/Event.js")
 * const thing1 = await Event()
 * console.assert(!thing1.identifier)
 * console.assert(thing1.mainEntityOfPage==="Event")
 * console.assert(thing1.ItemList.itemListElement)
 *
 * const thing2 = await Thing({ identifier: "thing-0001" })
 * console.assert(thing2.identifier==="thing-0001")
 * console.assert(thing2.mainEntityOfPage==="Event")
 * console.assert(thing2.ItemList.itemListElement)
 */
export const Event = async function Event(thing) {
  const mainEntityOfPage = "Event";
  thing = await ItemList(thing);
  thing.mainEntityOfPage = thing.mainEntityOfPage || mainEntityOfPage;
  thing.Event = thing.Event || {};
  return new Object(thing);
};

export default Event;
