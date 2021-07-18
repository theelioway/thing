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
Object.entries(Thing).forEach(([thingType, thing]) => {
  fs.writeFileSync(`./pretty/ugly/${thingType}.json`, JSON.stringify(thing))
  if (commander.hatch) {
    let thinglet = thingBuilder.thinglet(thing, thingType)
    fs.writeFileSync(
      `./pretty/ugly/${thingType.toLowerCase()}.json`,
      JSON.stringify(thinglet)
    )
  }
})

console.log("Done! Output:", `./pretty/ugly/${commander.args.join("-")}.json`)
