
const Frontnav = () => import('@/components/fontnav/fontnav.vue')
const Footer = () => import('@/components/fontfooter/fontfooter.vue')
const FrontCollege = () => import('@/views/front/college/college.vue')
const FrontRecommend = () => import('@/views/front/college/home/recommend.vue')
const FrontCollegeFollow = () => import('@/views/front/college/home/follow.vue')
const FrontCollegeHotlist = () => import('@/views/front/college/home/hot-list.vue')
const FrontCollegeMyDrafts = () => import('@/views/front/college/home/drafts.vue')
const FrontCollegeWriteAnArticle = () => import('@/views/front/college/home/write-article.vue')
// 搜索
const FrontCollegeSearch = () => import('@/views/front/college/home/search.vue')
const FrontCollegeSearchIndex = () => import('@/views/front/college/search/search.vue')
const FrontCollegeSearchUser = () => import('@/views/front/college/search/user.vue')
const FrontCollegeSearchSpecial = () => import('@/views/front/college/search/special.vue')
const FrontCollegeSearchSpecialColumn = () => import('@/views/front/college/search/special-column.vue')
// 问题
const FrontCollegeAnswer = () => import('@/views/front/college/question/answer.vue')
const FrontCollegeQuestion = () => import('@/views/front/college/question/question')
const FrontCollegeMyInvitation = () => import('@/views/front/college/question/invitation.vue')
const FrontCollegeMyConcerns = () => import('@/views/front/college/question/concerns.vue')
const FrontCollegeQuestionDetails = () => import('@/views/front/college/question/question-details')
const FrontCollegeAnswerLater = () => import('@/views/front/college/question/answer-later')
// 发现
const FrontCollegeFind = () => import('@/views/front/college/find/find')
const FrontCollegeSpecial = () => import('@/views/front/college/find/special')
const FrontCollegeSpecialdetails = () => import('@/views/front/college/find/special-details')
const FrontCollegeSpecialColumn = () => import('@/views/front/college/find/special-column.vue')
const FrontCollegeCollect = () => import('@/views/front/college/collect/collect')

export default [
/**  -------- 学院-----------  */
  {
    path: '/front/college',
    name: 'CmpFrontCollege',
    redirect: '/front/college/home/recommend',
    meta: {
      title: '水学院环境',
      keepAlive: false,
      auth: false
    },
    components: {
      Head: Frontnav,
      body: FrontCollege,
      Foot: Footer
    },
    children: [{
      path: '/front/college/home/recommend',
      name: 'CmpFRecommend',
      meta: {
        title: '水学院环境',
        keepAlive: false,
        auth: false
      },
      components: {
        default: FrontRecommend,
      }
    }, {
      path: '/front/college/home/follow',
      name: 'CmpFrontCollegeFollow',
      meta: {
        title: '水学院环境',
        keepAlive: false,
        auth: false
      },
      components: {
        default: FrontCollegeFollow,
      }
    }, {
      path: '/front/college/home/hotlist',
      name: 'CmpFrontCollegeHotlist',
      meta: {
        title: '水学院环境',
        keepAlive: false,
        auth: false
      },
      components: {
        default: FrontCollegeHotlist,
      }
    }, {
      path: '/front/college/home/writeanarticle',
      name: 'CmpFrontCollegeWriteAnArticle',
      meta: {
        title: '水学院环境|写文章',
        keepAlive: false,
        auth: false
      },
      components: {
        default: FrontCollegeWriteAnArticle,
      }
    }, {
      path: '/front/college/home/drafts',
      name: 'CmpFrontCollegeMyDrafts',
      meta: {
        title: '水学院环境|我的草稿',
        keepAlive: false,
        auth: false
      },
      components: {
        default: FrontCollegeMyDrafts,
      }
    },
    // ----------- 搜索 -------------
    {
      path: '/front/college/home/search',
      name: 'CmpFrontCollegeSearch',
      redirect: '/front/college/home/search/index',
      meta: {
        title: '水学院环境|搜索',
        keepAlive: false,
        auth: false
      },
      components: {
        default: FrontCollegeSearch,
      },
      children: [{
        path: '/front/college/home/search/index',
        name: 'CmpSeacrchIndex',
        meta: {
          title: '水学院环境|搜索',
          keepAlive: false,
          auth: false
        },
        component: FrontCollegeSearchIndex
      }, {
        path: '/front/college/home/search/user',
        name: 'CmpFrontCollegeSearchUser',
        meta: {
          title: '水学院环境|搜索',
          keepAlive: false,
          auth: false
        },
        component: FrontCollegeSearchUser
      }, {
        path: '/front/college/home/search/special',
        name: 'CmpFrontCollegeSearchSpecial',
        meta: {
          title: '水学院环境|搜索',
          keepAlive: false,
          auth: false
        },
        component: FrontCollegeSearchSpecial
      }, {
        path: '/front/college/home/search/specialdolumn',
        name: 'CmpFrontCollegeSearchSpecialColumn',
        meta: {
          title: '水学院环境|搜索',
          keepAlive: false,
          auth: false
        },
        component: FrontCollegeSearchSpecialColumn
      }]
    },
    // --------------- 等你来答 ----------------
    {
      path: '/front/college/question/answer',
      name: 'CmpFrontCollegeAnswer',
      meta: {
        title: '水学院环境文章详情',
        keepAlive: false,
        auth: false
      },
      components: {
        default: FrontCollegeAnswer,
      }
    }, {
      path: '/front/college/question/concerns',
      name: 'CmpFrontCollegeMyConcerns',
      meta: {
        title: '水学院环境|我关注的问题',
        keepAlive: false,
        auth: false
      },
      components: {
        default: FrontCollegeMyConcerns,
      }
    }, {
      path: '/front/college/question/invitation',
      name: 'CmpFrontCollegeMyInvitation',
      meta: {
        title: '水学院环境|我的邀请',
        keepAlive: false,
        auth: false
      },
      components: {
        default: FrontCollegeMyInvitation,
      }
    }, {
      path: '/front/college/question/question',
      name: 'CmpFrontCollegeQuestion',
      meta: {
        title: '水学院环境|等你来答',
        keepAlive: false,
        auth: false
      },
      component: FrontCollegeQuestion
    }, {
      path: '/front/college/question/details',
      name: 'CmpFrontCollegeQuestionDetails',
      meta: {
        title: '水学院环境|等你来答',
        keepAlive: false,
        auth: false
      },
      component: FrontCollegeQuestionDetails
    }, {
      path: '/front/college/question/answerLater',
      name: 'CmpFrontCollegeAnswerLater',
      meta: {
        title: '水学院环境|稍后答',
        keepAlive: false,
        auth: false
      },
      component: FrontCollegeAnswerLater
    },
    // ------------ 发现 -----------
    {
      path: '/front/college/find/find',
      name: 'CmpFrontCollegeFind',
      meta: {
        title: '水学院环境|发现',
        keepAlive: false,
        auth: false
      },
      component: FrontCollegeFind
    }, {
      path: '/front/college/find/special',
      name: 'CmpFrontCollegeSpecial',
      meta: {
        title: '水学院环境|专题列表',
        keepAlive: false,
        auth: false
      },
      component: FrontCollegeSpecial
    }, {
      path: '/front/college/find/specialdetails',
      name: 'CmpFrontCollegeSpecialdetails',
      meta: {
        title: '水学院环境|专题详情',
        keepAlive: false,
        auth: false
      },
      component: FrontCollegeSpecialdetails
    }, {
      path: '/front/college/find/specialcolumn',
      name: 'CmpFrontCollegeSpecialColumn',
      meta: {
        title: '水学院环境|专栏列表',
        keepAlive: false,
        auth: false
      },
      component: FrontCollegeSpecialColumn
    },
    // 收藏，草稿箱
    {
      path: '/front/college/home/collect',
      name: 'CmpFrontCollegeCollect',
      meta: {
        title: '水学院环境|我的收藏',
        keepAlive: false,
        auth: false
      },
      component: FrontCollegeCollect
    }]
  }
]
