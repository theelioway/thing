#!/usr/bin/env node
import { jsonMerge, objectDotNotatedGet, objectPick } from "@elioway/abdiel";
import { cli, pipeActions } from "@elioway/michael";
import {
  helloWorldReducer,
  subTypeReducer,
  subTypeReducerWithExtraReduction,
  thingletReducer,
} from "../src/reducers.js";
import {
  itemListCreatorCreator,
  schemaCreator,
  thingCreatorCreator,
  thingletCreator,
} from "../src/index.js";
import { WriteAction, ReturnAction } from "../src/Thing/index.js";

const getPotentialAction = (potentialAction) =>
  new Object({
    HelloWorld: thingCreatorCreator(
      helloWorldReducer,
      subTypeReducerWithExtraReduction,
    ),
    Thinglet: thingletCreator,
    Schema: schemaCreator,
    ItemList: itemListCreatorCreator(thingletReducer, (entity) =>
      objectDotNotatedGet(entity, "id"),
    ),
  })[potentialAction] || thingCreatorCreator(thingletReducer, subTypeReducer);

const thingCLI = async () => {
  const cliThing = cli();
  const { mainEntityOfPage, potentialAction, url } = cliThing;
  const thingletCreator = getPotentialAction(potentialAction);
  const newBlankThing = await thingletCreator(mainEntityOfPage || "Thing");
  let thing = jsonMerge(newBlankThing, cliThing);
  thing = await pipeActions(thing, [
    WriteAction({ url: url || "./Thing.json" }),
    ReturnAction({}),
  ]);
  console.log(
    `  ________${
      mainEntityOfPage || "Thing"
    }______________________________________________} \n`,
    thing,
  );
};

thingCLI();
