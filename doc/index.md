<aside>
  <dl>
  <dd>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; created all</dd>
  <dd>Such to perfection, one first matter all,</dd>
  <dd>Endued with various forms, various degrees</dd>
  <dd>Of substance, and, in things that live, of life;</dd>
</dl>
</aside>

A ThingBuilder class converts <https://schema.org> (and other jsonld formats)
into simple JSON definitions of Models.

Two reasons to love this **thing**:

1. `ThingBuilder` is the first step to preparing Model classes and modules for
   databases and MVC projects like Django, Mongoose, etc.

2. **thing** CLI is brilliant for writing out thinglets, Things or lists of
   Things.

# Seeing is Believing

```
npm i @elioway/thing

# Default: print a thinglet to screen
thing

# print a thinglet to screen
thing --thinglet

# print an Action thinglet
thing Action

# print an Thing schema
thing --schema

# include SchemaOrg comments to your schema
thing --schema --comments

# change the depth to which ThingBuilder will seek "typed" relationships
thing --schema --depth 2

# write any result into this folder.
thing --write "./myThings/"

# list all the subtypes of Thing
thing --list

# list all the subtypes of Action
thing Action --list
```

# What to expect

**thing** delivers a JSON object with the meta data your need to autogenerate
Models for frameworks like Django, Mongoose and GraphL. The package is a Map
with a key matching the "ThingType" you are asking for, plus keys to any other
ThingTypes referenced by your Thing.

For instance, the `npm run thing MoveAction --depth 1` command returns:

```
{
  "MoveAction": {
    "name": {
      "type": "String"
    },
    // ... + all the other Fields for `schema.org/Thing`
    "Action": {
      "endTime": {
        "type": "Time"
      },
      // ... + all the other Fields for `schema.org/Action`
    },
    "MoveAction": {
      "toLocation": {
        "type": "Text"
      },
      // ... + all the other Fields for `schema.org/MoveAction`
    }
  },
  "Thing": {
    "name": {
      "type": "String"
    },
    // ... + all the other Fields for `schema.org/Thing`
  },
  "Action": {
    "name": {
      "type": "String"
    },
    // ... + all the other Fields for `schema.org/Thing`
    "Action": {
      "endTime": {
        "type": "Time"
      },
      // ... + all the other Fields for `schema.org/Action`
    }
  }
}
```

# Family

- [eliothing/django-thing](/eliothing/django-thing)
- [eliothing/thing-liar](/eliothing/thing-liar)
- [eliothing/mongoose-thing](/eliothing/mongoose-thing)
