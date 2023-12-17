#!/usr/bin/env node
import { cli, michael } from "@elioway/michael";
import Thing from "../Thing/Thing.js";
import WriteAction from "../Action/CreateAction/WriteAction.js";
import TakeAction from "../Action/TransferAction/TakeAction.js";
import ReturnAction from "../Action/TransferAction/ReturnAction.js";

const thing = async (thing) => {
  thing = await cli(thing);
  thing = await michael(TakeAction(Thing(thing)), [    
    WriteAction({ url: thing.url || "./myThing.json" }),
    ReturnAction({}),
  ]);
  console.log({ thing });
};

thing();
