const should = require("chai").should()
const Crispr = require("../crispr")
const space = require("./space")
const fs = require("fs")

before(() => {
  this.crispr = new Crispr(space["@graph"], "d:/")
  this.jay = {}
})

after(() => {
  fs.writeFileSync(`./expected.json`, JSON.stringify(this.jay))
})

for (let [model, tests] of Object.entries({
  Cosmos: {
    0: {},
    1: {},
    2: {},
    3: {},
  },
  Universe: {
    0: {},
    1: {},
    2: {},
    3: {},
  },
  Galaxy: {
    0: {},
    1: {},
    2: {},
    3: {},
  },
  SolarSystem: {
    0: {},
    1: {},
    2: {},
    3: {},
  },
  Sun: {
    0: {},
    1: {},
    2: {},
    3: {},
  },
  Planet: {
    0: {},
    1: {},
    2: {},
    3: {},
  },
  Moon: {
    0: {},
    1: {},
    2: {},
    3: {},
  },
  Asteroid: {
    0: {},
    1: {},
    2: {},
    3: {},
  },
  Satellite: {
    0: {},
    1: {},
    2: {},
    3: {},
  },
  GPS: {
    0: {},
    1: {},
    2: {},
    3: {},
  },
})) {
  describe(`class | Crispr | ${model} modelMaker in space`, () => {
    for (let [depth, expectModelMade] of Object.entries(tests)) {
      it.only(`${model} at depth ${depth}`, () => {
        let modelsMined = this.crispr.modelMiner([model], depth)
        let modelMade = this.crispr.modelMaker("Cosmos", modelsMined)
        if (!this.jay.hasOwnProperty(model)) this.jay[model] = {}
        this.jay[model][depth] = modelMade
        modelMade.should.be.eql(expectModelMade)
      })
    }
  })
}
