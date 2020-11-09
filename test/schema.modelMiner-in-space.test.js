const ThingBuilder = require("../thing-builder")
const should = require("chai").should()

before(() => {
  this.fixedPrimitives = [
    "Boolean",
    "Date",
    "DateTime",
    "Number",
    "Text",
    "Time",
  ]
  this.thingBuilder = new ThingBuilder(
    "test/fixtures/space",
    "d:/",
    this.fixedPrimitives
  )
})

for (let [model, tests] of Object.entries({
  Cosmos: {
    0: ["Cosmos"],
    1: ["Cosmos", "Interestingness", "Gravitation"],
    2: ["Cosmos", "Interestingness", "Gravitation"], // eventually we reach a max
  },
  Interestingness: {
    0: ["Interestingness", "Cosmos", "Gravitation"],
    1: ["Interestingness", "Cosmos", "Gravitation"],
    2: ["Interestingness", "Cosmos", "Gravitation"],
    3: ["Interestingness", "Cosmos", "Gravitation"],
  },
  Galaxy: {
    0: ["Galaxy", "Cosmos"],
    1: ["Galaxy", "Cosmos", "Universe"],
    2: ["Galaxy", "Cosmos", "Universe", "Interestingness", "Gravitation"],
    3: ["Galaxy", "Cosmos", "Universe", "Interestingness", "Gravitation"],
  },
  SolarSystem: {
    0: ["SolarSystem", "Cosmos"],
    1: ["SolarSystem", "Cosmos", "Galaxy"],
    2: [
      "SolarSystem",
      "Cosmos",
      "Galaxy",
      "Interestingness",
      "Gravitation",
      "Universe",
    ],
    3: [
      "SolarSystem",
      "Cosmos",
      "Galaxy",
      "Interestingness",
      "Gravitation",
      "Universe",
    ],
  },
  Sun: {
    0: ["Sun", "Cosmos"],
    1: ["Sun", "Cosmos", "SolarSystem"],
    2: [
      "Sun",
      "Cosmos",
      "SolarSystem",
      "Interestingness",
      "Gravitation",
      "Galaxy",
    ],
    3: [
      "Sun",
      "Cosmos",
      "SolarSystem",
      "Interestingness",
      "Gravitation",
      "Galaxy",
      "Universe",
    ],
    4: [
      "Sun",
      "Cosmos",
      "SolarSystem",
      "Interestingness",
      "Gravitation",
      "Galaxy",
      "Universe",
    ],
  },
  Planet: {
    0: ["Planet", "Cosmos"],
    1: ["Planet", "Cosmos", "Sun"],
    2: [
      "Planet",
      "Cosmos",
      "Sun",
      "Interestingness",
      "Gravitation",
      "SolarSystem",
    ],
    3: [
      "Planet",
      "Cosmos",
      "Sun",
      "Interestingness",
      "Gravitation",
      "SolarSystem",
      "Galaxy",
    ],
    4: [
      "Planet",
      "Cosmos",
      "Sun",
      "Interestingness",
      "Gravitation",
      "SolarSystem",
      "Galaxy",
      "Universe",
    ],
    5: [
      "Planet",
      "Cosmos",
      "Sun",
      "Interestingness",
      "Gravitation",
      "SolarSystem",
      "Galaxy",
      "Universe",
    ],
  },
  Moon: {
    0: ["Moon", "Planet", "Cosmos"],
    1: ["Moon", "Planet", "Cosmos"],
  },
  Asteroid: {
    0: ["Asteroid", "Moon", "Sun", "Planet", "Cosmos"],
    1: ["Asteroid", "Moon", "Sun", "Planet", "Cosmos", "Belt"],
    2: [
      "Asteroid",
      "Moon",
      "Sun",
      "Planet",
      "Cosmos",
      "Belt",
      "Interestingness",
      "Gravitation",
      "SolarSystem",
      "ImageObject",
      "MeteorObject",
      "CreativeForce",
    ],
    3: [
      "Asteroid",
      "Moon",
      "Sun",
      "Planet",
      "Cosmos",
      "Belt",
      "Interestingness",
      "Gravitation",
      "SolarSystem",
      "Galaxy",
      "ImageObject",
      "MeteorObject",
      "CreativeForce",
    ],
    4: [
      "Asteroid",
      "Moon",
      "Sun",
      "Planet",
      "Cosmos",
      "Belt",
      "Interestingness",
      "Gravitation",
      "SolarSystem",
      "Galaxy",
      "ImageObject",
      "MeteorObject",
      "Universe",
      "CreativeForce",
    ],
    5: [
      "Asteroid",
      "Moon",
      "Sun",
      "Planet",
      "Cosmos",
      "Belt",
      "Interestingness",
      "Gravitation",
      "SolarSystem",
      "Galaxy",
      "ImageObject",
      "MeteorObject",
      "Universe",
      "CreativeForce",
    ],
  },
  Satellite: {
    0: ["Satellite", "Cosmos"],
    1: ["Satellite", "Cosmos"],
  },
  GPS: {
    0: ["GPS", "Satellite", "Cosmos"],
    1: ["GPS", "Satellite", "Cosmos"],
  },
  ImageObject: {
    0: ["ImageObject", "MeteorObject", "CreativeForce", "Cosmos"],
    1: ["ImageObject", "MeteorObject", "CreativeForce", "Cosmos"],
  },
  MeteorObject: {
    0: ["MeteorObject", "CreativeForce", "Cosmos"],
    1: ["MeteorObject", "CreativeForce", "Cosmos"],
  },
})) {
  describe(`class | ThingBuilder | modelMiner space ${model}`, () => {
    for (let [depth, modelsRequired] of Object.entries(tests)) {
      it(`${model} at depth ${depth}`, () => {
        let modelsMined = this.thingBuilder.modelMiner([model], {
          depth: depth,
        })
        modelsMined.should.have.members(modelsRequired)
      })
    }
  })
}
