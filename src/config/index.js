export const __config = {
  production: {
    // 网站根目录
    baseUrl: 'http://www.test.com/',
    // 网站首页
    webIndex: 'http://www.test.com/',
    // 请求路径
    serverUrl: 'http://www.test.com/',
    // 图片根路径
    imgUrl: 'http://www.test.com/'
  },
  dev: {
    // 网站根目录
    baseUrl: 'http://dev.65ph.com',
    // 网站首页
    webIndex: 'http://dev.65ph.com',
    // 请求路径
    serverUrl: 'http://dev.65ph.com',
    // 图片根路径
    imgUrl: 'http://dev.65ph.com'
  }
}

let __mode = process.env.NODE_ENV === 'production' ? __config.production : __config.dev

export const urlConfig = Object.assign(__mode, {
  // 文件下载
  fileDownload: 'bs/downloadFile',
  // 登录
  login: 'sys/user/ajaxLogin',
  // 登出
  loginOut: 'sys/user/loginOut',
  // 数据字典
  dataList: 'sys/dictDatas/',
  // 文件上传
  fileUpload: 'problem/uploadProfiles'
})

export const appConfig = {
  appTitle: '环科宝',
  pageConfig: {
    page: 1,
    pageSize: 10,
    maxSize: 5,
    total: 0,
    // 可选的每页数据数目
    pageSelect: [10, 15, 20]
  },
  // 接收上传的文档类型
  acceptDocFiles: '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  HOME_PAGE_NAME: 'home',
  LOGIN_PAGE_NAME: 'login',
  REGISTER_PAGE_NAME: 'register',
  NOFOUND_PAGE_NAME: 'error_404',
  ERROR_PAGE_NAME: 'error_401',
  // 没有token就能访问的页面
  NO_NEED_TOKEN_PAGES: ['login', 'register', 'error_404', 'error_401'],
  // 没有在权限里面配置，但必须要有token才能访问的页面
  NO_NEED_PERMISSION_PAGES: ['home', 'jd-person-detail', 'gl-person-detail']
}
