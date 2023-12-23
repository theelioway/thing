"use strict";
import Immutable from "immutable";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import {
  filterProperties,
  findOf,
  mapRecursiveSubclasses,
  mapSimplerGraph,
  propertyDefaultValueOf,
  reduceProperties,
  reduceSubclasses,
  readGraphFile,
  sortById,
  sortObjectEntriesLowercaseFirst,
} from "../src/index.js";

/**
 * The most generic type of item.
 *
 * @param {Object_Thing} thing - The `thing` object.
 * @returns {Object_Thing} The modified `thing` object.
 * @example
 * >> const thing1 = await Thing()
 * >> console.assert(!thing1.identifier)
 * >> console.assert(thing1.mainEntityOfPage==="Thing")
 * >> console.assert(thing1.ItemList.itemListElement)
 *
 * >> const thing2 = await Thing({ identifier: "thing-0001" })
 * >> console.assert(thing2.identifier==="thing-0001")
 * >> console.assert(thing2.mainEntityOfPage==="Thing")
 * >> console.assert(thing2.ItemList.itemListElement)
 *
 * >> const thing3 = await Thing({ main: "WebPage" })
 * >> console.assert(!thing1.identifier)
 * >> console.assert(thing2.mainEntityOfPage==="WebPage")
 * >> console.assert(thing2.ItemList.itemListElement)
 */
export const Thing = async function Thing(startThing) {
  const mainThing = "Thing";
  const immutableThing = await Immutable.fromJS(startThing || {}).update(
    "mainEntityOfPage",
    (value) => value || mainThing,
  );
  // How properties are reduced: in this case to default values.
  const thingletMaker = reduceProperties(propertyDefaultValueOf);
  // Read the schema RDF file...
  const DIR = dirname(fileURLToPath(import.meta.url));
  const PATH = join(
    DIR,
    "../schemaorg/data/releases/9.0/schemaorg-all-http.jsonld",
  );
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
  const { mainEntityOfPage } = immutableThing.toJS();
  // Get `mainEntityOfPage` thing.
  const graphThing = graph.find(findOf(mainEntityOfPage));
  // Get every subClassOf except the super type `Thing`.
  const thingSubClasses = [
    ...new Set([
      "ItemList",
      ...graphThing.subClassOf.filter((t) => t !== "Thing"),
    ]),
  ];
  // Along with "ItemList" reduce each subclass to a key with properties.
  const subClassReduction = thingSubClasses.reduce(
    reduceSubclasses(graph, thingletMaker),
    {},
  );
  // Return Immutable
  let thing = await Immutable.fromJS({
    ...thingProperties,
    ...subClassReduction,
  })
    .merge(immutableThing)
    .toJS();
  return Object.fromEntries(
    Object.entries(thing).sort(sortObjectEntriesLowercaseFirst),
  );
};

export default Thing;
