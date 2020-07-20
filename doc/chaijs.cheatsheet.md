# ChaiJS Should Cheat Sheet

- Thanks [Rico](https://devhints.io/chai)

## Require

```
const should = require('chai').should()
```

## Basics

```
object
  .should.be.a('string')
  .should.deep.equal(expected) // same as .eql
  .should.equal(expected)
  .should.eql(expected)        // deep equality
  .should.exist
  .should.be.ok(val)
  .should.be.true
  .should.be.false
  .should.be.null
  .should.be.undefined
  .should.be.empty
  .should.be.arguments
  .should.be.function
  .should.be.instanceOf
  .should.be.gt(5)
  .should.be.gte(5)
  .should.be.lt(5)
  .should.be.lte(5)
  .should.include(val)
  .should.respondTo('bar')
  .should.satisfy((n) => n > 0)
  .should.have.members([2, 3, 4])
  .should.have.keys(['foo'])
  .should.have.key('foo')
  .should.have.lengthOf(3)

() => { ··· }
  .should.throw(/not a function/)
```

## Should not

```
object
  .should.not.equal('x')
```

## Should: chains

These don't do anything and can be chained.

```
.to .be .been .is .that .and .have .with .at .of .same
```

## Chai with jQuery

```
global.jQuery = ···
chai.use(require('chai-jquery'))

expect($body)
  .should.have.attr('foo')
  .should.have.prop('disabled')
  .should.have.css('background')
  .should.have.css('background-color', '#ffffff')
  .should.have.data('foo')
  .should.have.class('active')
  .should.have.id('id')
  .should.have.html('<em>hi</em>')
  .should.have.text('hello')
  .should.have.value('2013')
  .should.be.visible
  .should.be.hidden
  .should.be.checked
  .should.be.selected
  .should.be.enabled
  .should.be.disabled
  .should.be.empty
  .should.exist
  .should.contain('text')
  .should.have('.selector')
```
