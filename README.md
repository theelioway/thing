![](https://elioway.gitlab.io/eliothing/thing/elio-thing-Thing-logo.png)

> In the grand schema of things, **the elioWay**

# thing ![beta](https://elioway.gitlab.io/eliosin/icon/devops/beta/favicon.ico "beta")

A class which converts <https://schema.org> (and other jsonld formats) into
simple JSON definitions of Models.

Two reasons to love this **thing**:

1. `ThingBuilder` is the first step to preparing Model classes and modules for
   databases and MVC projects like Django, Mongoose, etc.

2. **thing** CLI is brilliant for writing out thinglets, Things or lists of
   Things.

3. [thing Documentation](https://elioway.gitlab.io/eliothing/thing/)

## Installing

- [Installing thing](https://elioway.gitlab.io/eliothing/thing/installing.html)

## Requirements

- [elioFaithful Prerequisites](https://elioway.gitlab.io/eliothing/installing.html)

## Seeing is Believing

```bash
git clone https://gitlab.com/eliothing/thing.git
cd thing
npm i

# prints "thinglet" to screen
npm run thing -- Action

# Default: print a thinglet to screen
npm run thing

# print a thinglet to screen
npm run thing -- --thinglet

# print an Action thinglet
npm run thing -- Action

# print an Thing schema
npm run thing -- --schema

# include SchemaOrg comments to your schema
npm run thing -- --schema --comments

# change the depth to which ThingBuilder will seek less primitively "typed" properties and relationships.
npm run thing -- --schema --depth 2

# write any result into this folder.
npm run thing -- --write"."

# write any result into any folder.
npm run thing -- --write"./myThings/"

# list all the subtypes of Thing
npm run thing -- --list

# list all the subtypes of Action
npm run thing -- Action --list
```

## Nutshell

- [thing Quickstart](https://elioway.gitlab.io/eliothing/thing/quickstart.html)

## License

[MIT](license)

![](https://elioway.gitlab.io/eliothing/thing/apple-touch-icon.png)
