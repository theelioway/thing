import { filter, some, isEqual } from "lodash-es"
import { parseArgs } from "../../lib/parseArgs.js"
import ItemList from "../Intangible/ItemList.js"

/** SearchAction: returns partial matches from a `thing`'s list.
 *
 * @param {Thing} thing.SearchAction.query with any Thing
 * @returns {Thing}
 */
export const SearchAction = thing => {
  thing = ItemList(thing)
  thing.SearchAction = thing.SearchAction || {}
  thing.SearchAction.query = thing.SearchAction.query || ""
  const QUERY = parseArgs(
    thing.SearchAction.query.replace(/:/g, "=").split(","),
  )
  return new Object({
    description: "Search " + JSON.stringify(thing.SearchAction.query),
    mainEntityOfPage: "SearchAction",
    name: "Search Results",
    ItemList: {
      itemListElement: filter(thing.ItemList.itemListElement, thing =>
        some(QUERY, (value, key) => isEqual(thing[key], value)),
      ),
    },
  })
}
export default SearchAction
