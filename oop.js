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
    for (var item of initVals) {
      this.append(item)
    }
  }
  append(val) {
    var node = {
      val, next: null
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
      val, next: null
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
    var p = this.head
    var count = 0
    while (count < idx) {
      p = p.next
      count++
    }
    return p.val
  }
  get length () {
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
    this.length = 0
  }
  push(node) {
    if (!this.head) {
      this.head = node
      this.length++
    } else {
      node.next = this.head
      this.head = node
      this.length++
    }
  }
  pop() {
    let res = this.head || undefined
    if (this.head) {
      this.head = this.head.next
      this.length--
    }
    return res
  }
  get size() {
    return this.length
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
