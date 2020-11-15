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
  .parse(process.argv)

const ThingBuilder = require("../thing-builder")
const { schemaDomainUrl } = require("../utils/get-schema")

let thingBuilder = new ThingBuilder(
  "schemaorg/data/releases/9.0/schemaorg-all-http",
  schemaDomainUrl
)
let things = thingBuilder.things(commander.args, commander.opts())
fs.writeFileSync(
  `./pretty/ugly/${commander.args.join("-")}.json`,
  JSON.stringify(things)
)

console.log("Done! Output:", `./pretty/ugly/${commander.args.join("-")}.json`)