const fs = require("fs")
const sh = require("shelljs")
const { set } = require("lodash")
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

let allThingsPath = "./Things/"
let entireHierarchy = {}
let Thing = thingBuilder.Thing(things)

sh.mkdir("-p", allThingsPath)
Object.entries(Thing).forEach(([thingType, thing]) => {
  // Use the hierarchy list to build a hierarchical object.
  /** @TODO This hierarchy list is ... occasionally subversive (the lower
   * classes are rising). */
  let hierarchy = thingBuilder._parentClassesOf([thingType])
  set(entireHierarchy, hierarchy.join("."), hierarchy.at(-2))
  // Write out this thing.
  thingBuilder.writeOut(thingType, thing, {
    rootedIn: allThingsPath,
    scheme: true,
    thingletName: thingType[0].toLowerCase() + thingType.slice(1),
  })
})

// Write out hierarchical object.
fs.writeFileSync(
  `./allThingsBrightAndBeautiful.json`,
  JSON.stringify(entireHierarchy, null, "  ")
)
