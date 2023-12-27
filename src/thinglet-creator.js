"use strict";
import thingCreatorCreator from "./thing-creator-creator.js";
import { subTypeReducer, thingletReducer } from "./reducers.js";

export const thingletCreator = async (mainEntityOfPage) =>
  await thingCreatorCreator(
    thingletReducer,
    subTypeReducer,
  )(mainEntityOfPage || "Thing");

export default thingletCreator;
