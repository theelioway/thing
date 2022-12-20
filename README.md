![](https://elioway.gitlab.io/eliothing/thing/elio-thing-Thing-logo.png)

> In the grand schema of things, **the elioWay**

# thing ![beta](https://elioway.gitlab.io/eliosin/icon/devops/beta/favicon.ico "beta")

A class which converts <https://schema.org> (and other jsonld formats) into simple JSON definitions of Models. ThingBuilder is the first step to preparing Model classes and modules for databases and MVC projects like Django, Mongoose, etc.

- [thing Documentation](https://elioway.gitlab.io/eliothing/thing/)

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
# prints "thinglet" to screen
npm run thing -- Action --thinglet
# prints "schema" to screen
npm run thing -- Action --schema
# prints "schema" with schema comments to screen
npm run thing -- Action --schema --comment
# writes out "schema" to a hierarchical folder inside `output`
npm run thing -- Action --schema --output="~/MyStuff/"
# writes out "thinglet" inside `output`
npm run thing -- Action --thinglet --output="~/MyStuff/"
# writes out "thinglet" AND "schema"  inside `output`
npm run thing -- Action --schema --thinglet  --output="~/MyStuff/"
# prints "schema" with schema comments to screen
npm run thing -- Permit Action --depth 2 --schema
# Shouldn't be needed, but for prettier output
npm run prettier
```

## Nutshell

- [thing Quickstart](https://elioway.gitlab.io/eliothing/thing/quickstart.html)

## License

[MIT](license)

![](https://elioway.gitlab.io/eliothing/thing/apple-touch-icon.png)
