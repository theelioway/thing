import { jsonMerge } from "@elioway/abdiel";
import { thingClone } from "./src/index.js";

let baby = { identifier: "baby" };

let thing = {
  identifier: "mummy",
  ItemList: { itemListElement: [baby] },
};

const ExampleAction = (action) => {
  let result = thingClone(action.Action.result);
  result.ItemList.itemListElement[0].identifier = "baby2";
  return jsonMerge(action, {
    mainEntityOfPage: "TakeAction",
    Action: {
      actionStatus: "CompletedActionStatus",
      object: action.Action.result,
      result: result,
    },
  });
};

let a1 = ExampleAction({ Action: { result: thing } });

console.assert(
  a1.Action.result.ItemList.itemListElement[0].identifier !== baby.identifier,
);
