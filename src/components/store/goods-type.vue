<template>
  <div class="goods-catalog" @mouseenter="onEnter" @mouseleave="onLeave">
    <div class="block">
      <ul class="goods-classify">
        <li
          v-for="(item,index) in recruitCateList"
          :key="index"
          class="classify-list"
          @mouseenter="onEnterPostClass(index)"
          :class="index == goodsIndex ? 'classify-select' : ''"
        >
          <span class="title">{{item.cate_name}}</span>
          <!-- :class="index == goodsIndex ? 'text-white' : 'text-gray'" -->
          <p class="children">
            <span
              v-for="(child,childIndex) in item.children.slice(0,2)"
              :key="childIndex"
              class="catalog-name"
            >{{child.cate_name}}</span>
          </p>
          <i class="el-icon-arrow-right"></i>
        </li>
      </ul>
      <div class="whole" @mouseenter="onViewAll" v-if="recruitCateList.length !== 0">{{viewAll ? "" : "显示全部分类"}}</div>
    </div>
    <!-- :class="viewAll && goodsIndex > 7 ? 'select-all':'no-select-all'" -->
    <!-- :class="viewAll ? 'select-all':'no-select-all'" -->
    <div
      class="goods-catalog-list"
      v-if="selectClass"
    >
      <ul class="box-card" shadow="never">
        <h4 class="title">{{recruitCateList[goodsIndex].cate_name}}</h4>
        <li
          class="goods-list"
          v-for="(item,index) in recruitCateList[goodsIndex].secondLevel"
          :key="index"
          :class="index !== recruitCateList[goodsIndex].secondLevel.length ?'':''"
        >
          <h4 class="name title-nowrap">{{item.cate_name}}</h4>
          <div class="hk-goods-list">
            <a
              v-for="(pops,index) in item.children"
              :key="index"
              class="post-name-list"
              @click="onSearchGoods(pops)"
            >{{pops.cate_name}}</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getRecruitCateTree } from "@/api/recruit";
export default {
  data() {
    return {
      viewAll: false,
      recruitCateList: [],
      selectClass: false,
      goodsIndex: null,
      cateList: [],
    };
  },
  created() {
    this.getRecruitCate();
  },
  methods: {
    getRecruitCate() {
      getRecruitCateTree().then((res) => {
        // console.log('分类',JSON.stringify(res))
        // console.log(res.data);
        this.$set(this, "recruitCateList", res.data.slice(0, 8));
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
      this.$set(this, "recruitCateList", this.cateList.slice(0, 8));
    },
    onEnterPostClass(e) {
      // console.log("选择职位类" + e);
      this.goodsIndex = e;
    },
    onViewAll() {
      this.viewAll = true;
      this.$set(this, "recruitCateList", this.cateList);
    },
    // 选择商品类型
    onSearchGoods(val){
      // console.log(val)
      this.selectClass = false
      this.$router.push({
        path: "/front/goods/search",
        query: { key: val.cate_name}
      });
      this.selectClass = false
    }
  },
};
</script>

<style lang="less" scoped>
@import './goods-type.less';
</style>