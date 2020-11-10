// 路由
import Vue from 'vue'
import Router from 'vue-router'
import $store from '@/store'
import {toLogin,toOrgLogin} from '@/libs/login'

const Frontnav = () => import('@/components/fontnav/fontnav.vue')
const Footer = () => import('@/components/fontfooter/fontfooter.vue')
const FrontIndex = () => import('@/views/front/index.vue')
const AccountLogin = () => import('@/views/account/user/person-login.vue')
const AccountRegister = () => import('@/views/account/user/person-register.vue')
const AccountOrgLogin = () => import('@/views/account/org/org-login.vue')
const AccountOrgRegister = () => import('@/views/account/org/org-register.vue')
const UserOrgIndex = () => import('@/views/user/org/org-index.vue')
const UserInfoCenter = () => import('@/views/user/info/center.vue')
const Orgnav = () => import('@/components/orgbacknav/orgbacknav.vue')
// 关于我们
const AboutUs = () => import('@/views/front/aboutus/aboutus.vue')
const AD = () => import('@/views/front/ad/ad.vue')

// 引入模块
import College from './model/college'
import Project from './model/project'
import Rectuit from './model/recruit'
import Store from './model/store'
import Account from './model/account'
// import iView from 'iview'

// 个人
import Person from './model/person'
Vue.use(Router)
const router = new Router({
    mode: 'hash',
    // mode: 'history',
    routes: [
        /**  --------------------------------- front前端页面 ---------------------------------  */
        {
            path: '/',
            name: 'CmpFrontindex',
            meta: {
                title: '环科宝',
                keepAlive:true,
                auth: false
            },
            components: {
                Head: Frontnav,
                body: FrontIndex,
                Foot: Footer
            }
        },
        ...College,
        ...Project,
        ...Rectuit,
        ...Store,
        ...Person,
        ...Account,
        /** ---------------------------- 企业管理首页 --------------------------**/
        {
            path: '/user/org/index',
            name: 'CmpOrgIndex',
            meta: {
                title: '企业项目管理',
                keepAlive: false,
                auth: true,
                isOptOrg: true
            },
            components: {
                Head: Orgnav,
                body: UserOrgIndex
            }
        },
        /** ---------------------------- 个人登录账户 --------------------------**/
        {
            path: '/account/login',
            name: 'AccountLogin',
            meta: {
                title: '环科宝个人登录',
                keepAlive: false,
                auth: false
            },
            components: {
                body: AccountLogin
            }
        },
        {
            path: '/account/register',
            name: 'AccountRegister',
            meta: {
                title: '环科宝注册',
                keepAlive: false,
                auth: false
            },
            components: {
                body: AccountRegister
            }
        },
        /** ---------------------------- 企业登录账户 --------------------------**/
        {
            path: '/account/org/login',
            name: 'AccountOrgLogin',
            meta: {
                title: '环科宝企业登录',
                keepAlive: false,
                auth: false
            },
            components: {
                body: AccountOrgLogin
            }
        },
        {
            path: '/account/org/register',
            name: 'AccountOrgRegister',
            meta: {
                title: '环科宝注册',
                keepAlive: false,
                auth: false
            },
            components: {
                body: AccountOrgRegister
            }
        },
        /** ------------------------------ 消息中心 ------------------------------- */
        {
            path: '/account/infocenter',
            name: 'UserInfoCenter',
            meta: {
                title: '消息中心',
                keepAlive: false,
                auth: false
            },
            components: {
                Head: Frontnav,
                body: UserInfoCenter,
                Foot: Footer
            }
        }, {
            path: '/aboutus',
            name: 'Aboutus',
            meta: {
                title: '关于我们',
                keepAlive: false,
                auth: false
            },
            components: {
                Head: Frontnav,
                body: AboutUs,
                Foot: Footer
            }
        }, {
            path: '/ad',
            name: 'AD',
            meta: {
                title: '广告',
                keepAlive: false,
                auth: false
            },
            components: {
                Head: Frontnav,
                body: AD,
                Foot: Footer
            }
        }
    ]
})

const { back, replace } = router

router.back = function() {
    this.isBack = true
    back.call(router)
}
router.replace = function(...args) {
    this.isReplace = true
    replace.call(router, ...args)
}

router.beforeEach((to, form, next) => {
    const { title, backgroundColor, footer, home, auth,isOptOrg } = to.meta
    
    if(to.path!='/account/login'  && to.path!='/account/register' && to.path.indexOf("/account/user") == -1 ){
        sessionStorage.setItem('referrer',to.path)
    }
    if (auth === true && !$store.state.app.token) {
        if(isOptOrg){
            if (form.name === 'AccountOrgLogin') return
            return toOrgLogin(true, to.fullPath)
        }else{
            if (form.name === 'AccountLogin') return
            return toLogin(true, to.fullPath)
        }
        
    }
    document.title = title || process.env.VUE_APP_NAME || ''
        // 判断是否显示底部导航
    footer === true ? $store.commit('SHOW_FOOTER') : $store.commit('HIDE_FOOTER')

    // 控制悬浮按钮是否显示
    home === false ? $store.commit('HIDE_HOME') : $store.commit('SHOW_HOME')

    $store.commit('BACKGROUND_COLOR', backgroundColor || '#F5F5F5')

    if (auth) {
        // console.log("ROUTER PATH  IS " + to.fullPath + " " + form.fullPath);
        // console.log("ROUTER USER INFO IS" + to.fullPath + " "+JSON.stringify($store.state.app.userInfo));

        $store.dispatch('USERINFO').then(() => {
            // console.log("USERINFO   ");
            next();
            // if(isOptOrg){
            //     if(10 == $store.state.app.userInfo.org_reg_state && to.name !=='PATH_ACCOUNT_ORG_REGISTER_STEP_1'){ 
            //         next({ path: "/account/org/register/personInfo" , query: { active: 0 } })
            //     }else if(20 == $store.state.app.userInfo.org_reg_state  && to.name !=='PATH_ACCOUNT_ORG_REGISTER_STEP_2'){
            //         //完善机构信息
            //         next({ path: "/account/org/register/companyinfo" , query: { active: 1 } })
            //     }else if(30 == $store.state.app.userInfo.org_reg_state  && to.name !=='PATH_ACCOUNT_ORG_REGISTER_STEP_3'){
            //         //完善机构需求
            //         next({ path: "/account/org/register/completeinfo", query: { active: 2 } })
            //     }else{
            //         next()
            //     }
            // }else{
            //     if(10 == $store.state.app.userInfo.person_reg_state && to.name !=='PATH_ACCOUNT_USER_REGISTER_SETP_1'  && form.name !=='PATH_ACCOUNT_USER_REGISTER_SETP_1'){
            //         next({ path: "/account/user/register/basicinfo" })
            //     }else if(20 == $store.state.app.userInfo.person_reg_state && to.name !=='PATH_ACCOUNT_USER_REGISTER_SETP_2'  && form.name !=='PATH_ACCOUNT_USER_REGISTER_SETP_2'){
            //         next({ path: "/account/user/register/edu" })
            //     }else if(30 == $store.state.app.userInfo.person_reg_state && to.name !=='PATH_ACCOUNT_USER_REGISTER_SETP_3'   && form.name !=='PATH_ACCOUNT_USER_REGISTER_SETP_3'){
            //         next({ path: "/account/user/register/jw" })
            //     }else{
            //         next()
            //     }
            // }
        })
    } else {
        next()
    }
   
})

router.afterEach(to => {
    // let meta = { ...to.meta }
    // if (meta.title) {
    //   document.title = appConfig.appTitle + '-' + to.meta.title;
    // }
    // iView.LoadingBar.finish()
    
    window.scrollTo(0, 0)
})
// 解决NavigationDuplicated报错
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
return routerPush.call(this, location).catch(error=> error)
}

export default router
