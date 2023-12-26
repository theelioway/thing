function* uniqueNumberGenerator() {
  let counter = 0;
  while (true) {
    yield counter++;
  }
}

const generator = uniqueNumberGenerator();

export const identify = () => generator.next().value;

/**
 * The identifier property represents any kind of identifier for any kind of Thing
 * Returns the `thing` with an `identifier`.
 * @example
 * const thing1 = await Thing()
 * console.assert(!thing.identifier)
 *
 * const thing2 = await identifier(await Thing())
 * console.assert(thing2.identifier==="1")
 *
 * const thing3 = await identifier()
 * console.assert(thing3.identifier==="2")
 * console.assert(await identifier().identifier==="3")
 * console.assert(await identifier().identifier==="4")
 * console.assert(await identifier().identifier==="5")
 *
 * const thing4 = await identifier({ name: "My Blue Thing" })
 * console.assert(thing4.identifier==="my-blue-thing-1")
 *
 * const thing5 = identifier({ identifier: "my-blue-thing" })
 * console.assert(thing5.identifier==="my-blue-thing")
 */
export const identifier = (identifierFunc) =>
  async function (thing) {
    thing = thingClone(thing || {});
    if (!thing.identifier) {
      thing.identifier = identifierFunc(thing);
    }
    return thing;
  };

export default identifier;
