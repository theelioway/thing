"use strict";
import thingCreatorCreator from "./thing-creator-creator.js";
import { thingletReducer } from "./reducers.js";

export const thing = async () => await thingCreatorCreator(thingletReducer);

export default thing;
