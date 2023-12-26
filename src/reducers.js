import {
  filterPropertiesOf,
  objectArrayReduceProperties,
  valueOf,
} from "@elioway/belial";
import { aSlimmerEntity } from "../utils/index.js";

/** Reduces an array of schemaorg entities to a single object where
 * the `id` field of each entity is used as the key, and where its
 * value = `transformerFunc(entity)`.
 *
 * These are key to unlocking the power of `createThing`.
 *
 * @tutorial We use the composable function `objectArrayReduceProperties`
 * which reduces the array as described above. `objectArrayReduceProperties`
 * takes the "transformer" function as a parameter.
 * @usage
 * >> const helloWorld = GRAPH
 * >>   .filter(filterPropertiesOf(entityThing))
 * >>   .sort(objectArraySortByProperty("id"))
 * >>   .reduce(helloWorldReducer, {});
 */
export const helloWorldReducer = objectArrayReduceProperties(
  (entity) => `hello, i am the ${entity.id} entity`,
);

/** Reduces { "type": ["Property"] } entities with default/blank values
 * for all the properties; like a new blank database record.
 *
 * @tutorial Notice that we are passing the `valueOf`  as its "transformer"
 * function, which takes an entity as its parameter and determines a default
 * value for it. */
export const thingletReducer = objectArrayReduceProperties(valueOf);

/** Reduces { "type": ["Property"] } entities with the data from each entity as
 * a value for each property, which we can use as the underlying information we
 * can use to validate data and dynamically build forms and other cool stuff.
 *
 * @tutorial Notice that we are passing the `aSlimmerEntity`  as its "transformer"
 * function, which runs an objectPick pruning away some of the schemaorg stuff
 * we don't need. */
export const schemaReducer = objectArrayReduceProperties(aSlimmerEntity);

/** Reduces { "type": ["Class"] } entities and then further reduces each's
 * { "type": ["Property"] } entities to any { "type": ["Property"] } reducer. */
export const subTypeReducer = (propertyReducer, GRAPH) =>
  objectArrayReduceProperties((entity) =>
    GRAPH.filter(filterPropertiesOf(entity))
      .slice(0, 3)
      .reduce(propertyReducer, {}),
  );

const reducers = {
  thingletReducer,
  schemaReducer,
  subTypeReducer,
};

export default reducers;
