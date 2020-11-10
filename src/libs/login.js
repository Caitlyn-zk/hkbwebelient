import router from '@/router'
import store from '@/store'
import cookie from '@/utils/store/cookie'
import dayjs from 'dayjs'
const BACK_URL = 'login_back_url'

export function toLogin(push, backUrl) {
    store.commit('LOGOUT')
    const { fullPath, name } = router.currentRoute
    cookie.set('login_back_url', backUrl || fullPath)
    if (name !== 'AccountLogin') {
        push
            ? router.push({ path: '/account/login' }) :
            router.push({ path: '/account/login' })
    }
}

// 处理个人登录成功页面
export function handlePersonLoginSuccess(res) {
    store.commit('LOGIN', {token: res.data.token, expires_time: dayjs(res.data.expires_time)})
    // 完善信息判断,小于100表示为注册完成
    // console.log(res.data.token)
    if (res.data.person_reg_state < 100) {
        if (res.data.person_reg_state === 10) {
            router.push({ path: '/account/user/register/basicinfo' })
        } else if (res.data.person_reg_state === 20) {
            router.push({ path: '/account/user/register/edu' })
        } else if (res.data.person_reg_state === 30) {
            router.push({ path: '/account/user/register/jw' })
        }
    } else {
        var referrer = sessionStorage.getItem('referrer');
        if(referrer){
            cookie.remove(BACK_URL)
            router.push({ path: referrer })
        }else {
           const backUrl = cookie.get(BACK_URL) || '/user/person/index'
           cookie.remove(BACK_URL)
           router.push({ path: backUrl })
        }
    }
}
// 企业登录处理
export function toOrgLogin(push, backUrl) {
    store.commit('LOGOUT')
    const { fullPath, name } = router.currentRoute
    cookie.set('login_back_url', backUrl || fullPath)
    if (name !== 'AccountOrgLogin') {
        push
            ? router.push({ path: '/account/org/login' }) :
            router.push({ path: '/account/org/login' })
    }
}

// 处理企业登录成功页面
export function handleOrgLoginSuccess(res) {
    store.commit('LOGIN', {token: res.data.token, expires_time: dayjs(res.data.expires_time)})
    // 完善信息判断,小于100表示为注册完成
    // console.log(res.data.token)
    if (res.data.org_reg_state < 100) {
        if (res.data.org_reg_state === 10) {
            router.push({ path: '/account/org/register/personInfo', query: { active: 0 } })
        } else if (res.data.org_reg_state === 20) {
            router.push({ path: '/account/org/register/companyinfo', query: { active: 1 } })
        } else if (res.data.org_reg_state === 30) {
            router.push({ path: '/account/org/register/completeinfo', query: { active: 2 } })

        //     router.push({ name: 'PATH_ACCOUNT_ORG_REGISTER_STEP_1', query: { active: 0 } })
        // } else if (res.data.org_reg_state === 20) {
        //     router.push({ name: 'PATH_ACCOUNT_ORG_REGISTER_STEP_2', query: { active: 1 } })
        // } else if (res.data.org_reg_state === 30) {
        //     router.push({ name: '/PATH_ACCOUNT_ORG_REGISTER_STEP_3', query: { active: 2 } })

        }
    } else {
        const backUrl = cookie.get(BACK_URL) || '/user/org/index'
        cookie.remove(BACK_URL)
        router.push({ path: backUrl })
    }
}

export default { handlePersonLoginSuccess, toLogin, handleOrgLoginSuccess }