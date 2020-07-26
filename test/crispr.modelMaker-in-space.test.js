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
  },
  Universe: {
    0: {},
  },
  Galaxy: {
    0: {},
    1: {},
  },
  SolarSystem: {
    0: {},
    1: {},
  },
  Sun: {
    0: {},
    1: {},
  },
  Planet: {
    0: {},
    1: {},
  },
  Moon: {
    0: {},
  },
  Asteroid: {
    0: {},
    1: {},
  },
  Satellite: {
    0: {},
  },
  GPS: {
    0: {},
  },
})) {
  describe(`class | Crispr | ${model} modelMaker in space`, () => {
    for (let [depth, expectModelMade] of Object.entries(tests)) {
      it.only(`${model} at depth ${depth}`, () => {
        let modelsMined = this.crispr.modelMiner([model], depth)
        let modelMade = this.crispr.modelMaker(model, modelsMined)
        if (!this.jay.hasOwnProperty(model)) this.jay[model] = {}
        this.jay[model][depth] = modelMade
        modelMade.should.be.eql(expectModelMade)
      })
    }
  })
}
