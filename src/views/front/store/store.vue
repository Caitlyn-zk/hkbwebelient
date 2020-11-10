<template>
  <div class="stoer" v-loading.fullscreen.lock="fullscreenLoading">
    <storeHeader class="store-main-nav"></storeHeader>
    <div class="content">
      <div class="container clearfix">
        <!-- 广告轮播图 -->
        <div class="ad-rotation-chart">
          <el-carousel height="288px" arrow="never" :interval="interval">
            <el-carousel-item v-for="(item,index) in banner" :key="index">
              <div>
                <img
                  style="width:574px;height:288px"
                  :src="item.pic"
                  :onerror="defaultImg"
                  @click="onAD"
                />
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="stics">
          <div class="block">
            <div class="title">职位</div>
            <div class="margin-t-10 list">
              <div class="info" v-for="(item,index) in hotPostList" :key="index">
                <div class="name">
                  <img :src="item.img" alt />
                  {{item.name}}
                </div>
                <div class="stics-number">{{item.number}}个</div>
              </div>
            </div>
          </div>
          <div class="block">
            <div class="title">学院</div>
            <div class="margin-t-10 list">
              <div class="info" v-for="(item,index) in collegeList" :key="index">
                <div class="name">
                  <img :src="item.img" alt />
                  {{item.name}}
                </div>
                <div class="stics-number">{{item.number}}个</div>
              </div>
            </div>
          </div>
        </div>
        <div class="muster">
          <div class="trait">
            <div class="list" :class=" index > 2 ? 'margin-b-0':'margin-b-14'" v-for="(item,index) in traitList" :key="index">
             
              <img :src="item.img" alt />
              <div class="name ">{{item.name}}</div>
            </div>
          </div>
          <div class="hot-line">
            咨询热线
            <span>
              <i class="el-icon-phone-outline"></i>400-8811-8888
            </span>
          </div>
          <div class="newest-projects">
            <div class="title">
              <div>最新项目</div>
              <el-button>
                更多
                <i class="el-icon-arrow-right"></i>
              </el-button>
            </div>
            <div class="list">
              <div v-for="(item,index) in newestProjectsList" :key="index" class="info">
                <div class="project-name">{{item.name}}</div>
                <div class="add-time">{{item.add_time}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 限时秒杀 -->
    <goodsSeckill></goodsSeckill>
    <!-- 拼团优惠 -->
    <groupBuying></groupBuying>
    <!-- 精选活动 -->
    <div class="selected-main content">
      <div class="stoer-title">
        <h3 class="title-name">精选活动</h3>
        <el-button class="title-see-more" type="text">
          查看更多
          <i class="el-icon-d-arrow-right"></i>
        </el-button>
      </div>
      <ul class="selected-activities">
        <li class="list" v-for="item in selectedlist" :key="item.id">
          <img :src="item.url" alt />
        </li>
      </ul>
    </div>
    <!-- 工程图纸 -->
    <div class="environmental-protection content">
      <div class="stoer-title">
        <h3 class="title-name">工程图纸</h3>
        <el-button class="title-see-more" type="text">
          查看更多
          <i class="el-icon-d-arrow-right"></i>
        </el-button>
      </div>
      <Engineering :conetnData="engineering"></Engineering>
    </div>
    <!-- 为你推荐 -->
    <div class="content recommend">
      <div class="stoer-title">
        <h3 class="title-name">为你推荐</h3>
        <ul class="recommend-content padding-t-21">
          <li
            class="recommend-type-list hk-cursor"
            v-for="item in recommendType"
            :key="item.id"
            :class="activeIndex === item.id ? 'is-active' : ''"
            @click="onRecommendType(item.id)"
          >
            <span class="recommend-list-name">{{item.cate_name}}</span>
          </li>
        </ul>
      </div>
      <ul class="recommend-goods-list">
        <recommendList v-for="item in 5" :key="item"></recommendList>
      </ul>
    </div>
    <!-- 广告banner -->
    <div class="content padding-t-33">
      <img width="100%" src="../../../assets/image/stoer-banner01.jpg" alt />
    </div>
    <!-- 环境保护 -->
    <div class="environmental-protection content">
      <div class="stoer-title">
        <h3 class="title-name">环境保护</h3>
        <el-button class="title-see-more" type="text">
          查看更多
          <i class="el-icon-d-arrow-right"></i>
        </el-button>
      </div>
      <Environment :conetnData="environment"></Environment>
    </div>
    <!-- 今日特供 -->
    <div class="content special-provision padding-t-34">
      <div class="special-pro-item" v-for="item in 3" :key="item">
        <h4 class="special-provision-title">今日特供</h4>
        <ul class="special-provision-list">
          <li class="list-bar margin-b-24" v-for="item in 4" :key="item">
            <span class="list-goods-img">
              <img :src="hotGoodImg" alt />
            </span>
            <div class="list-goods-title padding-l-21">
              <p class="goods-name title-nowrap-tow">沼气收集利用厂家介绍沼气工程配套施工方案图纸</p>
              <p class="goods-money-cx">
                <span>促销价：</span>
                <span class="font-14 text-bold">￥45.00</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 热销单品 -->
    <div class="hot-selling-items content">
      <div class="text-center hot-title">
        <i class="el-icon-minus"></i>
        <h3 class="text-title">热销单品</h3>
        <i class="el-icon-minus"></i>
      </div>
      <ul class="hot-selling margin-b-20">
        <hotGoods v-for="item in 10" :key="item"></hotGoods>
      </ul>
    </div>
  </div>
</template>
<script>
import { getRecruitData } from "@/api/recruit";
import utils from "@/utils/index.js";
import hotGoods from "@/components/store/hot-goods.vue";
import Environment from "@/components/store/environment.vue";
import Engineering from "@/components/store/environment.vue";
import recommendList from "@/components/store/recommend.vue";
import countDown from "@/components/store/count-down.vue";
import goodsSeckill from "@/components/store/seckill.vue";
import groupBuying from "@/components/store/group-buying.vue";
import storeHeader from "@/components/store/header.vue";

export default {
  data() {
    return {
      timeList: [],
      endTime: "1595365200000",
      hotGoodImg: require("../../../assets/image/loading.png"),
      login: {
        type: 2,
        reception: "找工作",
        backstage: "发布职位"
      },
      hotPostList: [
        {
          id: 0,
          name: "热门职位",
          number: 1236,
          img: require("../../../assets/image/icon/icon-hot-post.png")
        },
        {
          id: 1,
          name: "全部职位",
          number: 1236,
          img: require("../../../assets/image/icon/icon-post.png")
        },
        {
          id: 2,
          name: "热门职位",
          number: 1236,
          img: require("../../../assets/image/icon/icon-post-backups.png")
        },
        {
          id: 3,
          name: "全部职位",
          number: 1236,
          img: require("../../../assets/image/icon/icon-post.png")
        }
      ],
      collegeList: [
        {
          id: 0,
          name: "专题数",
          number: 1236,
          img: require("../../../assets/image/icon/icon-special.png")
        },
        {
          id: 1,
          name: "作者数",
          number: 1236,
          img: require("../../../assets/image/icon/icon-author.png")
        },
        {
          id: 2,
          name: "最新文章",
          number: 1236,
          img: require("../../../assets/image/icon/icon-newest-article.png")
        },
        {
          id: 3,
          name: "全部文章",
          number: 1236,
          img: require("../../../assets/image/icon/icon-article.png")
        }
      ],
      newestProjectsList: [
        {
          id: 0,
          name: "沼气收集利用厂家介绍沼…",
          add_time: "07.18"
        },
        {
          id: 0,
          name: "沼气收集利用厂家介绍沼…",
          add_time: "07.18"
        },
        {
          id: 0,
          name: "沼气收集利用厂家介绍沼…",
          add_time: "07.18"
        }
      ],
      traitList: [
        {
          id: 0,
          name: "资深设计",
          img: require("../../../assets/image/icon/icon-devise.png")
        },
        {
          id: 1,
          name: "专业客服",
          img: require("../../../assets/image/icon/icon-customer-service.png")
        },
        {
          id: 2,
          name: "货到付款",
          img: require("../../../assets/image/icon/icon-payment.png")
        },
        {
          id: 3,
          name: "品质保障",
          img: require("../../../assets/image/icon/icon-quality-assurance.png")
        },
        {
          id: 4,
          name: "品类齐全",
          img: require("../../../assets/image/icon/icon-category.png")
        },
        {
          id: 5,
          name: "即时发货",
          img: require("../../../assets/image/icon/icon-send-out-goods.png")
        }
      ],
      catalogId: 0,
      fullscreenLoading: false,
      inputValue: "",
      defaultImg:
        'this,src="' + require("../../../assets/image/post-seek.png") + '"',
     
      
      interval: 10000,

      banner: [
        {
          id: 10,
          name: "banner",
          pic: require("../../../assets/image/stoer-bannder01.jpg")
        }
      ],
      recommendType: [
        {
          id: 1,
          cate_name: "水土工程"
        },
        {
          id: 2,
          cate_name: "污水处理"
        },
        {
          id: 3,
          cate_name: "环境监测"
        },
        {
          id: 4,
          cate_name: "环保工程"
        }
      ],
      activeIndex: 1,
      catePostList: [],
      activeName: "personal",
      environment: {
        name: "环境保护",
        imgUrl: require("../../../assets/image/ad-banner-co1.jpg")
      },
      engineering: {
        name: "工程图纸",
        imgUrl: require("../../../assets/image/ad-banner-c02.jpg")
      },
      selectedlist: [
        {
          id: 1,
          url: require("../../../assets/image/ad-x-banner03.jpg")
        },
        {
          id: 2,
          url: require("../../../assets/image/ad-x-banner.jpg")
        },
        {
          id: 3,
          url: require("../../../assets/image/ad-x-banner02.jpg")
        },
        {
          id: 4,
          url: require("../../../assets/image/ad-x-banner04.jpg")
        }
      ],
      calleft: 0,
      viewAll: false,
    };
  },
  components: {
    hotGoods,
    Environment,
    Engineering,
    recommendList,
    countDown,
    goodsSeckill,
    groupBuying,
    storeHeader,
  },
  computed: {},
  beforeCreate() {
    this.fullscreenLoading = true;
  },
  created() {
    // this.move();
    this.fullscreenLoading = false;
    
  },
  methods: {
    getRecruitCate() {
      getRecruitCateTree().then(res => {
        // console.log('分类',JSON.stringify(res))
        // console.log(res.data)
        this.$set(this, "recruitCateList", res.data.slice(0, 7));
        this.$set(this, "cateList", res.data);
      });
    },
    onEnter() {
      this.selectClass = true;
      this.goodsIndex = 0;
    },
    onLeave() {
      // console.log('移出')
      this.selectClass = false;
      this.goodsIndex = null;
      this.viewAll = false;
      this.$set(this, "recruitCateList", this.cateList.slice(0, 7));
    },
    onEnterPostClass(e) {
      // console.log("选择职位类" + e);
      this.goodsIndex = e;
      if (e < 7) {
        this.height = -351
      } else {
        this.height = -(this.recruitCateList.length-e)*33-150
      }
    },
    onViewAll() {
      this.viewAll = true;
      this.$set(this, "recruitCateList", this.cateList);
    },
    onSearchGoods(val) {
      // this.$router.push({
      //   path: "/front/recruit/post/search",
      //   query: { id: val[0], post_id: val[1] }
      // });
    },
    onSearch() {
      // this.$router.push({
      //   path: "/front/recruit/post/search",
      //   query: { key: this.inputValue }
      // });
    },
    onRelevant() {
      // this.$router.push({
      //   path: "/front/recruit/post/search",
      //   query: { key: "饮用水工程" }
      // });
    },

    onOrgLogin() {
      this.$router.push({ path: "/account/org/login" });
    },
    // 跳转广告
    onAD() {
      this.$router.push({ path: "/ad" });
    },
    //
    onSelect(id) {
      this.catalogId = id;
    },
    // 推荐分类按钮
    onRecommendType(id) {
      this.activeIndex = id
    },
  }
};
</script>
<style lang="less" scoped >
@import "./store.less";
</style>
