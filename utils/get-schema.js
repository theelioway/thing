"use strict"
const fs = require("fs")

module.exports = {
  getSchema: ver => {
    const schemaPath = `./schemaorg/data/releases/${ver}/schemaorg-all-http.jsonld`
    const schemaContents = fs.readFileSync(schemaPath, "utf-8")
    return JSON.parse(schemaContents)["@graph"]
  },
  schemaDomainUrl: "http://schema.org/",
}
