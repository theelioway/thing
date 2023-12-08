import ItemList from "./Intangible/ItemList.js";

/**
 * The most generic kind of creative work.
 * @example
 * import CreativeWork from "@elioway/michael/CreativeWork.js"
 * const thing = await CreativeWork()
 * console.assert(!thing.identifier)
 * console.assert(thing.mainEntityOfPage==="CreativeWork")
 * console.assert(isObject(thing.CreativeWork))
 */
export const CreativeWork = async function CreativeWork(thing) {
  const mainEntityOfPage = "CreativeWork";
  thing = await ItemList(thing);
  thing.mainEntityOfPage = thing.mainEntityOfPage || mainEntityOfPage;
  thing.CreativeWork = thing.CreativeWork || {};
  return thing;
};

export default CreativeWork;
