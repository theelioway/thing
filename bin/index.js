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
    "-r, --rooted <str>",
    "The root path to write JSON, relative to here.",
    0
  )
  .option("-c, --comment", "Include the Schema Comments?", false)
  .option("-t, --scheme", "Create the schema?", false)
  .parse(process.argv)

const ThingBuilder = require("../thing-builder")
const { schemaDomainUrl } = require("../utils/get-schema")

let thingBuilder = new ThingBuilder(
  path.join(__dirname ,  "../schemaorg/data/releases/9.0/schemaorg-all-http"),
  schemaDomainUrl
)
let { comment, depth, rooted, scheme } = commander.opts()
// Default here.
rooted = rooted ? rooted : `./`
// Build
let Thing = thingBuilder.Thing(commander.args, commander.opts())
// Write Out
Object.entries(Thing).forEach(([thingType, thing]) =>{
if (commander.args.includes(thingType)) {
  thingBuilder.writeOut(thingType, thing, { scheme,  rooted })}})

console.log("Done! Output:", rooted)
