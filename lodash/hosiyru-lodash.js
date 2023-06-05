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
    let result = [], i = 0
    while(i < array.length) {
      if(i) result.push(array[i])
      i++
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

  },
}
