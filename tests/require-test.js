const requiree = require("./requiree")

QUnit.module("QUnit | module | require demo", function (hooks) {
  QUnit.test("you can rely on me", async function (assert) {
    assert.equal(requiree(), "What do you require?")
  })
})
