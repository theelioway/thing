"use strict";
import thingCreatorCreator from "./thing-creator-creator.js";
import { schemaReducer } from "./reducers.js";

export const Thing = async () => await thingCreatorCreator(schemaReducer);

export default Thing;
