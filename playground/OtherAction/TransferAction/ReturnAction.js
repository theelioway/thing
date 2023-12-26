import Immutable from "immutable";

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
  return await Immutable.fromJS(prevAction.Action.result || {})
    .merge(returnAction)
    .toJS();
};

export default ReturnAction;
