"use strict";
// import fs from "fs";
// import { objectPicker } from "@elioway/abdiel";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import {
  filterClassProperties,
  findElementById,
  mapGraphToSimpleElements,
  propertyElementToDefaultValue,
  reduceProperties,
  reduceClasses,
  readGraphFile,
  sortElementsById,
} from "../src/index.js";

const thingletMaker = reduceProperties(propertyElementToDefaultValue);

// The requested "Thing" type
const mainEntityOfPage = "WebPage";
// Read the schema RDF file...
const DIR = dirname(fileURLToPath(import.meta.url));
const PATH = join(DIR, "schemaorg-v9.jsonld");
const graph = readGraphFile(PATH)
  .map(mapGraphToSimpleElements) // map graph list to simpler elements.
  .sort(sortElementsById); // map sort elements by the `id` field.
// Get the element for `mainEntityOfPage`.
const thing = graph.find(findElementById(mainEntityOfPage));
// Get the list of properties for the super type `Thing`.
const thingProperties = graph
  .filter(filterClassProperties("Thing"))
  .reduce(thingletMaker);
// For `mainEntityOfPage` and ever parent type...
const thingSubTypes = [
  ...new Set(["ItemList", mainEntityOfPage, ...thing.subClassOf]),
]
  .filter((t) => t !== "Thing") // ...except the super type `Thing`.
  .reduce(reduceClasses(graph, thingletMaker)); // ...reduce each type to a key for its properties.
// Output
console.log({
  ...thingProperties,
  ...thingSubTypes,
});
