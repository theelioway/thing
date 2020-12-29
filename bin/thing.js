#!/usr/bin/env node
const commander = require("commander")
const fs = require("fs")

commander
  .version("1.0.0", "-v, --version")
  .usage("[OPTIONS]...")
  .option(
    "-d, --depth <int>",
    "How deep should we mine for related Thing Types",
    0
  )
  .option("-c, --comment", "Include the Schema Comments?", false)
  .option("-t, --hatch", "Hatch a little thing?", false)
  .parse(process.argv)

const ThingBuilder = require("../thing-builder")
const { schemaDomainUrl } = require("../utils/get-schema")

let thingBuilder = new ThingBuilder(
  "schemaorg/data/releases/9.0/schemaorg-all-http",
  schemaDomainUrl
)
console.log(commander.args, commander.opts())
let Thing = thingBuilder.Thing(commander.args, commander.opts())
let fileName = commander.args.join("-")
if (commander.hatch) {
  fileName = fileName.toLowerCase()
  Thing = thingBuilder.thing(Thing, commander.args.shift())
}
fs.writeFileSync(`./pretty/ugly/${fileName}.json`, JSON.stringify(Thing))

console.log("Done! Output:", `./pretty/ugly/${commander.args.join("-")}.json`)
