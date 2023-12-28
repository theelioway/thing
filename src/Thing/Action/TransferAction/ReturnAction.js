import { thingClone } from "../../../thing-clone.js"
import Action from "../../Action.js"

/**
 * The act of returning to the origin that which was previously received (concrete objects) or taken (ownership).
 * @returns {Object_ActionThing} The modified `action` object.
 * @throws {Object_Message} `message.Action.error`
 * @example
 * let UpdateAction = require("@elioway/michael/Action/UpdateAction.js")
 * let thing = '{\n "name": "myThing" \n}'
 * const results = await ReceiveAction({ Action: { object: thing } })
 * console.assert(results.Action.result.name === "myThing")
 */
export const ReturnAction = (returnAction) => async (prevAction) => {
  const mainEntityOfPage = "ReturnAction";
  returnAction =await Action({...returnAction, mainEntityOfPage })(prevAction)
  returnAction.Action.result = thingClone(returnAction.Action.object)
  returnAction.Action.actionStatus = "CompletedActionStatus";
  return returnAction.Action.result;
};

export default ReturnAction;
