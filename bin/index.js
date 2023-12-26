#!/usr/bin/env node
import { jsonMerge, objectPick } from "@elioway/abdiel";
import { cli, pipeActions } from "@elioway/michael";
import {
  helloWorldReducer,
  thingletReducer,
  thingCreatorCreator,
  itemListCreatorCreator,
  schemaReducer,
} from "../src/index.js";
// import WriteAction from "../Action/CreateAction/WriteAction.js";
// import ReturnAction from "../Action/TransferAction/ReturnAction.js";

const miniMe = objectPick(["identifier"]);
const potentialActions = {
  HelloWorld: thingCreatorCreator(helloWorldReducer),
  Thinglet: thingCreatorCreator(thingletReducer),
  Schema: thingCreatorCreator(schemaReducer),
  ItemList: itemListCreatorCreator(thingletReducer, miniMe),
};

const thingCLI = async () => {
  const cliThing = cli();
  const { mainEntityOfPage, potentialAction } = cliThing;
  const thingCreator =
    potentialActions[potentialAction] || thingCreatorCreator(thingletReducer);
  const blankThing = await thingCreator(mainEntityOfPage || "Thing");
  let thing = jsonMerge(blankThing, cliThing);
  // thing = await pipeActions(thing, [
  //   // WriteAction({ url: url || "./myThing.json" }),
  //   // ReturnAction({}),
  // ]);
  console.log(
    "## thing ##\n\n",
    thing,
    "\n\n## ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ##",
  );
};

thingCLI();
