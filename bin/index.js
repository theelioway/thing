#!/usr/bin/env node
import { callMicheal, michael } from "@elioway/michael";
import Thing from "../Thing.js";

const michaelCLI = async (thing) => {
  thing = callMicheal(thing);
  console.log({ thing });
  await michael(thing, commands[thing.potentialAction]);
};

console.log(Thing(michaelCLI()));
