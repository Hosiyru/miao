class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  plus(vector) {
    var x = this.x + vector.x
    var y = this.y + vector.y
    return new Vector(x, y)
  }
  minus(vector) {
    var x = this.x - vector.x
    var y = this.y - vector.y
    return new Vector(x, y)
  }
  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }
}

class Complex {
  constructor(real, imag) {
    this.real = real
    this.imag = imag
  }
  plus(c) {
    var real = this.real + c.real
    var imag = this.imag + c.imag
    return new Complex(real, imag)
  }
  minus(c) {
    var real = this.real - c.real
    var imag = this.imag - c.imag
    return new Complex(real, imag)
  }
  mul(c) {
    var real = this.real * c.real - this.imag * c.imag
    var imag = this.real * c.imag + this.imag * c.real
    return new Complex(real, imag)
  }
  div(c) {
    var helper = new Complex(c.real, -c.imag)
    var up = this.mul(helper)
    var down = c.mul(helper)
    var real = up.real / down.real
    var imag = up.imag / down.real
    return new Complex(real, imag)
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
  }
  append(val) {
    var node = {
      val: val,
      next: null
    }
    if (this.head == null) {
      this.head = this.tail = node
      return
    } else {
      this.tail.next = node
      this.tail = node
      return
    }
  }
  prepend(val) {
    var node = {
      val: val,
      next: null
    }
    if (this.head == null) {
      this.head = this.tail = node
      return
    } else {
      node.next = this.head
      this.head = node
      return
    }
  }
  at(idx) {
    if (this.head === this.tail === null) return null
    var p = this.head
    var count = 0
    while (count < idx) {
      p = p.next
      count++
    }
    return p.val
  }
  get size() {
    var p = this.head
    var l = 0
    while (p) {
      l++
      p = p.next
    }
    return l
  }
}

class Queue {
  constructor() {
    this.head = null
    this.tail = null
    this.count = 0
  }
  add(val) {
    let node = {
      val: val,
      next: null
    }
    if (!this.head) {
      this.head = this.tail = node
    }
    this.tail.next = node
    this.tail = node
    this.count++
  }
  pop() {
    if (!this.head) {
      return
    }
    this.count--
    if (this.head.next === this.tail) {
      let p = this.head.val
      this.head = this.tail = null
      return p
    }

    let p = this.head.val
    this.head = this.head.next
    return p
  }
  get size() {
    return this.count
  }
}

class Stack {
  constructor() {
    this.head = null
    this.count = 0
  }

  push(val) {
    let node = {
      val: val,
      next: null
    }
    if (!this.head) {
      this.head = node
    } else {
      node.next = this.head
      this.head = node
    }
    this.count++
  }

  pop() {
    if (!this.head) return undefined

    this.count--
    let p = this.head.val
    this.head = this.head.next
    return p
  }

  get size() {
    return this.count
  }
}

class MyMap {
  constructor() {
    this._capacity = 16
    this._lists = new Array(this._capacity).fill(null)
    this._size = 0
    this._maxLoadFactor = 0.75
  }

  hashkey(key) {
    const seed = 131
    let hash = 0
    for (let char of key) {
      let code = char.charCodeAt(0)
      hash = (hash * seed + code) >>> 0
    }
    return hash % this._capacity
  }

  set(key, val) {
    const index = this.hashkey(key)
    let list = this._lists[index]
    let p = list
    while (p) {
      if (p.key === key) {
        p.val = val
        return this
      }
      p = p.next
    }
    let node = {
      key: key,
      val: val,
      next: null
    }
    node.next = list
    this._lists[index] = node
    this._size++
    if (this._size / this._capacity > this._maxLoadFactor) {
      this._expand()
    }
    return this
  }

  get(key) {
    const index = this.hashkey(key)
    let p = this._lists[index]
    while (p) {
      if (p.key === key) {
        return p.val
      }
      p = p.next
    }
  }

  has(key) {
    const index = this.hashkey(key)
    let p = this._lists[index]
    while (p) {
      if (p.key === key) {
        return true
      }
      p = p.next
    }
    return false
  }

  delete(key) {
    const index = this.hashkey(key)
    let dummy = {
      key: '',
      cal: 0,
      next: this._lists[index]
    }
    let p = dummy
    while (p.next) {
      if (p.next.key === key) {
        p.next = p.next.next
        this._lists[index] = dummy.next
        this._size--
        if (this._size / this._capacity < this._maxLoadFactor / 4) {
          this._shrink()
        }
        return true
      }
      p = p.next
    }
    return false
  }

  get size() {
    return this._size
  }

  _move(targetCapacity) {
    const oldLists = this._lists
    this._capacity = targetCapacity
    this._lists = new Array(this._capacity).fill(null)
    this.size = 0
    for (let list of oldLists) {
      let p = list
      while (p) {
        this.set(p.key, p.val)
        p = p.next
      }
    }
  }

  _expand() {
    this._move(this._capacity * 2)
  }

  _shrink() {
    if (this._capacity === 16) {
      return
    }
    this._move(this._capacity / 2)
  }

  forEach(action) {
    outerloop: for (let list of this._lists) {
      while (list) {
        if (action(list.key, list.val) === false) {
          break outerloop
        }
        list = list.next
      }
    }
  }
}

class MySet {
  constructor() {
    this.MyMap = new MyMap()
  }

  add(key, val) {
    return this.MyMap.set(key, val)
  }

  get(key) {
    return this.MyMap.get(key)
  }

  has(key) {
    return this.MyMap.has(key)
  }

  delete(val) {
    return this.MyMap.delete(val)
  }

  get size() {
    return this.MyMap.size
  }
}

class PriorityQueue {
  constructor(initials = [], predicate = it => it) {
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function, got: ' + predicate)
    }
    this._elements = []
    this._predicate = predicate
    for (var val of initials) {
      this.push(val)
    }
  }
  heapUp(pos) {
    if (pos == 0) {
      return
    }
    var predicate = this._predicate
    var parentPos = (pos - 1) >> 1
    if (predicate(this._elements[pos]) > predicate(this._elements[parentPos])) {
      swap(this._elements, pos, parentPos)
      this.heapUp(parentPos)
    }

  }
  heapDown(pos) {
    var leftPos = 2 * pos + 1
    var rightPos = 2 * pos + 2
    var maxIndex = pos
    var predicate = this._predicate
    if (leftPos < this._elements.length && predicate(this._elements[leftPos]) > predicate(this._elements[maxIndex])) {
      maxIndex = leftPos
    }
    if (rightPos < this._elements.length && predicate(this._elements[rightPos]) > predicate(this._elements[maxIndex])) {
      maxIndex = rightPos
    }
    if (maxIndex != pos) {
      swap(this._elements, maxIndex, pos)
      this.heapDown(maxIndex)
    }
  }
  pop() {
    if (this._elements.length == 0) {
      return undefined
    }
    if (this._elements.length == 1) {
      return this._elements.pop()
    }

    var last = this._elements.pop()
    var result = this._elements[0]
    this._elements[0] = last
    this.heapDown(0)
    return result
  }
  push(val) {
    this._elements.push(val)
    this.heapUp(this._elements.length - 1)
    return this
  }
  peek() {
    return this._elements[0]
  }
  get size() {
    return this._elements.length
  }
}
function heapSort(array) {
  var start = (array.length - 1) >> 1
  for (var i = start; i >= 0; i--) {
    heapDown(array, i)
  }

  for (var i = array.length - 1; i > 0; i--) {
    swap(array, i, 0)
    heapDown(array, 0, i)
  }
  return array
}
function heapDown(heap, pos, stop = heap.length) {
  var leftPos = 2 * pos + 1
  var rightPos = 2 * pos + 2
  var maxIndex = pos
  if (leftPos < stop && heap[leftPos] > heap[maxIndex]) {
    maxIndex = leftPos
  }
  if (rightPos < stop && heap[rightPos] > heap[maxIndex]) {
    maxIndex = rightPos
  }
  if (maxIndex != pos) {
    swap(heap, maxIndex, pos)
    heapDown(heap, maxIndex, stop)
  }
}
function swap(array, i, j) {
  var t = array[i]
  array[i] = array[j]
  array[j] = t
}

// String.prototype.mymatch
String.prototype.mymatch = function (re) {
  if (typeof re == "string") re = new RegExp(re)
  var str = this
  var result = []
  while (match = re.exec(str)) {
    if (!re.global) return match
    result.push(match[0])
  }
  return result
}
String.prototype.myreplace = function (re, replaceStr) {
  if (typeof re == "string") re = new RegExp(re)
  if (re.global) return this.myreplaceAll(re, replaceStr)
  if (typeof replaceStr == "string") {
    let s = replaceStr
    replaceStr = e => s
  }
  let match
  if (match = re.exec(this)) {
    let end = match.index + match[0].length
    let start = match.index
    return this.slice(0, start) + replaceStr(this.slice(start, end)) + this.slice(end)
  } else return this.toString()
}
String.prototype.myreplaceAll = function (re, replaceStr) {
  if (typeof re == "string") re = new RegExp(re, "g")
  if (!re.global) re = new RegExp(re.source, "g")
  if (typeof replaceStr == "string") {
    var s = replaceStr
    replaceStr = e => s.replace(/\$(\d)/g, (m, index) => e[index])
  }
  let match
  let last = 0
  let str = ""
  while (match = re.exec(this)) {
    str += this.slice(last, match.index)
    last = re.lastIndex
    arr = match.filter(e => e)
    if (match.length > 1) {
      for (let index = 1; index < arr.length; index++) str += replaceStr(match, arr[index])
    } else str += replaceStr(match)
  }
  str += this.slice(last)
  return str
}
String.prototype.mysearch = function (re) {
  if (typeof re == "string") re = new RegExp(re)
  let match
  if (match = re.exec(str)) return match.index
  else return -1
}
RegExp.prototype.mytest = function (re) {
  if (!re) {
    return -1
  }
  if (typeof re == "string") re = new RegExp(re)
  let string = this
  let match = re.exec(string)
  return match !== null
}
String.prototype.mysplit = function (re) {
  if (typeof re === 'string') {
    re = new RegExp(re, 'g')
  }
  if (!re.global) {
    re = new RegExp(re.source, 'g' + re.flags)
  }
  re.lastIndex = 0
  let result = []
  let match
  let lastLastIndex = 0
  while ((match = re.exec(this))) {
    result.push(this.slice(lastLastIndex, match.index), ...match.slice(1))
    lastLastIndex = re.lastIndex
  }
  result.push(this.slice(lastLastIndex))
  return result
}
