# thing

<figure>
  <img src="star.png" alt="">
</figure>

> In the grand scheme of Things, **the elioWay**

![experimental](https://elioway.gitlab.io/artwork/icon/experimental/favicon.png "experimental")

A ThingBuilder class converts <https://schema.org> (and other jsonld formats) into simple JSON definitions of Models. ThingBuilder is the first step to preparing Model classes and modules for databases and MVC projects like Django, Mongoose, etc.

<div><a href="installing.html">
  <button>Installing</button>
</a>
  <a href="quickstart.html">
  <button>Quickstart</button>
</a></div>

## What to expect

**thing** delivers a JSON object with the meta data your need to autogenerate Models for frameworks like Django, Mongoose and GraphL. The package is a Map with a key matching the "ThingType" you are asking for, plus keys to any other ThingTypes referenced by your Thing.

For instance, the `npm run thing MoveAction --depth 1` command returns:

```
{
  "MoveAction": {
    "name": {
      "type": "String"
    },
    // ... + all the other Fields for `schema.org/Thing`
    "engage": {
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
    "engage": {
      "Action": {
        "endTime": {
          "type": "Time"
        },
        // ... + all the other Fields for `schema.org/Action`
      }
    }
  }
}
```

## Related

<dl>
  <dt>
  <a href="https://gitlab.com/eliothing/thing-django">thing-django</a>
</dt>
  <dd>Autogenerating, Schema-based, Django Models to power View, Forms and Templates.</dd>
  <dt>
  <a href="https://gitlab.com/eliothing/thing-mongoose">thing-mongoose</a>
</dt>
  <dd>Autogenerating, Mongoose ready Schemas representing <a href="https://schema.org">https://schema.org</a> Things.</dd>
  <dt>
  <a href="https://gitlab.com/eliothing/thing-liar">thing-liar</a>
</dt>
  <dd>Fake, Schema-based, data to use in your thing development.</dd>
</dl>
