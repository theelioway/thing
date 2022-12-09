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
// fs.writeFileSync(`${allThingsPath}allThingsBrightAndBeautiful.json`, JSON.stringify(things, null,"  "))

let entireHierarchy = {}
sh.mkdir("-p", allThingsPath)

let Thing = thingBuilder.Thing(things)
Object.entries(Thing).forEach(([thingType, thing]) => {
  let hierarchy = thingBuilder._parentClassesOf([thingType])
  set(entireHierarchy, hierarchy.join("."), true)
  thingBuilder.writeOut( thingType, thing, {rooted: allThingsPath, scheme: true, thingletName: thingType[0].toLowerCase() + thingType.slice(1) })
})

fs.writeFileSync(`./entireHierarchy.json`, JSON.stringify(entireHierarchy, null,"  "))
