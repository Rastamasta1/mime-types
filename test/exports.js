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

describe('advertised paths exist and are covered by "files"', function () {
  var pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'))
  var root = path.join(__dirname, '..')

  var advertised = []
  if (pkg.types) {
    advertised.push(pkg.types)
  }
  if (pkg.exports) {
    Object.keys(pkg.exports).forEach(function (key) {
      var value = pkg.exports[key]
      if (key === './package.json') {
        return
      }
      if (typeof value === 'string') {
        advertised.push(value)
      }
    })
  }

  advertised.forEach(function (advertisedPath) {
    var normalized = advertisedPath.replace(/^\.\//, '')

    it('"' + advertisedPath + '" should exist on disk', function () {
      assert.ok(fs.existsSync(path.join(root, normalized)), advertisedPath + ' does not exist on disk')
    })

    it('"' + advertisedPath + '" should be covered by "files"', function () {
      var covered = pkg.files.some(function (f) {
        return normalized === f || normalized.indexOf(f + '/') === 0
      })
      assert.ok(covered, advertisedPath + ' is not covered by package.json "files"')
    })
  })
})

describe('index.d.ts', function () {
  var indexSource = fs.readFileSync(path.join(__dirname, '..', 'index.js'), 'utf8')
  var typesSource = fs.readFileSync(path.join(__dirname, '..', 'index.d.ts'), 'utf8')

  var names = []
  var exportRe = /^exports\.(\w+)\s*=/gm
  var match
  while ((match = exportRe.exec(indexSource)) !== null) {
    if (match[1].charAt(0) !== '_') {
      names.push(match[1])
    }
  }

  names.forEach(function (name) {
    it('should declare "' + name + '" in index.d.ts', function () {
      var declRe = new RegExp('\\b' + name + '\\b')
      assert.ok(declRe.test(typesSource), 'index.d.ts should declare "' + name + '"')
    })
  })
})
