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
const { getSchema, schemaDomainUrl } = require("../utils/get-schema")

console.log("Getting ", commander.args, commander.opts())

let thingBuilder = new ThingBuilder(getSchema("9.0"), schemaDomainUrl)
let modelsMined = thingBuilder.modelMiner(commander.args, commander.opts())
for (let model of modelsMined) {
  let schema = thingBuilder.thing(model, modelsMined, commander.opts())
  fs.writeFileSync(`./output/${model}.json`, JSON.stringify(schema))
  console.log(model, schema)
}
