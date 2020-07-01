// 路由

const Frontnav = () => import('@/components/fontnav/fontnav.vue')
const Footer = () => import('@/components/fontfooter/fontfooter.vue')
const FrontStore = () => import('@/views/front/stoer/stoer.vue')

export default [
/**  -------- 商城-----------  */
  {
    path: '/front/store',
    name: 'CmpFrontStorelist',
    meta: {
      title: '环科宝商城',
      keepAlive: false,
      auth: false
    },
    components: {
      Head: Frontnav,
      body: FrontStore,
      Foot: Footer
    }
  }
]
