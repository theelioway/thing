"use strict";
import itemListCreatorCreator from "./thing-creator-creator.js";
import { thingletReducer } from "./reducers.js";

export const thing = async () => await itemListCreatorCreator(thingletReducer);

export default thing;
