export default {
  footer: state => state.app.footer,
  homeActive: state => state.app.homeActive,
  home: state => state.app.home,
  token: state => state.app.token,
  isLogin: state => !!state.app.token,
  backgroundColor: state => state.app.backgroundColor,
  userInfo: state => state.app.userInfo || {},
  popup: state => state.app.popup,
  postVistRecord: state => state.app.postVistRecord,
  proVistRecord: state => state.app.proVistRecord,
  
  cartList: state => state.app.cartList,   // 加入购物车列表
  showMoveImg: state => state.app.showMoveImg, // 显示飞入图片
  elLeft: state => state.app.elLeft,
  elTop: state => state.app.elTop,
  moveImgUrl: state => state.app.moveImgUrl,
  cartPositionT: state => state.app.cartPositionT, // 购物车位置
  cartPositionL: state => state.app.cartPositionL,
  receiveInCart: state => state.app.receiveInCart, // 是否进入购物车
  showCart: state => state.app.showCart // 是否显示购物车
}
