/**
 * 
 * @usage 
 * 
import thing from "@elioway/thing/promised";

thing().then((module) => {
  // Now you can access the functions and exports from "./src/index.js"
  // For example:
  module.thingletCreator("Hotel");
}).catch((error) => {
  console.error("Error loading module:", error);
});
 */

export const thing = async () => await import("./src/index.js");

export default thing;
