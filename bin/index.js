#!/usr/bin/env node
import { jsonMerge, objectDotNotatedGet, objectPick } from "@elioway/abdiel";
import { cli, pipeActions } from "@elioway/michael";
import {
  helloWorldReducer,
  subTypeReducerWithExtraReduction,
  thingletReducer,
} from "../src/reducers.js";
import {
  itemListCreatorCreator,
  schemaCreator,
  thingCreatorCreator,
  thingletCreator,
} from "../src/index.js";
// import WriteAction from "../Action/CreateAction/WriteAction.js";
// import ReturnAction from "../Action/TransferAction/ReturnAction.js";

const miniMe = objectPick(["id"]);

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
  })[potentialAction] ||
  thingCreatorCreator(thingletReducer, subTypeReducerWithExtraReduction);

const thingCLI = async () => {
  const cliThing = cli();
  const { mainEntityOfPage, potentialAction } = cliThing;
  const thingletCreator = getPotentialAction(potentialAction);
  const newBlankThing = await thingletCreator(mainEntityOfPage || "Thing");
  let thing = jsonMerge(newBlankThing, cliThing);
  // thing = await pipeActions(thing, [
  //   // WriteAction({ url: url || "./myThing.json" }),
  //   // ReturnAction({}),
  // ]);
  console.log(
    `  ________${mainEntityOfPage}______________________________________________} \n`,
    thing,
  );
};

thingCLI();
