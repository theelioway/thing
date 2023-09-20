import { set } from "lodash-es"
import ItemList from "./Intangible/ItemList.js"

/** Action: Creates a new Action of `thing.Action.actionStatus`=`ActionStatusType`.
 *
 * @returns {Thing}
 */
export const Action = thing => {
  thing = ItemList(thing)
  const { Action } = thing
  return new Object({
    mainEntityOfPage: "Action",
    ...thing,
    Action: {
      ...Action,
      // Default Start Action
      actionStatus: "PotentialActionStatus",
      // Default Action to set `actionStatus` = "CompletedActionStatus"
      target: thing =>
        set(thing || {}, "Action.actionStatus", "CompletedActionStatus"),
    },
  })
}

export default Action
