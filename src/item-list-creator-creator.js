"use strict";
import { jsonMerge } from "@elioway/abdiel";
import { findOf, filterChildClassesOf } from "@elioway/belial";
import getGraph from "../utils/get-graph.js";
import createThing from "./thing-creator-creator.js";

export const itemListCreatorCreator = async (
  propertyReducer,
  itemListElementMapper,
) =>
  async function ItemListCreator(entity) {
    const { id } = entity;
    const thingCreator = createThing(propertyReducer);
    const thing = await thingCreator({ id: "ItemList" });

    // // Read in the schamaorg GRAPH.
    // const GRAPH = getGraph();
    // // The requested "mainEntityOfPage" type.
    // const mainEntityOfPage = GRAPH.find(findOf({ id }));
    // // These are the immediate classes of the requested type.
    // engagedThing.ItemList.ItemListElement = GRAPH.filter(
    //   filterChildClassesOf(mainEntityOfPage),
    // ).map(itemListElementMapper);
    return jsonMerge({}, engagedThing);
  };

export default itemListCreatorCreator;
