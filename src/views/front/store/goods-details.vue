<!--商品详情-->
<template>
  <div class="store-content padding-b-20">
    <storeHeader></storeHeader>
    <div class="gray-box">
      <div class="content">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>环境保护</el-breadcrumb-item>
          <el-breadcrumb-item>环保设备</el-breadcrumb-item>
          <span class="goods-name-nav">废弃净化设备-布袋除尘器厂家 粉尘处理设备 家具木工除尘设备</span>
        </el-breadcrumb>
        <div class="block">
          <div class="gallery">
              <div class="thumb">
                <div class="big">
                  <img :src="big" :alt="product.productName" />
                </div>
              </div>
              <div class="thumbnail">
                <ul>
                  <li
                    v-for="(item,i) in small"
                    :key="i"
                    :class="{on:big===item}"
                    @click="onSelectImg(item)"
                  >
                    <img v-lazy="item" :alt="product.productName" />
                  </li>
                </ul>
              </div>
            </div>
          <!--右边-->
          <div class="banner">
            <div class="sku-custom-title">
              <h4>{{product.store_name}}</h4>
            </div> 
            <div class="num padding-b-18">
              <span class="font-14 text-line num-chima">价格</span>
              <span class="price">¥{{product.price}}</span>
            </div>
            <div class="num margin-b-30 num-border-b">
              <div class="original-price">
                <span class="name font-12 text-line num-chima">原价</span>
                <span class="price-yuanjia">¥{{product.price}}</span>
              </div>
              <div class="sales-volume">
                <span class="name font-12 text-line margin-r-16">累计销量</span>
                <span class="stics font-12 text-line">2841</span>
              </div>
            </div>
            <div class="num margin-b-20">
              <span class="font-12 text-line num-chima line-12">物流</span>
              <span>山东省 德州市 禹城市</span>
            </div>
            <div class="num margin-b-20">
              <span class="font-12 text-line num-chima line-12">颜色</span>
              <el-button class="color" v-for="(color,index) in colorData" :key="index">{{color}}</el-button>
            </div>
            <div class="num margin-b-20">
              <span class="num-chima font-12 text-line line-12">尺码</span>
              <div class="num-size-option">
                <el-button class="size" v-for="(size,index) in sizeData" :key="index">{{size}}</el-button>
              </div>
            </div>
            <div class="num margin-b-40">
              <span class="font-12 text-line num-chima line-12">数量</span>
              <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
            </div>
            <div class="bommon-block">
              <el-button class="buy">立即购买</el-button>
              <el-button class="add" @click="addCart">加入购物车</el-button>
              <span class="customer">
                <i class="iconfont icon-kefu1"></i>
                <span>咨询客服</span>
              </span>
            </div>
          </div>
          <div class="recommend">
            <div class="text-center hot-title">
              <i class="el-icon-minus"></i>
              <h3 class="text-title">热销单品</h3>
              <i class="el-icon-minus"></i>
            </div>
            <ul class="recommend-list">
              <li class="content-right-goods" v-for="item in 3" :key="item">
                <div class="goods-img">
                  <img src="../../../assets/image/stoer-goods01.png" alt />
                </div>
                <p class="goods-money-cx line-26 text-center">
                  <span class="font-14">￥45.00</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--产品信息-->
    <div class="item-info content">
      <div class="recommend" :style="{'height':404*goodsList.length+100+'px'}">
        <div class="title">相似产品</div>
        <!-- -->
        <ul slot="content" class="recommend-content">
          <li class="content-right-goods" v-for="(item,index) in goodsList" :key="index">
            <div class="goods-img">
              <img :src="item.image" alt />
            </div>
            <p class="goods-name title-nowrap-tow text-l margin-t-15">{{item.store_name}}</p>
            <p class="goods-money-cx line-26 text-center">
              <span class="font-14 money">￥{{item.price}}</span>
              <span class="text-line sales-volume">销量：<span class="num-bar">123</span></span>
            </p>
          </li>
        </ul>
      </div>
      <div class="product-info">
        <div class="title">
          <span>产品信息</span>
          <div slot="right" class="right">
            <div class="option">
              <el-popover placement="bottom" trigger="hover" width="96px">
                <img
                  src="../../../../static/img/footer_QR_code.png"
                  style="margin-bottom: -4px;"
                  alt
                  class="qr-code"
                />
                <div slot="reference" class="option-name hk-cursor">
                  <div class="tips">
                    手机查看
                    <i class="iconfont icon-erweima"></i>
                  </div>
                </div>
              </el-popover>
            </div>
          </div>
        </div>

        <div slot="content right" class="right-goods-content">
          <div class="img-item" v-if="productMsg">
            <div v-html="productMsg">{{ productMsg }}</div>
          </div>
          <div class="no-info" v-else>
            <img src="/static/images/no-data.png" />
            <br />该商品暂无内容数据
          </div>
        </div>
      </div>
    </div>
    <!--抛物图片-->
    <transition @after-enter='afterEnter' @before-enter="beforeEnter">
      <!--整张图片-->
      <div class="move_img" v-if="showMoveImg"
           :style="{left:(cartPositionL-10) + 'px',top:(cartPositionT-10) + 'px'}">
        <div><img :src="moveImgUrl"></div>
      </div>
    </transition>
  </div>
</template>
<script>
// import { getProductDetail, postCartAdd } from "/api/store";
import { mapMutations, mapState } from "vuex";
import storeHeader from "@/components/store/header.vue";
export default {
  data() {
    return {
      productMsg: {},
      small: [],
      
      big: "",
      num: 1,
      product: {
        salePrice: 0
      },
      price: null,
      productNum: 1,
      userId: "",
      productAttr: [],
      productValue: [],
      goodsDetails: {
        uid: 0,
        storeInfo: {
          add_time: 1591415470,
          browse: 0,
          cate_id: "65",
          code_path: "",
          cost: "59.50",
          ficti: 0,
          give_integral: "0.00",
          id: 173,
          image:
            "https://m.yitianmc.com/uploads/attach/2020/06/06/ba685f5e123183c634b755b53e5967a2.jpg",
          is_sub: 0,
          is_bargain: null,
          is_benefit: 0,
          is_best: 1,
          is_del: 0,
          is_hot: 0,
          is_new: 0,
          is_postage: 0,
          is_seckill: 0,
          is_show: 1,
          keyword: "",
          mer_id: 0,
          mer_use: 0,
          ot_price: "59.50",
          postage: "0.00",
          price: "59.50",
          sales: 1,
          slider_image: [
            "https://m.yitianmc.com/uploads/attach/2020/06/06/ba685f5e123183c634b755b53e5967a2.jpg",
            "https://m.yitianmc.com/uploads/attach/2020/06/06/f4b6403434d17cb1d12b615d2d17d851.jpg",
            "https://m.yitianmc.com/uploads/attach/2020/06/06/ada55d00b7f76474f12c4cefbc816ea7.jpg"
          ],
          sort: 0,
          stock: 998,
          store_info: "",
          store_name: "（洗手液组合：芦荟洗手液500g×3+芦荟洗手液瓶补500g×3）×1",
          unit_name: "件",
          vip_price: "58.91",
          spec_type: 0,
          fsales: "1",
          video_link: "",
          image_base:
            "https://m.yitianmc.com/uploads/attach/2020/06/06/ba685f5e123183c634b755b53e5967a2.jpg",
          code_base:
            "https://m.yitianmc.com/uploads/qrcode/173_product_detail_wap.jpg",
          description:
            '<p><img src="https://m.yitianmc.com/uploads/attach/2020/06/20200624/592141df4ad7411794ab375805c83cca.jpg"/></p><p><br/></p><p><img src="https://m.yitianmc.com/uploads/attach/2020/06/06/6d69979193bbc10abb00e490d9366265.jpg"/></p><p><img src="https://m.yitianmc.com/uploads/attach/2020/06/06/353a15b6b5fbdfd23fa83c4849f8a5f8.jpg"/></p><p><img src="https://m.yitianmc.com/uploads/attach/2020/06/06/7d5703717d8ac9cff4c8bf004989cffc.jpg"/></p><p><img src="https://m.yitianmc.com/uploads/attach/2020/06/06/a809cb9020e1839693e30bd11492aaec.jpg"/></p><p><img src="https://m.yitianmc.com/uploads/attach/2020/06/06/f4fe3aae51aec04fd774cf03051ca7b6.jpg"/></p><p><img src="https://m.yitianmc.com/uploads/attach/2020/06/06/a98854f47c311b34ae1d78a8ebbe47fe.jpg"/></p><p><img src="https://m.yitianmc.com/uploads/attach/2020/06/06/aee24d8bffffa83a12bcaf1d2d56fc4b.jpg"/></p><p><br/></p>',
          userCollect: false,
          userLike: false
        },
        similarity: [
          {
            id: 416,
            store_name:
              "爱护佳季铵盐消毒湿巾家庭用护理卫生医疗除菌杀菌湿纸巾50抽  80抽",
            image:
              "https://m.yitianmc.com/uploads/attach/2020/07/08/3a05569e225a121d6375805fc74766cd.jpg",
            price: "19.60",
            sales: 0,
            ficti: 0
          },
          {
            id: 415,
            store_name:
              "爱护佳酒精棉手机屏幕消毒湿巾居家备用伤口消毒棉酒精棉片",
            image:
              "https://m.yitianmc.com/uploads/attach/2020/07/08/d49b027378677a9789bde1c18ed88046.jpg",
            price: "9.90",
            sales: 0,
            ficti: 0
          },
          {
            id: 350,
            store_name: "滴露健康抑菌洗手液植物呵护450克+自然清新450克",
            image:
              "https://m.yitianmc.com/uploads/attach/2020/06/20200622/7f955650abb4fcf3c164045415a1a072.jpg",
            price: "34.80",
            sales: 0,
            ficti: 0
          },
          {
            id: 349,
            store_name: "滴露健康抑菌洗手液滋润倍护450克+经典松木450克",
            image:
              "https://m.yitianmc.com/uploads/attach/2020/06/20200622/9f5523fb75dd243314fbaf99d6577efa.jpg",
            price: "34.80",
            sales: 0,
            ficti: 0
          }
        ],
        productAttr: [
          {
            product_id: 173,
            attr_name: "规格",
            attr_values: ["默认"],
            type: 0,
            attr_value: [{ attr: "默认", check: false }]
          }
        ],
        productValue: {
          默认: {
            product_id: 173,
            suk: "默认",
            stock: 998,
            sales: 1,
            price: "59.50",
            image:
              "https://m.yitianmc.com/uploads/attach/2020/06/06/ba685f5e123183c634b755b53e5967a2.jpg",
            unique: "2eacc568",
            cost: "59.50",
            bar_code: "",
            ot_price: "59.50",
            weight: "0.00",
            volume: "0.00",
            brokerage: "0.00",
            brokerage_two: "0.00",
            type: 0,
            quota: 0,
            quota_show: 0
          }
        },
        priceName: 0,
        reply: null,
        replyCount: 0,
        replyChance: 0,
        mer_id: 0,
        system_store: [],
        good_list: [],
        mapKey: "",
        store_self_mention: 1,
        activity: []
      },
      productValueData: {},
      selectSizeIndex: 0,
      sizeData: ["S", "M", "L", "XL", "XXL"],
      colorData: ["白色", "黑色"],
      goodsList: [],
      specs: [],
      
      
      hotPostList: [
        {
          id: 0,
          name: "热门职位",
          number: 1236,
          img: ""
        },
        {
          id: 1,
          name: "热门职位",
          number: 1236,
          img: ""
        },
        {
          id: 2,
          name: "热门职位",
          number: 1236,
          img: ""
        },
        {
          id: 3,
          name: "热门职位",
          number: 1236,
          img: ""
        }
      ],
      collegeList: [
        {
          id: 0,
          name: "专题数",
          number: 1236,
          img: ""
        },
        {
          id: 1,
          name: "作者数",
          number: 1236,
          img: ""
        },
        {
          id: 2,
          name: "最新文章",
          number: 1236,
          img: ""
        },
        {
          id: 3,
          name: "全部文章",
          number: 1236,
          img: ""
        }
      ]
    };
  },
  components: {
    storeHeader
  },
  computed: {
    ...mapState([ "isLogin" ]),
    showCart(){
      return this.$store.state.app.showCart;
    },
    cartList(){
      return this.$store.state.app.cartList;
    },
    moveImgUrl(){
      return this.$store.state.app.moveImgUrl;
    },
    showMoveImg(){
      return this.$store.state.app.showMoveImg;
    },
    cartPositionT(){
      return this.$store.state.app.cartPositionT;
    },
    cartPositionL(){
      return this.$store.state.app.cartPositionL;
    },
    elLeft(){
      return this.$store.state.app.elLeft;
    },
    elTop(){
      return this.$store.state.app.elTop;
    },
  },
  methods: {
    ...mapMutations(["ADD_CART", "ADD_ANIMATION", "SHOW_CART"]),
    // 监听图片进入购物车
    listenInCart () {
      this.ADD_ANIMATION({moveShow: false, receiveInCart: true})
    },
    beforeEnter (el) {
      // console.log('动画1',this.showMoveImg)
      let elStyle = el.style
      let elChild = el.children[0]
      let elChildSty = elChild.style
      elStyle.transform = `translate3d(0,${this.elTop - this.cartPositionT}px,0)`
      elChildSty.transform = `translate3d(${-(this.cartPositionL - this.elLeft)}px,0,0) scale(1.2)`
    },
    afterEnter (el) {
      // console.log('动画2')
      let elStyle = el.style
      let elChild = el.children[0]
      let elChildSty = elChild.style
      elStyle.transform = `translate3d(0,0,0)`
      elChildSty.transform = `translate3d(0,0,0) scale(.2)`
      elStyle.transition = 'transform .55s cubic-bezier(.29,.55,.51,1.08)'
      elChildSty.transition = 'transform .55s linear'
      // 动画结束
      elChild.addEventListener('transitionend', () => {
        this.listenInCart()
      })
      elChild.addEventListener('webkitAnimationEnd', () => {
        this.listenInCart()
      })
    },
    // 获取详情
    getProductDetail(id) {
      getProductDetail(id).then(res => {
        // console.log("获取产品详情",JSON.stringify(res.data))
        if (res.status == 200) {
          this.productMsg = res.data.storeInfo.description || "";
          this.price = res.data.storeInfo.price;
          this.product = res.data.storeInfo;
          this.small = res.data.storeInfo.slider_image;
          this.big = this.small[0];
          this.productValue = Object.values(res.data.productValue);
          this.productValueData = res.data.productValue;
          this.productAttr = res.data.productAttr;
          this.goodsList = res.data.similarity;
          this.specs = res.data.productAttr[0].attr_values;
        }
        // this.product.spec_type 规格类型
        // console.log("获取产品详情 good_list",JSON.stringify(res.data.good_list))
      });
    },
    addCart() {
      var data = {};
      var that = this;
      data.productId = that.product.id;
      data.cartNum = that.productNum;
      data.uniqueId = that.productValue[0].unique;
      data.combinationId = that.product.id;
      data.new = 1;
      if (!that.showMoveImg) {
        // 动画是否在运动
        if (that.isLogin) {
          // 登录了 直接存在用户名下
          postCartAdd(data).then(res => {
            // 并不重新请求数据
            this.ADD_CART({
              productId: 1,
              salePrice: 59.50,
              productName: '（洗手液组合：芦荟洗手液500g×3+芦荟洗手液瓶补500g×3）×1',
              productImg: 'https://m.yitianmc.com/uploads/attach/2020/06/06/ba685f5e123183c634b755b53e5967a2.jpg',
              productNum: this.num
            });
          });
        } else {
          // 未登录 vuex
          this.ADD_CART({
             productId: 1,
              salePrice: 59.50,
              productName: '（洗手液组合：芦荟洗手液500g×3+芦荟洗手液瓶补500g×3）×1',
              productImg: 'https://m.yitianmc.com/uploads/attach/2020/06/06/ba685f5e123183c634b755b53e5967a2.jpg',
              productNum: this.num
          });
        }
        // 加入购物车动画
        var dom = event.target;
        // 获取点击的坐标
        let elLeft = dom.getBoundingClientRect().left + dom.offsetWidth / 2;
        let elTop = dom.getBoundingClientRect().top + dom.offsetHeight / 2;
        // console.log('获取点击的坐标',elLeft,elTop)
        // 需要触发
        this.ADD_ANIMATION({
          moveShow: true,
          elLeft: elLeft,
          elTop: elTop,
          img: 'https://m.yitianmc.com/uploads/attach/2020/06/06/ba685f5e123183c634b755b53e5967a2.jpg'
        });
        if (!this.showCart) {
          this.SHOW_CART({ showCart: true });
          if (this.showCart) {
           let timer =  setTimeout(() => {
             this.SHOW_CART({ showCart: false })
            }, 5000)
          }
        }
      }
    },
    handleChange () {},
    checkout(productId) {
      this.$router.push({
        path: "/checkout",
        query: { productId, num: this.productNum }
      });
    },
    editNum(num) {
      this.productNum = num;
    },
    onGoodsDetails(val) {
      this.$router.push({ path: "goodsDetails", query: { productId: val } });
      this.getProductDetail(val);
    },
    // 规格选择
    onAttrValues(item, index) {
      // console.log('规格选择',this.productValue)
      this.big = this.productValueData[item].image;
      this.product.price = this.productValueData[item].price;
      this.selectSizeIndex = index;
      // console.log('规格选择',this.price)
    },
    // 图片选择
    onSelectImg(item) {
      // console.log('product.price',this.price)
      this.big = item;
      this.$set(this.product, "price", this.price);
      this.selectSizeIndex = 0;
    },
    // 商品详情
    onGoodDetails() {},
    
  },
  created() {
    let id = this.$route.query.productId;
    // this.getProductDetail(id);
    // this.userId = getStore('userId')
    let data = this.goodsDetails;
    this.productMsg = data.storeInfo.description || "";
    this.price = data.storeInfo.price;
    this.product = data.storeInfo;
    this.small = data.storeInfo.slider_image;
    this.big = this.small[0];
    this.productValue = Object.values(data.productValue);
    this.productValueData = data.productValue;
    this.productAttr = data.productAttr;
    this.goodsList = data.similarity;
    this.specs = data.productAttr[0].attr_values;
  }
};
</script>
<style lang="less" scoped>
@import "./goods-details.less";
</style>
