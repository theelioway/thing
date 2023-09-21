"use strict"
import fs from "fs"

export const getSchema = (schemaVersion) => {
  const schemaPath = `${schemaVersion}.jsonld`
  const schemaContents = fs.readFileSync(schemaPath, "utf-8")
  return JSON.parse(schemaContents)["@graph"]
}

export const schemaDomainUrl = "http://schema.org/"

export default getSchema
