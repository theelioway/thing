// import { cliThing, michael } from "@elioway/michael";
import {
  helloWorldReducer,
  thingletReducer,
  schemaReducer,
  createThing,
} from "../src/index.js";

// import Thing from "../Thing/Thing.js";
// import WriteAction from "../Action/CreateAction/WriteAction.js";
// import TakeAction from "../Action/TransferAction/TakeAction.js";
// import ReturnAction from "../Action/TransferAction/ReturnAction.js";
// const michaelCLI = async (thing) => {
//   thing = await cliThing(thing);
//   thing = await michael(await Thing(thing), [
//     TakeAction({}),
//     WriteAction({ url: thing.url || "./myThing.json" }),
//     ReturnAction({}),
//   ]);
// };
// michaelCLI();

let createThinglet = createThing(thingletReducer);
let helloWorld = createThing(helloWorldReducer);
let createSchema = createThing(schemaReducer);
