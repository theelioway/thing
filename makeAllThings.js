
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

console.log(thingBuilder._parentClassesOf(["ProductCollection"]))

Object.entries(Thing).forEach(([thingType, thing]) =>
  thingBuilder.write( thingType, thing, {rooted: `./Things/`, schema: true }))
