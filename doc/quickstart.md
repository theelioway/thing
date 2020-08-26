# Quickstart thing

## Nutshell

- Requirements

```javascript
const ThingBuilder = require("@elioway/thing")
const schemaPath = "./schemaorg/data/releases/9.0/schemaorg-all-http.jsonld"
```

- Instantiate the ThingBuilder

```javascript
const schemaContents = fs.readFileSync(schemaPath, "utf-8")
const SCHEMA = JSON.parse(schemaContents)
let thingBuilder = new ThingBuilder(SCHEMA["@graph"], "http://schema.org/")
```

- "Mine" the models which would be needed to support your chosen Schema Class/Type(s).

  - `modelMiner` 1st parameter: An array of chosen Schema Class/Type(s) you want to support in your application.
  - `modelMiner` 2nd parameter: Field Types can also be Schema Class/Type(s). How deep do you want to go?

```javascript
let modelsMined = thingBuilder.modelMiner(["Accommodation", "TouristAttraction", "Restaurant"], 0)
```

- Get the particular schema you need.

```javascript
let schema = thingBuilder.modelMaker("Restaurant", modelsMined, {
  help: false, // Help
})
```
