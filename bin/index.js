#!/usr/bin/env node
import { cliThing, michael } from "@elioway/michael";
import Thing from "../Thing/Thing.js";
import WriteAction from "../Action/CreateAction/WriteAction.js";
import TakeAction from "../Action/TransferAction/TakeAction.js";
import ReturnAction from "../Action/TransferAction/ReturnAction.js";

const michaelCLI = async (thing) => {
  thing = await cliThing(thing);
  thing = await michael(await Thing(thing), [
    TakeAction({}),
    WriteAction({ url: thing.url || "./myThing.json" }),
    ReturnAction({}),
  ]);
  console.log({ thing });
};

michaelCLI();
