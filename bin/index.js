#!/usr/bin/env node
const commander = require("commander")
const path = require("path")

commander
  .version("1.0.0", "-v, --version")
  .usage("[OPTIONS]...")
  .option(
    "-d, --depth <int>",
    "How deep should we mine for related Thing Types",
    0
  )
  .option(
    "-w, --write <str>",
    "The root path to write JSON, relative to here. No write if blank."
  )
  .option("-c, --comment", "Include the Schema Comments?", false)
  .option("-s, --schema", "Create the schema?", false)
  .option("-t, --thinglet", "Create the thinglet?", false)
  .parse(process.argv)

const ThingBuilder = require("../thing-builder")
const { schemaDomainUrl } = require("../utils/get-schema")

let thingBuilder = new ThingBuilder(
  "schemaorg/data/releases/9.0/schemaorg-all-http",
  schemaDomainUrl
)
let { comment, depth, write, schema, thinglet } = commander.opts()
// It has to do something!
if (!schema && !thinglet) {
  thinglet = true
}
// Build
let Thing = thingBuilder.Thing(commander.args, commander.opts())
// Write Out
Object.entries(Thing).forEach(([thingType, thing]) => {
  if (commander.args.includes(thingType)) {
    thingBuilder.writeOut(thingType, thing, {
      write, schema, thinglet,
      thingletName: thingType[0].toLowerCase() + thingType.slice(1),
    })
  }
})
