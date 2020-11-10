import {
  INIT_POST_RECORD,
  ADD_POST_RECORD,
  INIT_PRO_RECORD,
  ADD_PRO_RECORD,
  INIT_BUYCART,
  ADD_CART,
  ADD_ANIMATION,
  SHOW_CART,
  REDUCE_CART,
  EDIT_CART
} from '../mutation-types'
import { setStore, getStore } from '../../utils/storage'
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
  cartList: [],   // 加入购物车列表
  showMoveImg: false, // 显示飞入图片
  elLeft: 0,
  elTop: 0,
  moveImgUrl: null,
  cartPositionT: 0, // 购物车位置
  cartPositionL: 0,
  receiveInCart: false, // 是否进入购物车
  showCart: false // 是否显示购物车
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
    // console.log(data)
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
    // console.log("ADD_POST_RECORD")
    // console.log('访问')
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
  //////////////////
    // 网页初始化时从本地缓存获取购物车数据
    [INIT_BUYCART] (state) {
      let initCart = getStore('buyCart')
      if (initCart) {
        // console.log("INIT_BUYCART Data"+initCart)
        state.cartList = JSON.parse(initCart)
      }
    },
    // 加入购物车  默认加入购物车都是有效的节点 vaild
    [ADD_CART] (state, {productId, salePrice, productName, productImg, productNum = 1}) {
      let cart = state.cartList // 购物车
      let falg = true
      let goods = {
        productId,
        salePrice,
        productName,
        productImg
      }
      if (cart.length) {        // 有内容
        cart.forEach(item => {
          if (item.productId === productId) {
            if (item.productNum >= 0) {
              falg = false
              item.productNum += productNum
            }
          }
        })
      }
      if (!cart.length || falg) {
        goods.productNum = productNum
        goods.checked = '1'
        cart.push(goods)
      }
      state.cartList = cart
      // 存入localStorage
      setStore('buyCart', cart)
    },
    // 加入购物车动画
    [ADD_ANIMATION] (state, {moveShow, elLeft, elTop, img, cartPositionT, cartPositionL, receiveInCart}) {
      state.showMoveImg = moveShow
      if (elLeft) {
        state.elLeft = elLeft
        state.elTop = elTop
      }
      state.moveImgUrl = img
      state.receiveInCart = receiveInCart
      if (cartPositionT) {
        state.cartPositionT = cartPositionT
        state.cartPositionL = cartPositionL
      }
    },
    // 是否显示购物车
    [SHOW_CART] (state, {showCart}) {
      let timer = null
      state.showCart = showCart
      // clearTimeout(timer)
      // if (showCart) {
      //   timer = setTimeout(() => {
      //     state.showCart = false
      //   }, 5000)
      // }
    },
    // 移除商品
    [REDUCE_CART] (state, {productId}) {
      let cart = state.cartList
      cart.forEach((item, i) => {
        if (item.productId === productId) {
          if (item.productNum > 1) {
            item.productNum--
          } else {
            cart.splice(i, 1)
          }
        }
      })
      state.cartList = cart
      // 存入localStorage
      setStore('buyCart', state.cartList)
    },
    // 修改购物车
    [EDIT_CART] (state, {productId, productNum, checked}) {
      let cart = state.cartList
      if (productNum) {
        cart.forEach((item, i) => {
          if (item.productId === productId) {
            item.productNum = productNum
            item.checked = checked
          }
        })
      } else if (productId) {
        cart.forEach((item, i) => {
          if (item.productId === productId) {
            cart.splice(i, 1)
          }
        })
      } else {
        cart.forEach((item) => {
          item.checked = checked ? '1' : '0'
        })
      }
      state.cartList = cart
      // 存入localStorage
      setStore('buyCart', state.cartList)
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
