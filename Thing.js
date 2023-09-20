

//   .option(
//     "-d, --depth <int>",
//     "How deep should we mine for related Thing Types",
//     0
//   )
//   .option(
//     "-w, --write <str>",
//     "The root path to write JSON, relative to here. No write if blank."
//   )
//   .option("-c, --comments", "Include the Schema Comments?", false)
//   .option("-s, --schema", "Create the schema?", false)
//   .option("-t, --thinglet", "Create the thinglet?", false)
//   .option("-l, --list", "Find the perfect Thing", false)
//   .parse(process.argv)


import ItemList from "./Thing/Intangible/ItemList.js"

/** Thing returns very least `thing`
 *
 * @param {Thing} thing (optional)
 * @returns {Thing}
 */
export const Thing = thing => {
  thing = ItemList(thing)
  thing.mainEntityOfPage = thing.mainEntityOfPage || "Thing"
  return thing
}

export default Thing

import ThingBuilder from "./thing-builder.js"
import { schemaDomainUrl } from "./utils/get-schema.js"

let thingBuilder = new ThingBuilder(
  "schemaorg/data/releases/9.0/schemaorg-all-http",
  schemaDomainUrl,
)

let { list, schema, thinglet, write } = commander.opts()
// It has to do something!
if (!schema && !thinglet && !list) {
  thinglet = true
}
if (!commander.args.length) {
  commander.args.push("Thing")
}

// Build
let Thing = thingBuilder.Thing(commander.args, commander.opts())
// Write Out
Object.entries(Thing).forEach(([thingType, thing]) => {
  if (commander.args.includes(thingType)) {
    thingBuilder.writeOut(thingType, thing, {
      write,
      schema,
      thinglet,
      list,
      thingletName: thingType[0].toLowerCase() + thingType.slice(1),
    })
  }
})
