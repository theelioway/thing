"use strict";
// import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import {
  filterProperties,
  findById,
  mapRecursiveSubclasses,
  mapSimplerGraph,
  propertyDefaultValue,
  reduceProperties,
  reduceSubclasses,
  readGraphFile,
  sortById,
} from "../src/index.js";

// The requested "Thing" type
const mainEntityOfPage = "WebPage";

// How properties are reduced: in this case to default values.
const thingletMaker = reduceProperties(propertyDefaultValue);

// Read the schema RDF file...
const DIR = dirname(fileURLToPath(import.meta.url));
const PATH = join(DIR, "schemaorg-v9.jsonld");
const graph = readGraphFile(PATH)
  // map graph list to simpler elements.
  .map(mapSimplerGraph("http://schema.org/"))
  // resolve `subClassOf` property.
  .map(mapRecursiveSubclasses)
  // sort elements by the `id` field.
  .sort(sortById);

// Get the list of properties for the super type `Thing`.
const thingProperties = graph
  .filter(filterProperties("Thing"))
  .reduce(thingletMaker, {});

// Get `mainEntityOfPage` thing.
const thing = graph.find(findById(mainEntityOfPage));

// With "ItemList" + every subClassOf except the super type `Thing`.
const thingSubTypes = [
  ...new Set(["ItemList", ...thing.subClassOf.filter((t) => t !== "Thing")]),
]
  // ...reduce each class to a key for its properties.
  .reduce(reduceSubclasses(graph, thingletMaker), {});

// Output
console.log({
  ...thingProperties,
  ...thingSubTypes,
});
