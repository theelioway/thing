import { parseCliArgs } from "@elioway/michael";
import ItemList from "./Intangible/ItemList.js";
import Thing from "../Thing.js";

const ACTIONSTATUSMESSAGE = {
  ActiveActionStatus: "in-progress",
  CompletedActionStatus: "already taken place",
  FailedActionStatus: "failed to complete",
  PotentialActionStatus: "supported",
};

/**
 * An action performed by a direct agent and indirect participants upon
 * a direct object.
 * @example
 * let Action = require("@elioway/michael/Thing/Action.js") *
 * const thing1 = await Action()
 * console.assert(!thing1.identifier)
 * console.assert(thing1.mainEntityOfPage==="Action")
 * console.assert(!thing1.Action.object.identifier)
 * console.assert(!thing1.Action.result.identifier)
 * console.assert(thing1.Action.object.mainEntityOfPage==="Action")
 * console.assert(thing1.Action.result.mainEntityOfPage==="Action")
 * console.assert(thing1.Action.provider(thing1.Action.object)===thing1.Action.result)
 *
 *
 * const thing2 = await Action({
 *    Action: { object: { identifier: "thing-0001" } }
 * })
 * console.assert(!thing2.identifier)
 * console.assert(thing2.mainEntityOfPage==="Action")
 * console.assert(thing2.Action.object.identifier==="thing")
 * console.assert(thing2.Action.result.identifier==="thing")
 * console.assert(thing2.Action.provider(thing2.Action.object)===thing2.Action.result)
 */
export const Action = async function Action(thing) {
  const mainEntityOfPage = "Action";
  thing = await ItemList(thing);
  thing.mainEntityOfPage = thing.mainEntityOfPage || mainEntityOfPage;
  const default_provision = (object) => object;
  // default parameters of Action
  thing.Action = thing.Action || {};
  // an `Object` to use for `whatever` by `provider` function.
  thing.Action.instrument = thing.Action.instrument || "";
  if (typeof thing.Action.instrument === "string") {
    thing.Action.instrument = parseCliArgs(
      thing.Action.instrument.split(","),
      ":",
    );
  }
  // The `thing` to use as the object of an action.
  thing.Action.object = await ItemList(thing.Action.object || (await Thing()));
  // The `result` leave.
  // thing.Action.result = {}
  // The `provider` function for actioning a `thing`.
  thing.Action.provider = thing.Action.provider || default_provision;
  // The default `actionStatus`.
  thing.Action.actionStatus =
    thing.Action.actionStatus || "PotentialActionStatus";

  let message = ACTIONSTATUSMESSAGE[thing.Action.actionStatus];
  // The least `action`.
  return new Object({
    ...thing,
    description: [
      thing.mainEntityOfPage,
      " [instrument:",
      JSON.stringify(thing.Action.instrument),
      "] ",
    ]
      .join("")
      .trim(),
    name: [
      thing.Action.object.identifier,
      thing.Action.object.mainEntityOfPage,
      thing.mainEntityOfPage,
    ]
      .join("")
      .trim(),
  });
};

export default Action;
