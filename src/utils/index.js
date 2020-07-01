export function trim (str) {
  return String.prototype.trim.call(str)
}

/**
 * 查找数组元素
 * @param {*} data 搜索的数组
 * @param {*} value 搜索的元素
 */
export function findObj (data, value) {
  var obj = data.find(function (obj) {
    // if (obj.value == null) {
    //   return null
    // }
    return obj.value === value
  })
  return obj === undefined ? '' : obj
}

export function isType (arg, type) {
  return Object.prototype.toString.call(arg) === '[object ' + type + ']'
}

export function isWeixin () {
  return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
}

export function parseQuery () {
  const res = {}

  const query = (location.href.split('?')[1] || '')
    .trim()
    .replace(/^(\?|#|&)/, '')

  if (!query) {
    return res
  }

  query.split('&').forEach(param => {
    const parts = param.replace(/\+/g, ' ').split('=')
    const key = decodeURIComponent(parts.shift())
    const val = parts.length > 0 ? decodeURIComponent(parts.join('=')) : null

    if (res[key] === undefined) {
      res[key] = val
    } else if (Array.isArray(res[key])) {
      res[key].push(val)
    } else {
      res[key] = [res[key], val]
    }
  })

  return res
}

const VUE_APP_API_URL = process.env.VUE_APP_API_URL || `${location.origin}/api`
const VUE_APP_WS_URL =
  process.env.VUE_APP_WS_URL || `ws:${location.hostname}:20003`

export default {VUE_APP_API_URL, VUE_APP_WS_URL, findObj}
