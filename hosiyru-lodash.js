var hosiyru = {
  chunk: (arr, size) => {
    let result = []
    for (let i = 0; i < arr.length; i += size) {
      let h = []
      for (let j = 0; j < size; j++) {
        if (!arr[i + j]) break
        h.push(arr[j])
      }
      result.push(h)
    }
  },
  
  compact: (arr) => {
    let result = [], i = 0
    while(i < arr.length) {
      if (!(arr[i] == false || arr[i] == null || arr[i] == 0 || arr[i] == '' || arr[i] == undefined || arr[i] == NaN)) result.push(arr[i])
      i++
    }
    return result
  }
}
