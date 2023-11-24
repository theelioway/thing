import Immutable from "immutable";

("use strict");
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
 */
export const Thing = async function Thing(startThing) {
  const mainThing = "Thing";
  const immutableThing = Immutable.fromJS(startThing || {}).update(
    "mainEntityOfPage",
    (value) => value || mainThing,
  );

  // How properties are reduced: in this case to default values.
  const thingletMaker = reduceProperties(propertyDefaultValue);

  // Read the schema RDF file...
  const DIR = dirname(fileURLToPath(import.meta.url));
  const PATH = join(
    DIR,
    "./schemaorg/data/releases/9.0/schemaorg-all-http.jsonld",
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

  const { mainEntityOfPage } = immutableThing;

  // Get `mainEntityOfPage` thing.
  const thing = graph.find(findById(mainEntityOfPage));
  // Get every subClassOf except the super type `Thing`.
  const thingSubClasses = [
    ...new Set(["ItemList", ...thing.subClassOf.filter((t) => t !== "Thing")]),
  ];

  // Along with "ItemList" reduce each subclass to a key with properties.
  const subClassReduction = thingSubClasses.reduce(
    reduceSubclasses(graph, thingletMaker),
    {},
  );

  return Immutable.fromJS({
    ...thingProperties,
    ...subClassReduction,
  })
    .merge(immutableThing)
    .toJS();
};

export default Thing;
