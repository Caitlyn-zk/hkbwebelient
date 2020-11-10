<template>
  <div class="search">
    <storeHeader></storeHeader>
    <div class="content">
      <ul class="search-smail-nav padding-t-15 padding-b-8">
        <li class="text-line font-12">
          首页
          <i class="el-icon-arrow-right"></i>
        </li>
        <li class="text-line font-12" v-if="parentType !== ''">
          {{parentType}}
          <i class="el-icon-arrow-right"></i>
        </li>
        <li class="text-blacks font-12 goods-type-moer">
          {{subsetType}}
          <el-button @click="onDelSubsetType" class="goods-type-del el-icon-close"></el-button>
        </li>
      </ul>
      <!-- 搜索类别 -->
      <searchType @searchType="onSecarchType" @searchCheck="searchCheck"></searchType>
      <div class="goods-content padding-b-15">
        <div class="recommend-goods">
          <p class="recommend-title padding-b-15">推荐新品</p>
          <ul class="recommend-list">
            <li class="recommend-goods-list hk-cursor" v-for="item in 5" :key="item" @click="goodsDetail">
              <div class="list-goods-img">
                <img src="../../../assets/image/stoer-goods01.png" alt />
              </div>
              <p class="goods-name title-nowrap-tow margin-t-15 margin-b-5">
                沼气收集利用沼气工程配沼
                沼气收集利用沼气工程配沼
                沼气收集利用沼气工程配沼
                气工程图纸沼气沼
              </p>
              <p class="goods-money-cx">
                <span class="font-14 money title-nowrap">￥45.00</span>
                <span class="text-line sales-volume title-nowrap">
                  销量：
                  <span class="sales-volume-mun">123</span>
                </span>
              </p>
            </li>
          </ul>
        </div>
        <div class="goods-list">
          <div class="clasify-content-child">
            <ul class="clasify-list">
              <li
                class="clasify-name"
                :class="sortOrderIndex == 0 ? 'select':'no'"
                @click="sortByPrice(0)"
              >
                <span>综合</span>
                <span class="iconfont icon-xia font-12"></span>
              </li>
              <li
                class="clasify-name"
                :class="sortOrderIndex == 2 &&  nows === true ? 'select':'no'"
                @click="sortByPrice(2)"
              >
                <span>新品</span>
                <span class="iconfont icon-xia font-12"></span>
              </li>
              <li
                class="clasify-name"
                :class="sortOrderIndex == 1 && popularity !== 0 ? 'select':'no'"
                @click="sortByPrice(1)"
              >
                <span>销量</span>
                <img height="10" src="../../../assets/image/icon/horn.png" v-if="popularity === 0" />
                <img
                  height="10"
                  src="../../../assets/image/icon/up-icon.png"
                  v-if="popularity === 1"
                />
                <img
                  height="10"
                  src="../../../assets/image/icon/down-icon.png"
                  v-if="popularity === 2"
                />
              </li>
              <li
                class="clasify-name"
                :class="sortOrderIndex == 3 && price !== 0 ? 'select':'no'"
                @click="sortByPrice(3)"
              >
                <span>价格</span>
                <img height="10" src="../../../assets/image/icon/horn.png" v-if="price === 0" />
                <img height="10" src="../../../assets/image/icon/up-icon.png" v-if="price === 1" />
                <img height="10" src="../../../assets/image/icon/down-icon.png" v-if="price === 2" />
              </li>
              <li class="clasify-input margin-l-22">
                <input type="text" class="clasify-input-bar padding-l-5" placeholder="￥" name id />
                <span class="el-icon-minus text-line font-12"></span>
                <input type="text" class="clasify-input-bar padding-l-5" placeholder="￥" name id />
                <el-button class="clasify-button margin-l-13">确定</el-button>
              </li>
            </ul>
            <div class="statistics">
              共
              <span class="totsl-rad">{{total}}</span>件商品
            </div>
          </div>
          <ul class="goods-list-bar">
            <goodsList v-for="item in 20" :key="item"></goodsList>
          </ul>
          <!-- <div class="text-r margin-t-15 search-el-pager">
            <el-pagination
              @size-change="headleSizeChange"
              @current-change="headleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="20"
              layout="prev, pager, next"
              :total="total"
            ></el-pagination>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import storeHeader from "@/components/store/header.vue";
import searchType from "@/components/store/search-type.vue";
import goodsList from "@/components/store/goods-list.vue";
export default {
  data() {
    return {
      sortOrderIndex: 0,
      price: 0,
      popularity: 0,
      nows: false,
      where: {
        page: 1,
        cid: 0,
        limit: 16,
        sid: 0, //二级分类id
        news: 0, // 是否为新品 0不是新品 1表示新品
        priceOrder: "", // 价格
        salesOrder: "", // 销量
      },
      parentType: "",
      subsetType: "",
      total: 2000, //显示总的记录数，
      // currentPage: 1, //当前的页码
      // pageSize: 20, //每页显示10条数据
    };
  },
  created () {
    this.parentType = this.$route.query.key
  },
  watch: {
    $route: "getPath",
  },
  components: {
    storeHeader,
    searchType,
    goodsList,
  },
  methods: {
    // 排序
    sortByPrice(e) {
      if (e == 0) {
        this.nows = false;
        this.where.page = 1;
        this.where.news = "";
      } else if (e == 1) {
        if (this.popularity === 0) {
          this.popularity = 1;
          this.where.salesOrder = "desc";
        } else if (this.popularity === 1) {
          this.popularity = 2;
          this.where.salesOrder = "asc";
        } else {
          this.popularity = 0;
          this.where.salesOrder = "";
        }
      } else if (e == 2) {
        this.nows = !this.nows;
        this.where.news = this.nows ? 1 : 0;
      } else if (e == 3) {
        if (this.price == 0) {
          this.price = 1;
          this.where.priceOrder = "asc";
        } else if (this.price == 1) {
          this.price = 2;
          this.where.priceOrder = "desc";
        } else if (this.price == 2) {
          this.price = 0;
          this.where.priceOrder = "";
        }
      }
      this.sortOrderIndex = e;
      this.currentPage = 1;
    },
    onSecarchType(val) {
      this.subsetType = val.title;
    },
    // 多选
    searchCheck(val) {
      this.subsetType = val.map((item) => item.title).join(",");
      // console.log(this.content)
    },
    getPath() {
      // console.log(this.$route.query.key);
      this.parentType = this.$route.query.key
    },
    goodsDetail () {
      this.$router.push({
        path: '/front/goods/detail'
      })
    },
    onDelSubsetType () {
      // console.log('点击删掉按钮')
      this.subsetType = ''
    }
    // 分页
    // handleDelete(id) {
    //   alert(id);
    // },
    // 当每页显示条数改变后，被触发、val最新的每页显示条数
    // headleSizeChange(val) {
    //   this.pageSize = val;
    // },
    // 当页码改变后，被触发 ，val是最新的页码
    // headleCurrentChange(val) {
    //   this.currentPage = val;
    // }
  },
};
</script>

<style lang="less" scoped>
@import "./search.less";
</style>