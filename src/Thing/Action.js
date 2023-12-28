import { jsonMerge } from "@elioway/abdiel";
import { thingClone } from "../thing-clone.js";
import { thingletCreator } from "../thinglet-creator.js";

// The core composition of all Actions (which should all call this one first).
// Curry the lower-order function with instructions for the next Action.
// The previous `Action.result` is mutated to the next `Action.object`.
// You could add other steps here, like saving a backup of each `Action.result` for undo.
export const Action = (commandingAction) => async (prevAction) => {
  let action = await thingletCreator("Action");
  commandingAction = jsonMerge(action, commandingAction || {});
  commandingAction.subjectOf = prevAction;
  commandingAction.Action.object = thingClone(prevAction.Action.result);
  return commandingAction;
};

export default Action;
