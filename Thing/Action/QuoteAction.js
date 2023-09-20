import { pick } from "lodash-es"
import ItemList from "../Intangible/ItemList.js"

/** QuoteAction: console.log a summary.
 *
 * @returns {Thing}
 */
export const QuoteAction = fields => thing => {
  thing = ItemList(thing)
  thing = pick(
    {
      mainEntityOfPage: "QuoteAction",
      ...thing,
    },
    fields,
  )
  console.log(thing)
  return thing
}

export default QuoteAction
