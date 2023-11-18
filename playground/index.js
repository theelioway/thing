"use strict";
import fs from "fs";

const domain = "http://schema.org/";
const schemaPath = "./schemaorg-v9.jsonld";
const schemaContents = fs.readFileSync(schemaPath, "utf-8");
let graph = JSON.parse(schemaContents)["@graph"];

/* Returns an array as itself; or any defined value in a list; or an empty list. */
const listAnyway = (prospect) =>
  Array.isArray(prospect) ? [...prospect] : prospect ? [prospect] : [];
/* Returns an object with the given value for a fixed property name. */
const setterOf = (property) => (prospect) =>
  new Object({
    [property]: typeof prospect == "object" ? prospect[property] : prospect,
  });
/* gets an object's value for a fixed property name. */
const getterOf = (property) => (prospect) => prospect[property];
/* Replaces the schema domain name in properties and values. */
const stringReplaceDomain = (prospect) => prospect.replace(domain, "");
/* Replaces "rdfs" prefixes in properties and values. */
const stringReplaceRDF = (prospect) =>
  prospect.replace("rdf:", "").replace("rdfs:", "");
/* Converts `{ '@id': "Stuff" }` => "Stuff" */
const getterOfID = getterOf("@id");
/* Converts "Stuff" => `{ '@id': "Stuff" }` */
const setterOfID = setterOf("@id");

// Simplify
for (let g = 0; g < graph.length; g++) {
  let element = graph[g];
  // Rename and Normalise these properties as lists.
  let listAnywayProps = ["domainIncludes", "rangeIncludes"];
  for (let p = 0; p < listAnywayProps.length; p++) {
    let newName = listAnywayProps[p];
    let oldName = `${domain}${newName}`;
    element[newName] = listAnyway(element[oldName])
      .map(setterOfID)
      .map(getterOfID)
      .map(stringReplaceDomain)
      .map(stringReplaceRDF);
    delete element[oldName];
  }

  element["id"] = stringReplaceDomain(getterOfID(element));

  element["type"] = listAnyway(element["@type"])
    .map(setterOfID)
    .map(getterOfID)
    .map(stringReplaceDomain)
    .map(stringReplaceRDF);

  element["comment"] = element["rdfs:comment"];
  element["label"] = getterOf("@value")(setterOf("@value")(element["rdfs:label"]));

  element["subPropertyOf"] = listAnyway(element["rdfs:subPropertyOf"])
    .map(getterOfID)
    .map(stringReplaceDomain);

  element["subClassOf"] = listAnyway(element["rdfs:subClassOf"])
    .map(getterOfID)
    .map(stringReplaceDomain);

  // Minify
  const {
    id,
    type,
    domainIncludes,
    rangeIncludes,
    comment,
    subPropertyOf,
    subClassOf,
  } = element;
  element = new Object({
    id,
    type,
    comment,
    domainIncludes,
    rangeIncludes,
    subPropertyOf,
    subClassOf,
  });
  graph[g] = element 
}

const thing = graph.find((element) => element["id"] === "Thing");


console.log(thing);