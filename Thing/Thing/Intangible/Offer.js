import ItemList from "./ItemList.js";

/**
 * An offer to transfer some rights to an item or to provide a service.
 * @example
 * let Offer = require("@elioway/michael/Thing/Offer.js")
 * const thing1 = await Offer()
 * console.assert(!thing1.identifier)
 * console.assert(thing1.mainEntityOfPage==="Offer")
 * console.assert(thing1.ItemList.itemListElement)
 *
 * const thing2 = await Thing({ identifier: "thing-0001" })
 * console.assert(thing2.identifier==="thing-0001")
 * console.assert(thing2.mainEntityOfPage==="Offer")
 * console.assert(thing2.ItemList.itemListElement)
 */
export const Offer = async function Offer(thing) {
  const mainEntityOfPage = "Offer";
  thing = await ItemList(thing);
  thing.mainEntityOfPage = thing.mainEntityOfPage || mainEntityOfPage;
  thing.Offer = thing.Offer || {};
  return thing;
};

export default Offer;
