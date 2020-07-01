// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import '../theme/index.css'
import router from './router'
import store from './store'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import './assets/font/iconfont.css'
import './css/public.less'
import './css/common.less'
import VueCropper from 'vue-cropper'
// 懒加载
import VueLazyload from 'vue-lazyload'
// import BMap from 'vue-baidu-map'

Vue.use(VueCropper)
Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.use(VueLazyload)

// 自定义懒加载
// Vue.use(VueLazyload, {
//     preLoad: 1.3,
//     error: 'dist/error.png',
//     loading: 'dist/loading.gif',
//     attempt: 1
// })

// Vue.http.interceptors.push((request, next) => {
//     NProgress.start();
  
//     next((response)=>{
//       NProgress.done();
//     })
// })


Vue.config.productionTip = false
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})


