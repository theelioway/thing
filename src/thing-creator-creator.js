"use strict";
import { jsonMerge } from "@elioway/abdiel";
import {
  filterPropertiesOf,
  findOf,
  reduceAncestorClassesOf,
} from "@elioway/belial";
import getGraph from "../utils/get-graph.js";

export const thingCreatorCreator =
  (reducer, subTypeReducer) => async (mainEntityOfPage) => {
    const GRAPH = await getGraph();
    // The requested "mainEntityOfPage" type.
    const ENGAGED_GRAPH = GRAPH.find(findOf({ id: mainEntityOfPage }));
    // Everything is a `Thing`.
    const THING_GRAPH = GRAPH.find(findOf({ id: "Thing" }));
    // Anything can have a list.
    const ITEMLIST_GRAPH = GRAPH.find(findOf({ id: "ItemList" }));
    // These are the root properties of every class inheriting from `Thing`.
    const properties = GRAPH.filter(filterPropertiesOf(THING_GRAPH)).reduce(
      reducer,
      {},
    );
    // These are all the related subclasses of the requested type. `ItemList`
    // should always be included. `Thing` properties are rooted.
    let ancestors = GRAPH.reduce(reduceAncestorClassesOf(ENGAGED_GRAPH), [])
      .concat(ENGAGED_GRAPH) // add before filter in case of "Thing" or "ItemList".
      .filter(({ id }) => ![THING_GRAPH.id, ITEMLIST_GRAPH.id].includes(id))
      .concat(ITEMLIST_GRAPH)
      .reduce(subTypeReducer(reducer, GRAPH), {});
    // Merge `Thing`.properties with the requested types.
    return jsonMerge(properties, ancestors);
  };

export default thingCreatorCreator;
