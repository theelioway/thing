"use strict";
import { jsonMerge } from "@elioway/abdiel";
import {
  filterPropertiesOf,
  findOf,
  reduceAncestorClassesOf,
} from "@elioway/belial";
import { getGraph } from "../utils/index.js";
import { thingletReducer, subTypeReducer } from "../src/reducers.js";

// Read in the schamaorg GRAPH.
const GRAPH = getGraph();

// The requested "mainEntityOfPage" type
const id = "WebPage";
const mainEntityOfPage = GRAPH.find(findOf({ id }));
const entityThing = GRAPH.find(findOf({ id: "Thing" }));
const entityItemList = GRAPH.find(findOf({ id: "ItemList" }));

let properties = GRAPH.filter(filterPropertiesOf(entityThing)).reduce(
  thingletReducer,
  {},
);

// `Thing` should never be included.
// `ItemList` should always be included.
// Leaving one each of the others.
let ancestors = GRAPH.reduce(reduceAncestorClassesOf(mainEntityOfPage), [])
  .filter(({ id }) => id !== "Thing" && id !== "ItemList")
  .concat(entityItemList)
  .reduce(subTypeReducer(thingletReducer, GRAPH), {});

let thing = jsonMerge(properties, ancestors);

// let children = GRAPH.filter(filterChildClassesOf(entity));
// let descendants = GRAPH.reduce(reduceDescendantClassesOf(entity), [])
// let descendants = [
//   "Thing",
//   [
//     ["Action", ["ListAction", "CreateAction"]],
//     ["CreativeWork", ["Image", "Video"]],
//     ["Event", ["ListEvent", "CreateEvent"]],
//     ["Person", []],
//     [
//       "Place",
//       [["Accommodation", [
//         'Apartment',
//         'CampingPitch',
//         'House',

//       ]], "AdministrativeArea", "CivicStructure", "Landform"],
//     ],
//   ],
// ];
