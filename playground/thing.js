import thingletCreator from "../src/thinglet-creator.js";
import itemListCreator from "../src/item-list-creator.js";

let thing = await thingletCreator("Thing");
console.log(thing);

let itemList = await itemListCreator("Thing");
console.log(itemList);


let a = (thing) => new Object({ ...thing, a: "added" })