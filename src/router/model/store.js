// 路由

const Frontnav = () => import('@/components/fontnav/fontnav.vue')
const Footer = () => import('@/components/fontfooter/fontfooter.vue')
const FrontStore = () => import('@/views/front/store/store.vue')
const GoodsDetail = () => import('@/views/front/store/goods-details.vue')
const GoodsSearch = () => import('@/views/front/store/search.vue')

export default [
/**  -------- 商城-----------  */
  {
    path: '/front/store',
    name: 'CmpFrontStorelist',
    meta: {
      title: '环科宝商城',
      keepAlive: true,
      auth: false
    },
    components: {
      Head: Frontnav,
      body: FrontStore,
      Foot: Footer
    }
  },
  {
    path: '/front/goods/detail',
    name: 'CmpFrontGoodsDetails',
    meta: {
      title: '商品详情',
      keepAlive: false,
      auth: false
    },
    components: {
      Head: Frontnav,
      body: GoodsDetail,
      Foot: Footer
    }
  },
  {
    path: '/front/goods/search',
    name: 'CmpFrontGoodsSearch',
    meta: {
      title: '商品列表',
      keepAlive: true,
      auth: false
    },
    components: {
      Head: Frontnav,
      body: GoodsSearch,
      Foot: Footer
    }
  },
]
