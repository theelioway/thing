# Quickstart thing

## Nutshell

- `git clone https://github.com/schemaorg/schemaorg.git` -

```javascript
const { schemaDomainUrl } = require("@elioway/thing/utils/get-schema")
```

```javascript
const ThingBuilder = require("@elioway/thing")
```

## How to get Schema

A ThingBuilder class converts <https://schema.org> (and other jsonld formats) into simple JSON definitions of its Things. ThingBuilder is the first step to autogenerating date models for your MVC frameworks.

**thing** delivers a JSON object with the meta data you'll need to autogenerate Models for frameworks like Django, Mongoose and GraphL. The package is a Map with a key matching the "ThingType" you are asking for, plus keys to any other ThingTypes referenced by your Thing. For instance if you selected the MoveAction

For instance, calling `ThingBuilder.thing("MoveAction")` or from the command like, `npm run thing MoveAction --depth 1`, you will get the following output.

```
{
  "MoveAction": {
    "potentialAction": {
      "type": "Action",
      "foreign": true
    },
    "name": {
      "type": "String"
    },
    // ... + all the other Fields for `schema.org/Thing`
    "engage": {
      "Action": {
        "endTime": {
          "type": "Time"
        },
        "actionStatus": {
          "type": "Text",
          "enums": ["FailedActionStatus", "CompletedActionStatus", "ActiveActionStatus", "PotentialActionStatus"]
        },
        // ... + all the other Fields for `schema.org/Action`
      },
      "MoveAction": {
        "toLocation": {
          "type": "Text"
        },
        "fromLocation": {
          "type": "Text"
        }
      }
    }
  },
  "Thing": {
    "potentialAction": {
      "type": "Action",
      "foreign": true
    },
    "name": {
      "type": "String"
    },
    // ... + all the other Fields for `schema.org/Thing`
  },
  "Action": {
    "potentialAction": {
      "type": "Action",
      "foreign": true
    },
    "name": {
      "type": "String"
    },
    // ... + all the other Fields for `schema.org/Thing`
    "engage": {
      "Action": {
        "endTime": {
          "type": "Time"
        },
        "actionStatus": {
          "type": "Text",
          "enums": ["FailedActionStatus", "CompletedActionStatus", "ActiveActionStatus", "PotentialActionStatus"]
        },
        // ... + all the other Fields for `schema.org/Action`
      }
    }
  }
}
```

In the `MoveAction` property, first fields, `potentialAction`, `identifier`, `sameAs` and so on belong to the main `Thing` class. All Things share these fields.

Inside the `engage` Map, you'll see the fields for a `Thing` subclass called `Action` and its subsubclass `MoveAction`. This means you have all the field names and their datatype grouped by the different ThingTypes in the inheritance tree. You can use these groupings logically in your client apps, but rendering forms with fieldsets for each ThingType, e.g. for `MoveAction` a fieldset for the main `Thing`, a fieldset for the `Action` fields and another for the additional Action fields for `MoveAction`.

## Using thing in your frameworks

### Schema Version

Selecting a specific version of <https://schema.org>

- `git clone https://github.com/schemaorg/schemaorg.git`

```javascript
const ThingBuilder = require("../thing-builder")
const { schemaDomainUrl } = require("@elioway/thing/utils/get-schema")
const releaseV9 = "data/releases/9.0/schemaorg-all-http"
let thingBuilder = new ThingBuilder(releaseV9, schemaDomainUrl)
```

### `ThingBuilder`

Instantiate the ThingBuilder:

```javascript
const ThingBuilder = require("../thing-builder")
let thingBuilder = new ThingBuilder(releaseV9, schemaDomainUrl)
```

### `modelMiner`

"Mine" the models which would be needed to support your chosen Schema Class/Type(s).

- `modelMiner` 1st parameter: An array of chosen Schema Class/Type(s) you want to support in your application.
- `modelMiner` 2nd parameter: Field Types can also be Schema Class/Type(s). How deep do you want to go?

```javascript
let modelsMined = thingBuilder.modelMiner(["Notary"], { depth: 0 })
```

Returns

```
[
  "LegalService",
  "LocalBusiness",
  "Notary",
  "Organization",
  "Place",
  "Thing",
]
```

```javascript
let modelsMined = thingBuilder.modelMiner(["Thing"], { depth: 0 })
```

Returns

```
["Thing"]
```

```javascript
let modelsMined = thingBuilder.modelMiner(["Thing"], { depth: 1 })
```

Returns:

```
[
  "Action",
  "CreativeWork",
  "Event",
  "ImageObject",
  "Intangible",
  "MediaObject",
  "PropertyValue",
  "Thing",
  "StructuredValue",
]
```

### `modelMaker`

Gets the particular schema you need.

```javascript
let schema = thingBuilder.modelMaker("Thing", modelsMined)
```

Returns:

```
{
  fields: {
    potentialAction: { type: "Text" },
    identifier: { type: "Text" },
    sameAs: { type: "URL" },
    url: { type: "URL" },
    image: { type: "URL" },
    alternateName: { type: "Text" },
    name: { type: "Text" },
    description: { type: "Text" },
    mainEntityOfPage: { type: "URL" },
    disambiguatingDescription: { type: "Text" },
    subjectOf: { type: "Text" },
    additionalType: { type: "URL" },
  },
  name: "Thing",
  subs: [],
}
```

```javascript
let schema = thingBuilder.modelMaker("MoveAction", modelsMined)
```

Returns:

```
{
  fields: {
    "toLocation": {
      "type": "Text"
    },
    "fromLocation": {
      "type": "Text"
    }
  },
  name: "MoveAction",
  subs: ["Thing", "Action"],
}
```

### `thing`

Return a fully round Thing with all its fields and fields of those it subclasses.

```javascript
let thing = thingBuilder.thing("StructuredValue", modelsMined, { comment: false })
```

Returns:

```
{
  "StructuredValue": {
    "potentialAction": {
      "type": "Text"
    },
    "identifier": {
      "type": "Text"
    },
    "sameAs": {
      "type": "URL"
    },
    "url": {
      "type": "URL"
    },
    "image": {
      "type": "URL"
    },
    "alternateName": {
      "type": "Text"
    },
    "name": {
      "type": "Text"
    },
    "description": {
      "type": "Text"
    },
    "mainEntityOfPage": {
      "type": "URL"
    },
    "disambiguatingDescription": {
      "type": "Text"
    },
    "subjectOf": {
      "type": "Text"
    },
    "additionalType": {
      "type": "URL"
    },
    "engage": {
      "Intangible": {},
      "StructuredValue": {}
    }
  },
  "Thing": {
    "potentialAction": {
      "type": "Text"
    },
    "identifier": {
      "type": "Text"
    },
    "sameAs": {
      "type": "URL"
    },
    "url": {
      "type": "URL"
    },
    "image": {
      "type": "URL"
    },
    "alternateName": {
      "type": "Text"
    },
    "name": {
      "type": "Text"
    },
    "description": {
      "type": "Text"
    },
    "mainEntityOfPage": {
      "type": "URL"
    },
    "disambiguatingDescription": {
      "type": "Text"
    },
    "subjectOf": {
      "type": "Text"
    },
    "additionalType": {
      "type": "URL"
    }
  },
  "Intangible": {
    "potentialAction": {
      "type": "Text"
    },
    "identifier": {
      "type": "Text"
    },
    "sameAs": {
      "type": "URL"
    },
    "url": {
      "type": "URL"
    },
    "image": {
      "type": "URL"
    },
    "alternateName": {
      "type": "Text"
    },
    "name": {
      "type": "Text"
    },
    "description": {
      "type": "Text"
    },
    "mainEntityOfPage": {
      "type": "URL"
    },
    "disambiguatingDescription": {
      "type": "Text"
    },
    "subjectOf": {
      "type": "Text"
    },
    "additionalType": {
      "type": "URL"
    },
    "engage": {
      "Intangible": {}
    }
  }
}
```

### `Options`

- `comment` if true includes the `rdfs:comment`, a brief explaination of the purpose of the field. It could be useful to include this so that when you build your web forms, you can use this value in tooltips, for instance.

- `depth` is complicated. When we are building Things of types like `Action` and `MediaObject`, these schemas come with fields whose type are also Things, like `Thing` or `CreativeWork`. The `modelMiner` judges which of those fields should use that ThingType, or those which are best converted to a simple String type. Controlling the `depth` when your "mine" for models restricts the number of ThingTypes you'll end up needing to Model. A high depth means that nearly every field contains a foreign key to another Thing. That could get difficult to maintain, and would be annoying when all your want to store is a name.

It's worthing mentioning that you can force ThingTypes to be included as foreign keys. So imagine an App storing campsites. It might be that you want to store some very basic information, so you will want to use a setting of `{ depth: 0 }`. However, you do want the geo-coords fields to point to the GeoCoordinates ThingType. Simply add `GeoCoordinates` to either the `candidateModels` parameter of the `modelMiner` function; or to the `baseModels` parameter of the `modelMaker` function.
