const fs = require("fs")
const path = require("path")
const sh = require("shelljs")
const ThingBuilder = require("./thing-builder")
const { getSchema, schemaDomainUrl } = require("./utils/get-schema")

let schemaVersion = "schemaorg/data/releases/9.0/schemaorg-all-http"
let thingBuilder = new ThingBuilder(schemaVersion, schemaDomainUrl)
let graphList = getSchema(schemaVersion)

const things = graphList
  .filter(
    a =>
      a["@type"] === "rdfs:Class" &&
      a["rdfs:comment"].slice(0, 10) !== "Data type:" &&
      !["CssSelectorType", "DataType", "XPathType"].includes(a["rdfs:label"])
  )
  .map(a => a["rdfs:label"])

fs.writeFileSync(`./things.json`, JSON.stringify(things))

let Thing = thingBuilder.Thing(things)

console.log(   thingBuilder._parentClassesOf(["ProductCollection"]) )

Object.entries(Thing).forEach(([thingType, thing]) => {
  let hierarchy = thingBuilder._parentClassesOf([thingType])
  hierarchy.pop()
  let thingPath = path.join("Things", ...hierarchy)
  sh.mkdir("-p", thingPath)
  fs.writeFileSync(
    path.join(thingPath, `${thingType}.json`),
    JSON.stringify(thing)
  )
  console.log("- ", thingType)
  let thinglet = thingBuilder.thinglet(thing, thingType)
  let thingletPath = path.join("things", ...hierarchy)
  sh.mkdir("-p", thingletPath)
  fs.writeFileSync(
    path.join(
      thingletPath,
      `${thingType[0].toLowerCase() + thingType.slice(1)}.json`
    ),
    JSON.stringify(thinglet)
  )
  console.log("       hatched thinglet ✔ ")
})
