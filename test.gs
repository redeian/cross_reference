const Expect = (description, got, want) =>
  Logger.log(
    areDeepEqual(got, want)
      ? '✅ ' + description
      : '❌ ' + description + '.\nExpected\n' + JSON.stringify(want) + '\n Got\n' + JSON.stringify(got)
  )

const isObject = (thing) => Object.prototype.toString.call(thing) === '[object Object]'
const isArray = (thing) => Array.isArray(thing)
const isIterable = (thing) => isObject(thing) || isArray(thing) // Symbol.iterator approach does not work in gs

const areSameLength = (a, b) =>
  isObject(a)
    ? isObject(b) && Object.keys(a).length === Object.keys(b).length
    : a.length === b.length

const areDeepEqual = (a, b) => {
  if (isIterable(a)) {
    if (!isIterable(b) || !areSameLength(a, b)) return false    
    for (const key in a) {
      if (!areDeepEqual(a[key], b[key])) return false
    }
  } else {
    if (a !== b) return false
  }
  return true
}


function testSuite(name, suite = []) {
  Logger.log('SUITE: ' + name)
  Logger.log('======')

  suite.forEach((s) => {
    Logger.log(s.name)
    Logger.log('------')
    s()
    Logger.log('')
  })
}