import ThingBuilder from "./src/thing-builder.js"
import { schemaDomainUrl } from "./src/utils/get-schema.js"
// import ItemList from "./Thing/Intangible/ItemList.js"

const schema = "./schemaorg/data/releases/9.0/schemaorg-all-http"
const opts = { depth: 0, comments: false }
const thingBuilder = new ThingBuilder(schema, schemaDomainUrl)

/**
 * The most generic type of item.
 *
 * @param {Object_Thing} thing - The `thing` object.
 * @mutates {Object_Thing} `thing` object
 * @into {Object_Thing} `thing` object
 * @returns {Object_Thing} The modified `thing` object.
 * @example
 * const thing1 = await Thing()
 * console.assert(!thing1.identifier)
 * console.assert(thing1.mainEntityOfPage==="Thing")
 * console.assert(thing1.ItemList.itemListElement)
 *
 * const thing2 = await Thing({ identifier: "thing-0001" })
 * console.assert(thing2.identifier==="thing-0001")
 * console.assert(thing2.mainEntityOfPage==="Thing")
 * console.assert(thing2.ItemList.itemListElement)
 */
export const Thing = async function Thing(thing) {
  const mainEntityOfPage = "Thing"
  thing = thing || {}
  thing.mainEntityOfPage = thing.mainEntityOfPage || mainEntityOfPage
  let Thing = thingBuilder.Thing(thing.mainEntityOfPage, opts)
  let thinglet = thingBuilder.thinglet(Thing, thing.mainEntityOfPage)
  return { ...thinglet, ...thing }
}

export default Thing
