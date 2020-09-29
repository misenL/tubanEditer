const base = {
  // 对象深复制函数
  objClone: (obj) => {
    let newObj = JSON.stringify(obj)
    newObj = JSON.parse(newObj)
    return newObj
  },

  // 判断请求是否成功
  isSucc: res => {
    return parseInt(res.status_code / 100) === 2
  },

  // 将对象中的空字符串过滤掉
  transObjNull: obj => {
    const res = {}
    Object.keys(obj).forEach(key => {
      if (!obj[key] && obj[key] !== 0) return
      res[key] = obj[key]
    })
    return res
  },

  isExternal: path => {
    return /^(https?:|mailto:|tel:)/.test(path)
  },

  validUsername: str => {
    const validmap = ['admin', 'editor']
    return validmap.indexOf(str.trim()) >= 0
  }
}

const exportValue = {}
exportValue.install = Vue => {
  for (const key in base) {
    if (base.hasOwnProperty(key)) {
      Vue.prototype[`$${key}`] = base[key]
    }
  }
}

for (const key in base) {
  if (base.hasOwnProperty(key)) {
    exportValue[key] = base[key]
  }
}

export default exportValue

