const should = require("chai").should()
const ThingBuilder = require("../thing-builder")
const space = require("./fixtures/space")

before(() => {
  this.thingBuilder = new ThingBuilder(space["@graph"], "d:/")
})

for (let [model, tests] of Object.entries({
  Cosmos: {
    "0": {
      fields: {
        name: { type: "Text" },
        isInteresting: { type: "Text" },
      },
      name: "Cosmos",
      subs: [],
    },
    "1": {
      fields: {
        name: { type: "Text" },
        isInteresting: {
          type: "Text",
          enums: ["Boring", "Whatever", "Fascinating"],
        },
      },
      name: "Cosmos",
      subs: [],
    },
  },
  Universe: {
    "0": {
      fields: {},
      name: "Universe",
      subs: ["Cosmos"],
    },
  },
  Galaxy: {
    "0": {
      fields: { milkiness: { type: "DateTime" } },
      name: "Galaxy",
      subs: ["Cosmos"],
    },
    "1": {
      fields: { milkiness: { type: "Universe", foreign: true } },
      name: "Galaxy",
      subs: ["Cosmos"],
    },
  },
  SolarSystem: {
    "0": {
      fields: { qualifications: { type: "Text" } },
      name: "SolarSystem",
      subs: ["Cosmos"],
    },
    "1": {
      fields: {
        qualifications: { type: "Galaxy", foreign: true },
      },
      name: "SolarSystem",
      subs: ["Cosmos"],
    },
  },
  Sun: {
    "0": {
      fields: { naics: { type: "Boolean" } },
      name: "Sun",
      subs: ["Cosmos"],
    },
    "1": {
      fields: { naics: { type: "SolarSystem", foreign: true } },
      name: "Sun",
      subs: ["Cosmos"],
    },
  },
  Planet: {
    "0": {
      fields: {
        email: { type: "Date" },
        sunny: { type: "Text" },
      },
      name: "Planet",
      subs: ["Cosmos"],
    },
    "1": {
      fields: {
        email: { type: "Date" },
        sunny: { type: "Sun", foreign: true },
      },
      name: "Planet",
      subs: ["Cosmos"],
    },
  },
  Moon: {
    "0": {
      fields: { moonShine: { type: "Number" } },
      name: "Moon",
      subs: ["Cosmos", "Planet"],
    },
  },
  Asteroid: {
    "0": {
      fields: { belt: { type: "Text" } },
      name: "Asteroid",
      subs: ["Planet", "Cosmos", "Moon", "Sun"],
    },
  },
  Satellite: {
    "0": {
      fields: { satelliteName: { type: "Text" } },
      name: "Satellite",
      subs: ["Cosmos"],
    },
  },
  GPS: {
    "0": {
      fields: {
        name: { type: "Text" },
        satelliteName: { type: "Text" },
      },
      name: "GPS",
      subs: ["Cosmos", "Satellite"],
    },
  },
})) {
  describe(`class | ThingBuilder | ${model} modelMaker in space`, () => {
    for (let [depth, expectModelMade] of Object.entries(tests)) {
      it(`${model} at depth ${depth}`, () => {
        let modelsMined = this.thingBuilder.modelMiner([model], depth)
        let modelMade = this.thingBuilder.modelMaker(model, modelsMined, {
          help: false,
        })
        modelMade.should.be.eql(expectModelMade)
      })
    }
  })
}
