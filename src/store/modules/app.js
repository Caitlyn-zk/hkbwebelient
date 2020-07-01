import {
  INIT_POST_RECORD,
  ADD_POST_RECORD,
  INIT_PRO_RECORD,
  ADD_PRO_RECORD,
} from '../mutation-types'

import store from '@/utils/store/cookie'
import { getUserInfo } from '@/api/user'
import dialog from '@/utils/dialog'

const LOGIN_KEY = 'login_status'

const state = {
  footer: true,
  home: true,
  homeActive: false,
  token: store.get(LOGIN_KEY) || null,
  isLogin: null,
  backgroundColor: '#fff',
  userInfo: null,
  popup: false,
  postVistRecord: [],
  proVistRecord: [],
}

const mutations = {
  SHOW_FOOTER (state) {
    state.footer = true
  },
  HIDE_FOOTER (state) {
    state.footer = false
  },
  SHOW_HOME (state) {
    state.home = true
  },
  HIDE_HOME (state) {
    state.home = false
  },
  OPEN_HOME (state) {
    state.homeActive = true
  },
  CLOSE_HOME (state) {
    state.homeActive = false
  },
  // 弹框
  POPUP (state, data) {
    console.log(data)
    state.popup = data
  },
  // token, expires_time
  LOGIN (state, data) {
    let dataList = [data]
    let expires_time = null
    let token = null
    // 循环出token和时间
    dataList.forEach(item => {
      state.token = item.token
      expires_time = item.expires_time
      token = item.token
    })
    // console.log(token, expires_time)
    state.token = token
    store.set(LOGIN_KEY, token, expires_time)
  },
  LOGOUT (state) {
    state.token = undefined
    store.remove(LOGIN_KEY)
  },
  BACKGROUND_COLOR (state, color) {
    state.color = color
    document.body.style.backgroundColor = color
  },
  UPDATE_USERINFO (state, userInfo) {
    state.userInfo = userInfo
  },

  // 初始化职位访问记录
  [INIT_POST_RECORD] (state) {
    let initPost = store.get('postVisitRecord')
    if (initPost) {
      state.postVistRecord = initPost;
    }
  },

  // 加入访问记录
  [ADD_POST_RECORD] (state, {post_id,org_name, post_name, salary}) {
    console.log("ADD_POST_RECORD")
    console.log('访问')
    let visitRecord = state.postVistRecord // 购物车
    let post = {
      post_id,
      org_name,
      post_name,
      salary
    }

    let falg = true
    if (visitRecord.length) {        // 有内容
      visitRecord.forEach(item => {
        if (item.post_id === post_id) {
            falg = false
        }
      })
    }
    if (falg) {
      visitRecord.unshift(post)
    }
    state.visitRecord = visitRecord

    // console.log("ADD_POST_RECORD"+JSON.stringify(visitRecord))

    // 存入localStorage
    store.set('postVisitRecord',visitRecord);
  },
  // 初始化项目访问记录
  [INIT_PRO_RECORD] (state) {
    let initPro = store.get('proVisitRecord')
    if (initPro) {
      state.proVistRecord = initPro;
    }
  },
  // 加入访问记录
  [ADD_PRO_RECORD] (state, {pro_id,org_name, pro_name, fundRangValue,area1_name}) {
    // console.log("ADD_PRO_RECORD")
    // console.log('访问')
    let visitRecord = state.proVistRecord // 购物车
    let project = {
      pro_id,
      org_name,
      pro_name,
      fundRangValue,
      area1_name
    }
    let falg = true
    if (visitRecord.length) {        // 有内容
      visitRecord.forEach(item => {
        if (item.pro_id === pro_id) {
            falg = false
        }
      })
    }
    if (falg) {
      visitRecord.unshift(project)
    }
    state.proVistRecord = visitRecord

    // console.log("ADD_PRO_RECORD"+JSON.stringify(visitRecord))

    // console.log(state.proVistRecord)
    // 存入localStorage
    store.set('proVisitRecord',visitRecord);

  },
}
const actions = {
  USERINFO ({ state, commit }, force) {
    if (state.userInfo !== null && !force)
      return Promise.resolve(state.userInfo)
    else
      return new Promise(reslove => {
        getUserInfo().then(res => {
          commit("UPDATE_USERINFO", res.data)
          reslove(res.data)
        })
      }).catch(() => {
        dialog.error('获取信息失败!')
      })
  }
}

export default {
  state,
  mutations,
  actions
}
