"use strict"
const fs = require("fs")

module.exports = {
  getSchema: schemaVersion => {
    const schemaPath = `${schemaVersion}.jsonld`
    console.log(schemaPath)
    const schemaContents = fs.readFileSync(schemaPath, "utf-8")
    return JSON.parse(schemaContents)["@graph"]
  },
  schemaDomainUrl: "http://schema.org/",
}
