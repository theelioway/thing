"use strict";
// import fs from "fs";
// import { objectPicker } from "@elioway/abdiel";
import {
  filterTypeProperties,
  findElementById,
  mapSimpleElements,
  readGraphFile,
  reducePropertiesToSchema,
  reducePropertiesToThinglet,
  sortElementsById,
  reduceTypes,
} from "../src/index.js";

let DIR = dirname(fileURLToPath(import.meta.url));
const PATH = join(
  DIR,
  "../schemaorg/data/releases/9.0/schemaorg-all-http.jsonld",
);
const graph = readGraphFile(PATH).map(mapSimpleElements).sort(sortElementsById);
let mainEntityOfPage = "WebPage";
const engaged = graph.find(findElementById(mainEntityOfPage));
const thing = graph
  .filter(filterTypeProperties("Thing"))
  .reduce(reducePropertiesToThinglet);
const subtypes = [...engaged.subClassOf, mainEntityOfPage].reduce(
  reduceTypes(graph, reducePropertiesToThinglet),
);
console.log({
  ...thing,
  ...subtypes,
});
