"use strict";
import { jsonMerge, objectPick } from "@elioway/abdiel";
import {
  filterPropertiesOf,
  filterChildClassesOf,
  findOf,
} from "@elioway/belial";
import getGraph from "../utils/get-graph.js";

export const itemListCreatorCreator =
  (reducer, listMapper) => async (mainEntityOfPage) => {
    const GRAPH = await getGraph();
    // The requested "mainEntityOfPage" type.
    const ENGAGED_GRAPH = GRAPH.find(findOf({ id: mainEntityOfPage }));
    // Everything is a `Thing`.
    const THING_GRAPH = GRAPH.find(findOf({ id: "Thing" }));
    // These are the root properties of every class inheriting from `Thing`.
    const properties = GRAPH.filter(filterPropertiesOf(THING_GRAPH)).reduce(
      reducer,
      {},
    );
    const itemListElement = GRAPH.filter(
      filterChildClassesOf(ENGAGED_GRAPH),
    ).map(listMapper);
    let minime = objectPick(["identifier", "mainEntityOfPage"]);
    return jsonMerge(minime(properties), {
      ItemList: { itemListElement, numberOfItems: itemListElement.length },
    });
  };

export default itemListCreatorCreator;
