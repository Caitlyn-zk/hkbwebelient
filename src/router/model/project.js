// 路由

const Frontnav = () => import('@/components/fontnav/fontnav.vue')
const Footer = () => import('@/components/fontfooter/fontfooter.vue')
const Orgnav = () => import('@/components/orgbacknav/orgbacknav.vue')
const FrontProject = () => import('@/views/front/project/project.vue')
const FrontProjectSearch = () => import('@/views/front/project/project-search.vue')
const FrontProjectDetail = () => import('@/views/front/project/project-detail.vue')
const FrontProjectNoticeDetail = () => import('@/views/front/project/notice-detail.vue')
const UserOrgAddProject = () => import('@/views/user/org/project/release.vue')
const UserProject = () => import('@/views/user/org/project/project.vue')
const UserOrgNoticeList = () => import('@/views/user/org/notice/notice-list.vue')
const UserOrgNoticeAdd = () => import('@/views/user/org/notice/notice-add.vue')

// 引入模块
export default [
/**  -------- 项目-----------  */
// 项目首页FrontProjectSearch
  {
    path: '/front/project/search',
    name: 'CmpFrontProjectSearch',
    meta: {
      title: '项目管理',
      keepAlive: false,
      auth: false
    },
    components: {
      Head: Frontnav,
      body: FrontProjectSearch,
      Foot: Footer
    }
  },
  {
    path: '/front/project',
    name: 'CmpFrontProject',
    meta: {
      title: '企业项目管理',
      keepAlive: false,
      auth: false
    },
    components: {
      Head: Frontnav,
      body: FrontProject,
      Foot: Footer
    }
  }, {
    path: '/front/project/detail',
    name: 'CmpFrontProjectDetail',
    meta: {
      title: '项目详情',
      keepAlive: false,
      auth: false
    },
    components: {
      Head: Frontnav,
      body: FrontProjectDetail,
      Foot: Footer
    }
  }, {
    path: '/front/project/noticedetail',
    name: 'CmpFrontProjectNoticeDetail',
    meta: {
      title: '项目公示详情',
      keepAlive: false,
      auth: false
    },
    components: {
      Head: Frontnav,
      body: FrontProjectNoticeDetail,
      Foot: Footer
    }
  },
  /**  --------------------------------- user管理后台---------------------------------  */
  // 项目中心
  {
    path: '/user/org/project',
    name: 'CmpOrgProject',
    meta: {
      title: '环科宝|招商项目管理',
      keepAlive: false,
      auth: true,
      isOptOrg: true
    },
    components: {
      Head: Orgnav,
      body: UserProject
    }
  },
  {
    path: '/user/org/project/add',
    name: 'CmpOrgAddProject',
    meta: {
      title: '企业项目管理',
      keepAlive: false,
      auth: true,
      isOptOrg: true
    },
    components: {
      Head: Orgnav,
      body: UserOrgAddProject
    }
  },
  /** ---------- 环评公示 ------------ */
  {
    path: '/user/org/notice/list',
    name: 'CmpOrgNoticeList',
    meta: {
      title: '环评公示',
      keepAlive: false,
      auth: true,
      isOptOrg: true
    },
    components: {
      Head: Orgnav,
      body: UserOrgNoticeList
    }
  },
  {
    path: '/user/org/notice/add',
    name: 'CmpOrgNoticeAdd',
    meta: {
      title: '环评公示',
      keepAlive: false,
      auth: true,
      isOptOrg: true
    },
    components: {
      Head: Orgnav,
      body: UserOrgNoticeAdd
    }
  }
]
