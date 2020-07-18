const crispr = require("../crispr")

QUnit.module("QUnit | module | crispr demo", function (hooks) {
  QUnit.test("crispr", async function (assert) {
    assert.equal(crispr(), "crispr")
  })
})
