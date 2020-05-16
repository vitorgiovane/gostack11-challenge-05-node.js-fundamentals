const isEmpty = (obj: string | Array<any> | object) => {
  if (obj == null) return true
  if (Array.isArray(obj) || typeof (obj) === 'string') return obj.length === 0
  if (typeof (obj) === 'object') return Object.keys(obj).length === 0 && obj.constructor === Object
  return false
}

export default isEmpty
