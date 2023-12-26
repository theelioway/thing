"use strict";
import { jsonMerge } from "@elioway/abdiel";
import {
  filterPropertiesOf,
  findOf,
  reduceAncestorClassesOf,
} from "@elioway/belial";
import getGraph from "../utils/get-graph.js";
import { subTypeReducer } from "./reducers.js";

export const thingCreatorCreator = (reducer) =>
  async function ThingCreator(mainEntityOfPage) {
    const GRAPH = await getGraph();
    // The requested "mainEntityOfPage" type.
    const mainEntity = GRAPH.find(findOf({ id: mainEntityOfPage }));
    const THING = GRAPH.find(findOf({ id: "Thing" }));
    const ITEMLIST = GRAPH.find(findOf({ id: "ItemList" }));
    // These are the root properties of every class inheriting from `Thing`.
    const props = GRAPH.filter(filterPropertiesOf(THING)).reduce(reducer, {});
    // These are all the related subclasses of the requested type. `ItemList`
    // should always be included. `Thing` properties are rooted.
    const subs = GRAPH.reduce(reduceAncestorClassesOf(mainEntity), [])
      .filter(({ id }) => id !== "Thing" && id !== "ItemList")
      .concat(ITEMLIST)
      .reduce(subTypeReducer(reducer, GRAPH), {});
    return jsonMerge(props, subs);
  };

export default thingCreatorCreator;
