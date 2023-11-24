/**
 * A list of items of any sort—for example.
 * @example
 * const thing1 = await Thing()
 * console.assert(!thing1.identifier)
 * console.assert(!thing1.mainEntityOfPage)
 * console.assert(thing1.hasOwnProperty("ItemList"))
 * console.assert(thing1.ItemList.hasOwnProperty("itemListElement"))
 * console.assert(Array.isArray(thing1.ItemList.itemListElement))
 */
export const ItemList = async function ItemList(thing) {
  thing = thing || {};
  thing.ItemList = thing.ItemList || {};
  thing.ItemList.itemListElement = thing.ItemList.itemListElement || [];
  return thing;
};

export default ItemList;
