const fs = require("fs")
const sh = require("shelljs")
const ThingBuilder = require("./thing-builder")
const { getSchema, schemaDomainUrl } = require("./utils/get-schema")

let schemaVersion = "schemaorg/data/releases/9.0/schemaorg-all-http"
let thingBuilder = new ThingBuilder(schemaVersion, schemaDomainUrl)
let graphList = getSchema(schemaVersion)



let allThingsPath = "./Things/"
let Thing = thingBuilder.Thing("Thing")
let entireHierarchy = { Thing: thingBuilder._listOfSubs("Thing") }

sh.mkdir("-p", allThingsPath)
const appendSubTypes (list, key) => {

  list.forEach((thingType) => {

    list[thingType] = appendSubTypes(thingBuilder._listOfSubs(thingType)    )
  })
}
appendSubTypes(entireHierarchy, key)

// Write out hierarchical object.
fs.writeFileSync(
  `./allThingsBrightAndBeautiful.json`,
  JSON.stringify(entireHierarchy, null, "  ")
)
