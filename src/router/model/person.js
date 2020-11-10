// 路由

const Frontnav = () => import('@/components/fontnav/fontnav.vue')
const Footer = () => import('@/components/fontfooter/fontfooter.vue')
const UserPerson = () => import('@/views/user/person/person.vue')
const UserPersonIndex = () => import('@/views/user/person/home/home.vue')
const UserPersonMyResume = () => import('@/views/user/person/resume/resume.vue')
const UserPersonResumeCenter = () => import('@/views/user/person/resume/center.vue')
const UserPersonMyCollect = () => import('@/views/user/person/resume/collect.vue')
const UserPersonMyApplyFor = () => import('@/views/user/person/resume/apply-for.vue')
const UserPersonShieldCompany = () => import('@/views/user/person/resume/shield-company.vue')
const UserPersonSalaryQuery = () => import('@/views/user/person/more/salary-query.vue')
const UserPersonSubscribe = () => import('@/views/user/person/more/subscribe.vue')
const UserPersonPrivacy = () => import('@/views/user/person/more/privacy.vue')
const UserPersonAccount = () => import('@/views/user/person/more/account.vue')
const UserPersonCollege = () => import('@/views/user/person/college/college.vue')

// 学院模块
const UserCollegeHomePage = () => import('@/views/user/person/college/home-page.vue')
const UserCollegeCollection = () => import('@/views/user/person/college/collection.vue')
export default [
/**  -------- 个人中心-----------  */
  {
    path: '/user/person',
    name: 'CmpUserResume',
    redirect: '/user/person/index',
    meta: {
      title: '环科个人中心',
      keepAlive: false,
      auth: true
    },
    components: {
      Head: Frontnav,
      body: UserPerson,
      Foot: Footer
    },
    children: [{
      path: '/user/person/index',
      name: 'CmpUserResumeIndex',
      meta: {
        title: '环科个人中心',
        keepAlive: false,
        auth: true
      },
      component: UserPersonIndex
    },  {
      path: '/user/person/my/resume-center',
      name: 'CmpUserPersonResumeCenter',
      meta: {
        title: '环科个人中心|简历中心',
        keepAlive: false,
        auth: true
      },
      component: UserPersonResumeCenter
    }, {
      path: '/user/person/my/collect',
      name: 'CmpUserPersonMyCollect',
      meta: {
        title: '环科个人中心|职位收藏',
        keepAlive: false,
        auth: true
      },
      component: UserPersonMyCollect
    }, {
      path: '/user/person/my/applyfor',
      name: 'CmpUserPersonMyApplyFor',
      meta: {
        title: '环科个人中心|职位申请',
        keepAlive: true,
        auth: true
      },
      component: UserPersonMyApplyFor
    }, {
      //a 
      path: '/user/person/more/privacy',
      name: 'CmpUserPersonPrivacy',
      meta: {
        title: '环科个人中心|个人隐私',
        keepAlive: false,
        auth: true
      },
      component: UserPersonPrivacy
    }, {
      path: '/user/person/more/salary-query',
      name: 'CmpUserPersonSalaryQuery',
      meta: {
        title: '环科个人中心|薪资查询',
        keepAlive: false,
        auth: true
      },
      component: UserPersonSalaryQuery
    }, {
      path: '/user/person/resume/shield-company',
      name: 'CmpUserPersonShieldCompany',
      meta: {
        title: '环科个人中心|屏蔽公司',
        keepAlive: true,
        auth: true
      },
      component: UserPersonShieldCompany
    }, {
      path: '/user/person/more/subscribe',
      name: 'CmpUserPersonSubscribe',
      meta: {
        title: '环科个人中心|我的订阅',
        keepAlive: true,
        auth: true
      },
      component: UserPersonSubscribe
    }, {
      path: '/user/person/more/account',
      name: 'CmpUserAccount',
      meta: {
        title: '环科个人中心|个人账户',
        keepAlive: false,
        auth: true
      },
      component: UserPersonAccount
    },
    // 我的学院
    {
      path: '/user/person/my/college',
      name: 'CmpUserCollege',
      redirect: '/user/person/my/college/home-page',
      meta: {
        title: '环科个人中心|个人主页',
        keepAlive: false,
        auth: true
      },
      component: UserPersonCollege,
      children: [{
        path: '/user/person/my/college/home-page',
        name: 'CmpUserCollegeHomePage',
        meta: {
          title: '环科个人中心|我的学院',
          keepAlive: false,
          auth: true
        },
        component: UserCollegeHomePage,
      },{
        path: '/user/person/my/college/collection',
        name: 'CmpUserCollegeCollection',
        meta: {
          title: '环科个人中心|我的收藏',
          keepAlive: false,
          auth: true
        },
        component: UserCollegeCollection,
      }]
    }]
  },
  {
    path: '/user/my/resume',
    name: 'CmpUserMyResume',
    meta: {
      title: '环科个人中心|我的简历',
      keepAlive: true,
      auth: true
    },
    components: {
      Head: Frontnav,
      body: UserPersonMyResume,
      Foot: Footer
    },
  },
]
