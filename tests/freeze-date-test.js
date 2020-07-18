function freezeDate() {
  return new Date("1983-06-12")
}
let originalDateNow = Date.now

QUnit.module("QUnit | module | freeze-date demo", function (hooks) {
  hooks.beforeEach(function () {
    Date.now = freezeDate
  })

  hooks.afterEach(function () {
    Date.now = originalDateNow
  })

  QUnit.test("travelled back in time to olden days", async function (assert) {
    assert.deepEqual(Date.now(), new Date("1983-06-12"))
  })
})
