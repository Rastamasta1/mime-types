var assert = require('assert')
var fs = require('fs')
var path = require('path')

describe('package.json exports', function () {
  var pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'))

  it('should have a "." entry of "./index.js"', function () {
    assert.strictEqual(pkg.exports['.'], './index.js')
  })

  it('should have a "./package.json" entry of "./package.json"', function () {
    assert.strictEqual(pkg.exports['./package.json'], './package.json')
  })
})
