import axios from 'axios'
import $store from '@/store'
import {toLogin,toOrgLogin} from '@/libs/login'
import router from '../router'
// import { VUE_APP_API_URL } from "@utils/index";

const instance = axios.create({
  // baseURL: 'http://127.0.0.1:8000/',
  baseURL: 'http://www.test.com/',
  timeout: 5000
})

const defaultOpt = { login: true }

function baseRequest (options) {
  // console.log($store)
  // console.log('这里是是详情信息')
  // console.log(options)
  const token = $store.state.app.token
  // console.log(token)
  const headers = options.headers || {}
  headers['Authorization'] =  token
  // headers["Authori-zation"] = "Bearer" + token
  options.headers = headers
  // 判断未登录
  if (options.login && !token) {
    toLogin()
    return Promise.reject({ msg: '未登录', toLogin: true })
  }
  // console.log(options)
  return instance(options).then(res => {
    const data = res.data || {}
    if (res.status !== 200)
      return Promise.reject({ msg: "请求失败", res, data })

    if ([410000, 410001, 410002].indexOf(data.status) !== -1) {
      // 个人未登录
      toLogin()
      return Promise.reject({ msg: res.data.msg, res, data, toLogin: true })
    } else if ([420000, 420001, 420002].indexOf(data.status) !== -1) {
      // 企业未登录
      toOrgLogin()
      return Promise.reject({ msg: res.data.msg, res, data, toLogin: true })
    } else if ([600010, 600020, 600030,600040].indexOf(data.status) !== -1) {
      if(600010 == data.status){
        // 完善个人基本信息
        router.push({path: '/account/user/register/basicinfo'})
      }else if(600020 == data.status){
        // 完善个人教育信息
        router.push({path: '/account/user/register/edu'})
      }else if(600030 == data.status){
        // 完善个人求职信息
        router.push({path: '/account/user/register/jw'})

      }else if(600040 == data.status){//保留
      }
      return Promise.resolve(data, res)
    }else if ([700010, 700020, 700030,700040].indexOf(data.status) !== -1) {
      if(700010 == data.status){
        //完善机构个人信息
        router.push({path: '/account/org/register/personInfo',query: { active: 0}})
      }else if(700020 == data.status){
        //完善机构信息
        router.push({path: '/account/org/register/companyinfo',query: { active: 1}})
      }else if(700030 == data.status){
        //完善机构需求
        router.push({path: '/account/org/register/completeinfo',query: { active: 2}})
      }else if(700040 == data.status){//保留
        
      }
      return Promise.resolve(data, res)
    }else if (data.status === 200) {
      return Promise.resolve(data, res)
    } else {
      return Promise.reject({ msg: res.data.msg, res, data })
    }
  })
}

/**
 * http 请求基础类
 * 参考文档 https://www.kancloud.cn/yunye/axios/234845
 *
 */
const request = ["post", "put", "patch"].reduce((request, method) => {
  /**
   *
   * @param url string 接口地址
   * @param data object get参数
   * @param options object axios 配置项
   * @returns {AxiosPromise}
   */
  request[method] = (url, data = {}, options = {}) => {
    return baseRequest(
      Object.assign({ url, data, method }, defaultOpt, options)
    );
  };
  return request;
}, {});

["get", "delete", "head"].forEach(method => {
  /**
   *
   * @param url string 接口地址
   * @param params object get参数
   * @param options object axios 配置项
   * @returns {AxiosPromise}
   */
  request[method] = (url, params = {}, options = {}) => {
    return baseRequest(
      Object.assign({ url, params, method }, defaultOpt, options)
    );
  };
});

export default request

