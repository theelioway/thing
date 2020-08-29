# Quickstart thing

## Nutshell

- `git clone https://github.com/schemaorg/schemaorg.git` -

```javascript
const {
  getSchema,
  schemaDomainUrl,
} = require("@elioway/thing/utils/get-schema")
const releaseV9 = getSchema("9.0")["@graph"]
```

```javascript
const ThingBuilder = require("@elioway/thing")
```

- Instantiate the ThingBuilder

```javascript
let thingBuilder = new ThingBuilder(releaseV9, schemaDomainUrl)
```

- "Mine" the models which would be needed to support your chosen Schema Class/Type(s).

  - `modelMiner` 1st parameter: An array of chosen Schema Class/Type(s) you want to support in your application.
  - `modelMiner` 2nd parameter: Field Types can also be Schema Class/Type(s). How deep do you want to go?

```javascript
let modelsMined = thingBuilder.modelMiner(
  ["Accommodation", "TouristAttraction", "Restaurant"],
  0
)
```

- Get the particular schema you need.

```javascript
let schema = thingBuilder.modelMaker("Restaurant", modelsMined, {
  help: false, // If true, adds Schema.org's explanation of the field. Can be useful for Form hints, etc
})
```

## Selecting a specific version of Schema.org

- `git clone https://github.com/schemaorg/schemaorg.git`

```javascript
const {
  getSchema,
  schemaDomainUrl,
} = require("@elioway/thing/utils/get-schema")
const releaseV9 = getSchema("7.0")["@graph"]
let thingBuilder = new ThingBuilder(releaseV9, schemaDomainUrl)
```
