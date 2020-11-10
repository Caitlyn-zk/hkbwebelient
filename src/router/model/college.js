
const Frontnav = () => import('@/components/fontnav/fontnav.vue')
const Footer = () => import('@/components/fontfooter/fontfooter.vue')
const FrontCollegeRecommend = () => import('@/views/front/college/college.vue')
const FrontCollegeSpecial = () => import('@/views/front/college/special.vue')
const FrontCollegeCreateSpecial = () => import('@/views/front/college/create-special.vue')

const FrontCollegeArticleDetails = () => import('@/views/front/college/article-detail.vue')
const FrontCollegeRecommendAuthor = () => import('@/views/front/college/recommend-author')

const FrontCollegeRecommendSpecial = () => import('@/views/front/college/recommend-special')
const FrontCollegeSpecialDetails = () => import('@/views/front/college/special-detail.vue')

// 用户
const FrontCollegeUser = () => import('@/views/front/college/user/user.vue')
const FrontCollegeUserNewest = () => import('@/views/front/college/user/newest.vue')
const FrontCollegeUserFollowOrFans = () => import('@/views/front/college/user/follow-or-fans.vue')

// 关注
const FrontCollegeFollow = () => import('@/views/front/college/follow/follow.vue')
const FrontCollegeFollowList = () => import('@/views/front/college/follow/follow-list.vue')
const FrontCollegeFollowUser = () => import('@/views/front/college/follow/follow-user.vue')
const FrontCollegeFollowRecommend = () => import('@/views/front/college/follow/follow-recommend.vue')

// 消息

const FrontCollegeInfo = () => import('@/views/front/college/info/info.vue')
const FrontCollegeInfolList = () => import('@/views/front/college/info/info-list.vue')
const FrontCollegeInfoComment = () => import('@/views/front/college/info/comment.vue')
const FrontCollegeInfoSubmitRequest = () => import('@/views/front/college/info/submit-request.vue')
const FrontCollegeInfoManuscriptManage = () => import('@/views/front/college/info/manuscript-manage.vue')

// 文章编辑
const FrontCollegeArticleEditor = () => import('@/views/front/college/article/editor')
export default [
  /**  -------- 学院-----------  */
  {
    path: '/front/college/recommend',
    name: 'CmpFrontCollegeRecommend',
    // redirect: '/front/college/home/recommend',
    meta: {
      title: '水学院环境',
      keepAlive: true,
      auth: false
    },
    components: {
      Head: Frontnav,
      body: FrontCollegeRecommend,
      // Foot: Footer
    },
  },
  {
    path: '/front/college/special',
    name: 'CmpFrontCollegeSpecial',
    // redirect: '/front/college/home/recommend',
    meta: {
      title: '水学院环境|专题列表',
      keepAlive: true,
      auth: false
    },
    components: {
      Head: Frontnav,
      body: FrontCollegeSpecial,
      Foot: Footer
    },
  },
  {
    path: '/front/college/createspecial',
    name: 'CmpFrontCollegeCreateSpecial',
    // redirect: '/front/college/home/recommend',
    meta: {
      title: '水学院环境|创建专题',
      keepAlive: false,
      auth: false
    },
    components: {
      Head: Frontnav,
      body: FrontCollegeCreateSpecial,
      Foot: Footer
    },
  },
  {
    path: '/front/college/articledetails',
    name: 'CmpFrontCollegeArticleDetails',
    // redirect: '/front/college/home/recommend',
    meta: {
      title: '水学院环境|文章详情',
      keepAlive: false,
      auth: false
    },
    components: {
      Head: Frontnav,
      body: FrontCollegeArticleDetails,
      Foot: Footer
    },
  },
  {
    path: '/front/college/article/editor',
    name: 'CmpFrontCollegeArticleEditor',
    meta: {
      title: '文章编辑',
      keepAlive: false,
      auth: true
    },
    components: {
      body: FrontCollegeArticleEditor
    }
  },
  {
    path: '/front/college/recommend/author',
    name: 'CmpFrontCollegeRecommendAuthor',
    meta: {
      title: '推荐作者',
      keepAlive: false,
      auth: false
    },
    components: {
      Head: Frontnav,
      body: FrontCollegeRecommendAuthor,
      Foot: Footer
    }
  },
  {
    path: '/front/college/recommend/special',
    name: 'CmpFrontCollegeRecommendSpecial',
    meta: {
      title: '推荐专题',
      keepAlive: false,
      auth: false
    },
    components: {
      Head: Frontnav,
      body: FrontCollegeRecommendSpecial,
      Foot: Footer
    }
  },
  {
    path: '/front/college/specialdetails',
    name: 'CmpFrontCollegeSpecialDetails',
    meta: {
      title: '专题详情',
      keepAlive: false,
      auth: false
    },
    components: {
      Head: Frontnav,
      body: FrontCollegeSpecialDetails,
      Foot: Footer
    }
  },
  /**
   * 用户
  */
  {
    path: '/front/college/user',
    name: 'CmpFrontCollegeUser',
    redirect: '/front/college/user/newest',
    meta: {
      title: '用户主页',
      keepAlive: true,
      auth: false
    },
    components: {
      Head: Frontnav,
      body: FrontCollegeUser,
      Foot: Footer
    },
    children: [{
      path: '/front/college/user/newest',
      name: 'CmpFrontCollegeUserNewest',
      meta: {
        title: '用户主页',
        keepAlive: false,
        auth: false
      },
      components: {
        default: FrontCollegeUserNewest,
      }
    }, {
      path: '/front/college/user/followOrfans',
      name: 'CmpFrontCollegeUserFollowOrFans',
      meta: {
        title: '用户主页|关注',
        keepAlive: false,
        auth: false
      },
      components: {
        default: FrontCollegeUserFollowOrFans,
      }
    },]
  },
  /**
   * 关注
  */
  {
    path: '/front/college/follow',
    name: 'CmpFrontCollegeFollow',
    redirect: '/front/college/follow/list',
    meta: {
      title: '用户关注',
      keepAlive: false,
      auth: false
    },
    components: {
      Head: Frontnav,
      body: FrontCollegeFollow,
      Foot: Footer
    },
    children: [{
      path: '/front/college/follow/list',
      name: 'CmpFrontCollegeFollowList',
      meta: {
        title: '用户关注',
        keepAlive: false,
        auth: false
      },
      components: {
        default: FrontCollegeFollowList,
      }
    }, {
      path: '/front/college/follow/user',
      name: 'CmpFrontCollegeFollowUser',
      meta: {
        title: '用户关注',
        keepAlive: false,
        auth: false
      },
      components: {
        default: FrontCollegeFollowUser,
      }
    }, {
      path: '/front/college/follow/recommend',
      name: 'CmpFrontCollegeFollowRecommend',
      meta: {
        title: '用户关注',
        keepAlive: false,
        auth: false
      },
      components: {
        default: FrontCollegeFollowRecommend,
      }
    }]
  },
  /**
   * 消息
  */
  {
    path: '/front/college/info',
    name: 'CmpFrontCollegeInfo',
    redirect: '/front/college/info/list',
    meta: {
      title: '用户消息',
      keepAlive: false,
      auth: false
    },
    components: {
      Head: Frontnav,
      body: FrontCollegeInfo,
      Foot: Footer
    },
    children: [{
      path: '/front/college/info/list',
      name: 'CmpFrontCollegeInfolList',
      meta: {
        title: '用户消息',
        keepAlive: false,
        auth: false
      },
      components: {
        default: FrontCollegeInfolList,
      }
    },
     {
      path: '/front/college/info/comment',
      name: 'CmpFrontCollegeInfoComment',
      meta: {
        title: '用户消息|评论',
        keepAlive: false,
        auth: false
      },
      components: {
        default: FrontCollegeInfoComment,
      }
    }, {
      path: '/front/college/info/submitrequest',
      name: 'CmpFrontCollegeInfoSubmitRequest',
      meta: {
        title: '用户消息|投稿请求',
        keepAlive: false,
        auth: false
      },
      components: {
        default: FrontCollegeInfoSubmitRequest,
      }
    }, {
      path: '/front/college/info/submitrequest/manage',
      name: 'CmpFrontCollegeInfoManuscriptManage',
      meta: {
        title: '用户消息|全部投稿',
        keepAlive: false,
        auth: false
      },
      components: {
        default: FrontCollegeInfoManuscriptManage,
      }
    }]
  }
]
