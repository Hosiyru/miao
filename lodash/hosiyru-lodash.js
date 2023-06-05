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
      if(k) result.push(k)
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

  difference: (array, values) => {
    let map = new Map()
    let result = []
    for (let k of values) {
      if (!map.has(k)) map.set(k, 1)
    }
    for (let i of array) {
      if (map.has(i)) {}
      else result.push(i)
    }
    return result
  },
}
