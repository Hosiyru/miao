var hosiyru = {
  chunk: (array, size) => {
    let result = []
    for (let i = 0; i < array.length; i += size) {
      let h = []
      for (let j = 0; j < size; j++) {
        if (!array[i + j]) break
        h.push(array[i + j])
      }
      result.push(h)
    }
    return result
  },

  compact: (array) => {
    let result = []
    for (let k of array) {
      if (k) result.push(k)
    }
    return result
  },

  concat: (array, ...values) => {
    let result = array
    for (let item of values) {
      if (Array.isArray(item)) result.push(...item)
      else result.push(item)
    }
    return result
  },

  difference: (array, ...values) => {
    let map = new Map()
    let result = []
    let v = hosiyru.flattenDeep(values)
    for (let k of v) {
      if (!map.has(k)) map.set(k, 1)
    }
    for (let i of array) {
      if (map.has(i)) { }
      else result.push(i)
    }
    return result
  },

  fill: (array, values, start = 0, end = array.length) => {
    for (let i = start; i < end; i++) array[i] = values
    return array
  },

  drop: (array, n = 1) => array.slice(n),

  dropRight: (array, n = 1) => {
    if (array.length < n) return array = []
    return array.slice(0, array.length - n)
  },

  flatten: (arr) => arr.reduce((pre, cur) => pre.concat(cur), []),

  flattenDeep: (arr) => arr.reduce((pre, cur) => Array.isArray(cur) ? pre.concat(hosiyru.flattenDeep(cur)) : pre.concat(cur), []),

  flattenDepth: (arr, depth = 1) => arr.reduce((pre, cur) => Array.isArray(cur) && depth > 1 ? pre.concat(hosiyru.flattenDepth(cur, depth - 1)) : pre.concat(cur), []),

  parseJSON: (str) => {

    let i = 0
    return parseValue()

    function parseValue() {
      let char = str[i]
      if (char == '{') return parseObject()
      if (char == '[') return parseArray()
      if (char == '"') return parseString()
      if (char == 't') {
        let token = str.slice(i, i + 4)
        if (token == 'true') {
          i += 4
          return true
        } else throw new SyntaxError(`在${i}位置遇到错误的token`)
      }
      if (char == 'f') {
        let token = str.slice(i, i + 5)
        if (token == 'false') {
          i += 5
          return false
        } else throw new SyntaxError(`在${i}位置遇到错误的token`)
      }
      if (char == 'n') {
        let token = str.slice(i, i + 4)
        if (token == 'null') {
          i += 4
          return null
        } else throw new SyntaxError(`在${i}位置遇到错误的token`)
      }
      return parseNumber()
    }

    function parseNumber() {
      let start = i
      while (str[i] >= '0' && str[i] <= '9') i++
      return Number(str.slice(start, i))
    }
    function parseString() {
      i++
      let start = i
      while (str[i] !== '"' && i < str.length) i++
      if (str[i] !== '"') throw new SyntaxError('未结束的字符串，它的起点为' + start)
      let end = i
      i++
      return str.slice(start, end)
    }
    function parseArray() {
      let result = []
      i++
      if (str[i] == ']') {
        i++
        return result
      }
      while (i < str.length) {
        let value = parseValue()
        result.push(value)
        if (str[i] === ',') {
          i++
          continue
        }
        if (str[i] === ']') {
          i++
          break
        }
      }
      return result
    }
    function parseObject() {
      let result = {}
      i++
      skipSpace()
      if (str[i] == '}') {
        i++
        return result
      }
      while (i < str.length) {
        let name = parseString()
        skipSpace()
        i++
        skipSpace()
        let value = parseValue()
        result[name] = value
        if (str[i] === ',') {
          i++
          continue
        }
        if (str[i] === '}') {
          i++
          break
        }
      }
      return result
    }
    function skipSpace() {
      while (str[i] == ' ' || str[i] == '\n' || str[i] == '\t' || str[i] == '\r') i++
      return
    }
  },
}
