
const Frontnav = () => import('@/components/fontnav/fontnav.vue')
const Footer = () => import('@/components/fontfooter/fontfooter.vue')
const Orgnav = () => import('@/components/orgbacknav/orgbacknav.vue')
const FrontRecruit = () => import('@/views/front/recruit/recruit.vue')
const FrontNewRecruit = () => import('@/views/front/recruit/new-recruit.vue')
const FrontRecruitPostSearch = () => import('@/views/front/recruit/post-search.vue')
const FrontPostDetail = () => import('@/views/front/recruit/post-detail.vue')
const UserOrgTalentPool = () => import('@/views/user/org/talentpool/talentpool.vue')
const UserOrgPostList = () => import('@/views/user/org/post/post-list.vue')
const UserOrgPost = () => import('@/views/user/org/post/add-post.vue')
const UserOrgResumeDetails = () => import('@/views/user/org/talentpool/resume-detail.vue')
const UserOrgCollection = () => import('@/views/user/org/talentpool/collection.vue')
const UserOrgResumeInbox = () => import('@/views/user/org/talentpool/resume.vue')
const UserOrgPostResumeList = () => import('@/views/user/org/talentpool/post-resume-list.vue')

export default [
/**  -------- 招聘-----------  */
  // 招聘
  {
    path: '/front/recruit',
    name: 'CFrontRecruit',
    meta: {
      title: '环科宝招聘|水与环境招聘专家',
      keepAlive: true,
      auth: false
    },
    components: {
      Head: Frontnav,
      body: FrontRecruit,
      Foot: Footer
    }
  },
  {
    path: '/front/recruit/post/search',
    name: 'CFrontRecruitSearch',
    meta: {
      title: '环科宝招聘|职位检索',
      keepAlive: false,
      auth: false
    },
    components: {
      Head: Frontnav,
      body: FrontRecruitPostSearch,
      Foot: Footer
    }
  },
  {
    path: '/front/recruit/post/detail',
    name: 'CFrontPostDetail',
    meta: {
      title: '环科宝招聘|职位详情',
      keepAlive: false,
      auth: false
    },
    components: {
      Head: Frontnav,
      body: FrontPostDetail,
      Foot: Footer
    }
  },
  /** ---------- 后台职位管理 ------------ */
  {
    path: '/user/org/post/manage',
    name: 'CmpOrgPostList',
    meta: {
      title: '环科宝招聘|职位管理',
      keepAlive: false,
      auth: true,
      isOptOrg: true
    },
    components: {
      Head: Orgnav,
      body: UserOrgPostList
    }
  },
  {
    path: '/user/org/post/public',
    name: 'CmpOrgPost',
    meta: {
      title: '环科宝招聘|职位发布',
      keepAlive: false,
      auth: true,
      isOptOrg: true
    },
    components: {
      Head: Orgnav,
      body: UserOrgPost
    }
  },
  // 简历管理
  {
    path: '/user/org/talentpool',
    name: 'CmpOrgTalentPool',
    meta: {
      title: '环科宝招聘|简历管理',
      keepAlive: false,
      auth: true,
      isOptOrg: true
    },
    components: {
      Head: Orgnav,
      body: UserOrgTalentPool
    }
  },
  // 后台管理 -->  简历详情
  {
    path: '/user/org/talentpool/resumedetails',
    name: 'CmpOrgResume',
    meta: {
      title: '环科宝招聘|简历详情',
      keepAlive: false,
      auth: true,
      isOptOrg: true
    },
    components: {
      Head: Orgnav,
      body: UserOrgResumeDetails
    }
  },
  // 后台管理 -->  收藏简历
  {
    path: '/user/org/talentpool/collection',
    name: 'CmpUserOrgCollection',
    meta: {
      title: '环科宝招聘|人才收藏',
      keepAlive: false,
      auth: true,
      isOptOrg: true
    },
    components: {
      Head: Orgnav,
      body: UserOrgCollection
    }
  },
  // 后台管理 -->  简历收件箱
  {
    path: '/user/org/talentpool/resumeInbox',
    name: 'CmpUserOrgResumeInbox',
    meta: {
      title: '环科宝招聘|人才收藏',
      keepAlive: false,
      auth: true,
      isOptOrg: true
    },
    components: {
      Head: Orgnav,
      body: UserOrgResumeInbox
    }
  },
  // 后台管理 -->  简历收件箱 -->  职位简历列表
  {
    path: '/user/org/talentpool/postresumelist',
    name: 'CmpUserOrgPostResumeList',
    meta: {
      title: '环科宝招聘|人才收藏',
      keepAlive: false,
      auth: true,
      isOptOrg: true
    },
    components: {
      Head: Orgnav,
      body: UserOrgPostResumeList
    }
  },
  // -------------------- 改版后的职位招聘首页 -----------
  {
    path: '/front/newrecruit',
    name: 'CFrontNewRecruit',
    meta: {
      title: '环科宝招聘|水与环境招聘专家',
      keepAlive: true,
      auth: false
    },
    components: {
      Head: Frontnav,
      body: FrontNewRecruit,
      Foot: Footer
    }
  },
]