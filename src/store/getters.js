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
  proVistRecord: state => state.app.proVistRecord
}
