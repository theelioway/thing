import Immutable from "immutable";
import { ThingBuilder, schemaDomainUrl } from "./thing-builder/index.js";

const schema = "./schemaorg/data/releases/9.0/schemaorg-all-http";
const opts = { depth: 0, comments: false };
const thingBuilder = new ThingBuilder(schema, schemaDomainUrl);

/**
 * The most generic type of item.
 *
 * @param {Object_Thing} thing - The `thing` object.
 * @returns {Object_Thing} The modified `thing` object.
 * @example
 * >> const thing1 = await Thing()
 * >> console.assert(!thing1.identifier)
 * >> console.assert(thing1.mainEntityOfPage==="Thing")
 * >> console.assert(thing1.ItemList.itemListElement)
 *
 * >> const thing2 = await Thing({ identifier: "thing-0001" })
 * >> console.assert(thing2.identifier==="thing-0001")
 * >> console.assert(thing2.mainEntityOfPage==="Thing")
 * >> console.assert(thing2.ItemList.itemListElement)
 */
export const Thing = async function Thing(thing) {
  const mainEntityOfPage = "Thing";
  const immutableThing = Immutable.fromJS(thing || {}).update(
    "mainEntityOfPage",
    (value) => value || mainEntityOfPage,
  );
  let Thing = thingBuilder.Thing(immutableThing.get("mainEntityOfPage"), opts);
  let thinglet = thingBuilder.thinglet(
    Thing,
    immutableThing.get("mainEntityOfPage"),
  );
  return Immutable.fromJS(thinglet).merge(immutableThing).toJS();
};

export default Thing;
