import {  fsPathMustExist, fsWriteJson } from "@elioway/abdiel"
import { thingClone } from "../../../thing-clone.js"
import Action from "../../Action.js"

/**
 * @TODO Move to **bones**
 * Writes `action.Action.object` to a JSON file.
 * @example
 * let WriteAction = require("@elioway/thing/Action/WriteAction.js")
 * let engagedThing = { identifier: "myThing" }
 * const result = await WriteAction({ url: "myThing.json" })({ Action: { result: engagedThing }})
 * console.assert(FileExists(result.url))
 */
export const WriteAction = (writeAction) => async (prevAction) => {
  const mainEntityOfPage = "WriteAction";
  writeAction = await Action({...writeAction, mainEntityOfPage })(prevAction)

  if (!writeAction.url) {
    writeAction.Action.error = "Missing `action.url`";
    writeAction.Action.actionStatus = "FailedActionStatus";
  } else {
    await fsPathMustExist(writeAction.url)
    await fsWriteJson(      writeAction.url,writeAction.Action.object    );
    writeAction.Action.result = thingClone(writeAction.Action.object)
    writeAction.Action.actionStatus = "CompletedActionStatus";
  }
  return writeAction;
};

export default WriteAction;
