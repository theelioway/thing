function* uniqueNumberGenerator() {
  let counter = 0;
  while (true) {
    yield counter++;
  }
}

const generator = uniqueNumberGenerator();

export const identify = () => generator.next().value;

export const identifier = (identifierFunc) =>
  function (thing) {
    thing = thing || {};
    if (!thing.identifier) {
      thing.identifier = identifierFunc(thing);
    }
    return thing;
  };

export default identifier;
