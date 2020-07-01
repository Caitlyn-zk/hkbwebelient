// 路由
// import Frontnav from '@/components/fontnav/fontnav.vue'
// import Footer from '@/components/fontfooter/fontfooter.vue'
// import UserPerson from '@/views/user/person/person.vue'
// import UserPersonIndex from '@/views/user/person/home/home.vue'
// import UserPersonMyResume from '@/views/user/person/resume/resume.vue'
// import UserPersonResumeCenter from '@/views/user/person/resume/resume-center.vue'
// import UserPersonMyCollect from '@/views/user/person/resume/collect.vue'
// import UserPersonMyApplyFor from '@/views/user/person/resume/apply-for.vue'
// import UserPersonShieldCompany from '@/views/user/person/resume/shield-company.vue'
// import UserPersonSalaryQuery from '@/views/user/person/more/salary-query.vue'
// import UserPersonSubscribe from '@/views/user/person/more/subscribe.vue'
// import UserPersonPrivacy from '@/views/user/person/more/privacy.vue'
// import UserPersonAccount from '@/views/user/person/more/account.vue'
// import UserPersonCollege from '@/views/user/person/college/college.vue'
// 学院模块
// import UserPersonCollegeDynamic from '@/views/user/person/college/dynamic.vue'
// import UserPersonCollegeAnswer from '@/views/user/person/college/answer.vue'
// import UserPersonCollegeAskQuestion from '@/views/user/person/college/ask-question.vue'
// import UserPersonCollegeArticle from '@/views/user/person/college/article.vue'
// import UserPersonCollegeSpecialColumn from '@/views/user/person/college/special-column.vue'
// import UserPersonCollegeCollection from '@/views/user/person/college/collection.vue'
// import UserPersonCollegeFollow from '@/views/user/person/college/follow.vue'

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
const UserPersonCollegeDynamic = () => import('@/views/user/person/college/dynamic.vue')
const UserPersonCollegeAnswer = () => import('@/views/user/person/college/answer.vue')
const UserPersonCollegeAskQuestion = () => import('@/views/user/person/college/ask-question.vue')
const UserPersonCollegeArticle = () => import('@/views/user/person/college/article.vue')
const UserPersonCollegeSpecialColumn = () => import('@/views/user/person/college/special-column.vue')
const UserPersonCollegeCollection = () => import('@/views/user/person/college/collection.vue')
const UserPersonCollegeFollow = () => import('@/views/user/person/college/follow.vue')
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
      redirect: '/user/person/my/college/dynamic',
      meta: {
        title: '环科个人中心|个人账户',
        keepAlive: false,
        auth: true
      },
      component: UserPersonCollege,
      children: [{
        path: '/user/person/my/college/dynamic',
        name: 'CmpUserCollegeDynamic',
        meta: {
          title: '环科个人中心|我的学院',
          keepAlive: true,
          auth: true
        },
        component: UserPersonCollegeDynamic,
      }, {
        path: '/user/person/my/college/answer',
        name: 'CmpUserPersonCollegeAnswer',
        meta: {
          title: '环科个人中心|我的学院',
          keepAlive: true,
          auth: true
        },
        component: UserPersonCollegeAnswer,
      }, {
        path: '/user/person/my/college/askquestion',
        name: 'CmpUserPersonCollegeAskQuestion',
        meta: {
          title: '环科个人中心|我的学院',
          keepAlive: true,
          auth: true
        },
        component: UserPersonCollegeAskQuestion,
      }, {
        path: '/user/person/my/college/article',
        name: 'CmpUserPersonCollegeArticle',
        meta: {
          title: '环科个人中心|我的学院',
          keepAlive: true,
          auth: true
        },
        component: UserPersonCollegeArticle,
      }, {
        path: '/user/person/my/college/specialcolumn',
        name: 'CmpUserPersonCollegeSpecialColumn',
        meta: {
          title: '环科个人中心|我的学院',
          keepAlive: true,
          auth: true
        },
        component: UserPersonCollegeSpecialColumn,
      }, {
        path: '/user/person/my/college/collection',
        name: 'CmpUserPersonCollegeCollection',
        meta: {
          title: '环科个人中心|我的学院',
          keepAlive: true,
          auth: true
        },
        component: UserPersonCollegeCollection,
      }, {
        path: '/user/person/my/college/follow',
        name: 'CmpUserPersonCollegeFollow',
        meta: {
          title: '环科个人中心|我的学院',
          keepAlive: true,
          auth: true
        },
        component: UserPersonCollegeFollow,
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
