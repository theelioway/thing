import fs from "fs"
import humps from "humps"
import ThingBuilder from "./src/thing-builder.js"
import { schemaDomainUrl } from "./src/utils/get-schema.js"

const schemaVersion = "./schemaorg/data/releases/9.0/schemaorg-all-http"
const thingBuilder = new ThingBuilder(schemaVersion, schemaDomainUrl)
const rootOfAllThings = "./Things"

const mkdirIfNotExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath)
  }
}

const allThings = (parentType, path) => {
  path = path + "/" + parentType
  mkdirIfNotExists(path)
  thingBuilder._listSubs(parentType).forEach((childType) => {
    let bright = thingBuilder.Thing(childType)
    let beautiful = thingBuilder.thinglet(bright, childType)
    console.log({ bright, beautiful })
    fs.writeFileSync(
      `./${path}/${childType}.json`,
      JSON.stringify(bright, null, 2),
    )

    fs.writeFileSync(
      `./${path}/${humps.camelize(childType)}.json`,
      JSON.stringify(beautiful, null, 2),
    )
    // allThings(childType, path)
  })
}

mkdirIfNotExists(rootOfAllThings)

allThings("Thing", rootOfAllThings)
