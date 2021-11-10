![](https://elioway.gitlab.io/eliothing/dna-django/elio-thing-Thing-logo.png)

> In the grand scheme of Things, **the elioWay**

# thing

## The Law

- Customize your own Schemas called, I don't know, say for example, something like **elioThing**. There is no need to restrict yourself to `Thing` `Schema.org` Type names.
- Thou shalt restrict thyself to the Properties of `Thing` `Schema.org` + the special `engage` Property which is a dictionary whose Keys are `Schema.org` Types will contain .
- Things listed should be cannonically merged when indistinct.
- Thou shalt list all things using only `Thing` `Schema.org` Properties + the special `engage` Property which should contain a list of keys inside the thing's `engage` property, which should at least have the `ItemList` Key.

### Usage of `elioThing` `Schema.org` Properties

```json
{
  "additionalType": "elioFoodEstablishment",
  "alternateName": "",
  "description": "Lengthy description field - the main textual content of this Thing",
  "disambiguatingDescription": "A candiate Property to use in cannonically merging quantifyably disambiguating listed Things.",
  "identifier": "elioThing",
  "image": "",
  "mainEntityOfPage": "The parent Type of your Schema object.",
  "name": "elioThing",
  "potentialAction": "",
  "sameAs": "https://schema.org/FoodEstablishment",
  "subjectOf": "elioWay",
  "url": "https://gitlab.com/eliothing",

}
```

### `ItemList`

```json
{
  "additionalType": "Thing",
  "alternateName": "elioThing",
  "description": "",
  "disambiguatingDescription": "A candiate Property to use in cannonically merging quantifyably disambiguating listed Things.",
  "identifier": "elioThing",
  "image": "",
  "mainEntityOfPage": "The parent Type of your Schema object.",
  "name": "elioThing",
  "potentialAction": "",
  "sameAs": "https://schema.org/Thing",
  "subjectOf": "elioWay",
  "url": "https://gitlab.com/eliothing",
  "engage": {
    "Intangible": {},
    "ItemList": {
      "itemListOrder": "",
      "itemListElement": "",
      "numberOfItems": 0
    }
  }
}
```

### The Two Exceptions

#### `engage`

- The keys used in the `engage` object can be anything you like (when Capitalised).
- Schema.org names are reserved. You must stick to that `Thing`'s _ThingSchema_ if you use Schema.org type name as a key. Just change it if you need to add extra fields: "PeoplePerson" or "PackingAction" with instance.engage.PackingAction.packedStatus = ["Packed", "Unpacked", "Borrowed", "Lent"]
- Types can choose to override any property names from the engaged thing's.
- Thou shalt use the `additionalType` property to point to the active/default key. This property
- `engage` could have a `Permit` object, holding any application credentials.
- `engage` could habe a `Date` object, with its properties createdDate, modifiedDate, etc
- if `thing.engage === false` consider it softdeleted.
- `engage` should always have an `ItemList` object with "numberOfItems" and "itemListElement": [] as required properties.

  - Thou shalt list all things as `Thing` by default, using ThingSchema by default, but with the ability to flesh out that data from a givern SchemaType from the engage Keys.
  - When the Thing is put into Engaged mode, it only lists items with the same Key as the engaged key.

**Example**

```json
  {
    "potentialAction": { "type": "Action", "foreign": true },
    "identifier": { "type": "Text" },
    "sameAs": { "type": "URL" },
    "url": { "type": "URL" },
    "image": { "type": "URL" },
    "alternateName": { "type": "Text" },
    "name": { "type": "Text" },
    "description": { "type": "Text" },
    "mainEntityOfPage": { "type": "CreativeWork", "foreign": true },
    "disambiguatingDescription": { "type": "Text" },
    "subjectOf": { "type": "CreativeWork", "foreign": true },
    "additionalType": { "type": "URL" },
    "engage": {
      "additionalType": { "type": "OptionallyPointToAnotherEngageObjectKeyForExampleMessageOrItemList" },
      "CreativeWork": {
        "CreativeWorkSchema"
      },
      "Message": {
        "MessageSchema"
      },
      "CustomTypeForExampleListen": {
        "CustomTypeSchema"
      },      
      "ItemList": {
        "itemListOrder": { "type": "Ascending/Descending/KeyToSortFunction"} },
        "numberOfItems": 0,
        "itemListElement": []

      }
    },
  }
```

#### `disengage`

- Deleted material moved from engage. This is how you soft delete. Only "god" can see this section.

## TODO from this day forward.

- Thous shalt change all occurences of the parameter name `elioName` with `identifier`
- Thous shalt change all occurences of the parameter name `elioGroup` with `subjectOf`
- Thous shalt use generator-thing to import the functionality of `eliothing/thing/bin/thing.js` (?move into `liar-thing`) producing a `<thing>.json` (i.e. empty or randomly propulated instance) or `<Thing>.json` (schema of "Thing") where `identifier` is used as the output file/folder name and if not `identifier` the lowercase version of this `thing`

(So for install if your want an app called "Thing" created )

- Thou shalt multiple theyself, Thing, across many types, formats and contexts.

TODO Index of Commands

![experimental](/artwork/icon/experimental/favicon.png "experimental")

A class which converts <https://schema.org> (and other jsonld formats) into simple JSON definitions of Models. ThingBuilder is the first step to preparing Model classes and modules for databases and MVC projects like Django, Mongoose, etc.

- [thing Documentation](https://elioway.gitlab.io/eliothing/thing/)

## Installing

- [Installing thing](https://elioway.gitlab.io/eliothing/thing/installing.html)

## Requirements

- [elioFaithful Prerequisites](https://elioway.gitlab.io/eliothing/installing.html)

## Seeing is Believing

```bash
git clone https://gitlab.com/eliothing/thing.git
npm i
gulp
# New terminal
npm run thing -- Permit Action
npm run thing -- Action --depth 2
```

## Nutshell

- [thing Quickstart](https://elioway.gitlab.io/eliothing/thing/quickstart.html)

## License

[MIT](license)

![](apple-touch-icon.png)
