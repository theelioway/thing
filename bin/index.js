#!/usr/bin/env node
import { callMicheal, michael } from "@elioway/michael";
import Thing from "../Thing/Thing.js";

const commands = {
  SaveAction,
};

const michaelCLI = async (thing) => {
  thing = callMicheal(thing);
  console.log({ thing });
  await michael(thing, commands[thing.potentialAction]);
};

console.log(Thing(michaelCLI()));
