"use strict";
import thingCreatorCreator from "./thing-creator-creator.js";
import { schemaReducer, subTypeReducer } from "./reducers.js";

export const schemaCreator = async (mainEntityOfPage) =>
  await thingCreatorCreator(
    schemaReducer,
    subTypeReducer,
  )(mainEntityOfPage || "Thing");

export default schemaCreator;
