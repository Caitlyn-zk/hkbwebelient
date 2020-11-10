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

/**
 * 
 * @param {*} arg 
 * @param {*} type 
 */
export function dateFormat(date) {
    var result;
    // var reg = new Date()

    var now =new Date().getTime()
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var dateTimeStamp = new Date(date.replace(/-/g, '/')).getTime()
    var diffValue = now - dateTimeStamp;
    if(diffValue < 0){
      return;
    }
    var monthC =diffValue/month;
    var weekC =diffValue/(7*day);
    var dayC =diffValue/day;
    var hourC =diffValue/hour;
    var minC =diffValue/minute;
    if(monthC>=1){
      if(monthC<=12)
            result="" + parseInt(monthC) + "月前";
      else{
        result="" + parseInt(monthC/12) + "年前";
      }
    }
    else if(weekC>=1){
        result="" + parseInt(weekC) + "周前";
    }
    else if(dayC>=1){
        result=""+ parseInt(dayC) +"天前";
    }
    else if(hourC>=1){
        result=""+ parseInt(hourC) +"小时前";
    }
    else if(minC>=1){
        result=""+ parseInt(minC) +"分钟前";
    }else{
    result="刚刚";
  }
  return result;
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

export default {VUE_APP_API_URL, VUE_APP_WS_URL, findObj,dateFormat}
