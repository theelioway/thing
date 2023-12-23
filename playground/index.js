"use strict";
import {
  filterPropertiesOf,
  findOf,
  mapSimplerGraph,
  objectArrayReduceProperties,
  valueOf,
  reduceAncestorClassesOf,
} from "@elioway/belial";
import { readGraphFileRelatively } from "@elioway/belial/utils";

const graph = readGraphFileRelatively(
  import.meta.url,
  "../schemaorg/data/releases/9.0/schemaorg-all-http.jsonld",
).map(mapSimplerGraph("http://schema.org/"));

// The requested entity type
const id = "WebPage";

let entity = graph.find(findOf({ id }));
const ancestors = graph
  .reduce(reduceAncestorClassesOf(entity), [])
  .filter((ent) => ent.id !== "Thing");
// const descendants = graph.reduce(reduceDescendantClassesOf(entity), [])
// const children = graph.filter(filterChildClassesOf(entity));
const properties = graph.filter(filterPropertiesOf(entity));

ancestors = [...new Set(ancestors).add(graph.find(findOf({ id: "ItemList" })))];

// Reduce entities to default/blank values.
const asThinglet = objectArrayReduceProperties(valueOf);
// Reduce entities to default/blank values.
const asMeta = objectArrayReduceProperties((entity) => entity);

new Array(asThinglet, asMeta).forEach((reducer) =>
  console.log({
    ...properties.reduce(reducer, {}),
    ...ancestors.reduce(reducer, {}),
  }),
);
