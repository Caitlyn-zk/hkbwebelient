<template>
  <div class="" v-loading.fullscreen.lock="fullscreenLoading">
      <!-- 轮播图 -->
    <div class="hk-el-carousel">
      <el-carousel
        height="160px"
        arrow="never"
        :interval="interval">
        <!-- v-for="item in dataimage" :key="item.id" -->
        <el-carousel-item >
          <div v-for="(item,index) in dataimage" :key="index">
            <!-- item.pic ||  -->
            <img style="width=100%;" src="/static/img/banner01.jpg" alt="item.id" @click="onAD" />
            <!-- <img style="width=100%;" :src="item.pic" alt="item.id"/> -->
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 中间内容 -->
    <div class="content">
      <!-- 搜索栏 -->
      <div class="hk-content-title">
        <el-input placeholder="请输入你想要的内容搜索" v-model="searchinput" @keyup.enter.native="onSearchEnterFun" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="项目">
            <el-option label="项目" value="1"></el-option>
            <el-option label="公示" value="2"></el-option>
            <el-option label="招聘" value="3"></el-option>
            <el-option label="商城" value="4"></el-option>
            <el-option label="学院" value="5"></el-option>
          </el-select>
          <el-button slot="append" class="hk-search-but" @click="onSeatch">搜索</el-button>
        </el-input>
      </div>
      <!-- 内容 -->
      <div class="hk-content-list clearfix padding-b-50">
        <!-- 列表1项目公示 -->
        <div>
          <!-- 左边更多 -->
          <ul class="fl hk-list-left padding-t-68 padding-lr-20">
            <li class="hk-list-title">环评公示</li>
            <li class="hk-list-newbar text-white-2 text-center">最新最全</li>
            <li><el-button type="" class="" @click="onProject(1)">查看更多</el-button></li>
          </ul>
          <!-- 右边项目 -->
          <ul class="fl hk-list-add">
            <li class="hk-right-list shows" v-for="item in gsxm" :key="item.id">
              <div class="hk-title-bar public-title-bar title-nowrap" :class="item !== 0 ? '' : 'bg'" @click="onNoticeDetail(item)">{{item.name}}</div>
              <div class="clearfix">
                <div class="fr text-line hk-list-area-name" :class="item !== 0 ? '' : 'bg'">{{item.area2_name === "市辖区" ? item.area1_name: item.area2_name}}</div>
                <div class="fl hk-list-location" :class="item !== 0 ? '' : 'bg'">
                  <span class="text-line">{{item.last_time}}</span>
                </div>
              </div>
            </li>
          </ul>
          <!-- 换一批 -->
          <div class="hk-more">
            <el-button class="" @click="clickGS">换一批</el-button>
          </div>
        </div>
        <!-- 最新项目 -->
        <div>
          <!-- 左边更多 -->
          <ul class="fl hk-list-left padding-t-40 padding-lr-20">
            <li class="hk-list-title">最新项目</li>
            <li class="hk-list-newbar text-white-2"><span class="text-center" @click="onRecommendProject('环保设备图纸饮用水工程')">环保设备图纸饮用水工程</span></li>
            <li><el-button type="" class="" @click="onProject">查看更多</el-button></li>
            <li><el-button type="" class="hk-proje-button-bar" @click="onAddProject">发布项目</el-button></li>
          </ul>
          <!-- 右边zbxm项目列表 -->
          <ProjectList :zbxm="zbxm"></ProjectList>
          <!-- 换一批 -->
          <div class="hk-more ">
            <el-button class="" @click="clickZB">换一批</el-button>
          </div>
        </div>
        <!-- 商城列表2 -->
        <div>
          <ul class="fl hk-list-left padding-t-60 padding-lr-20">
            <li class="hk-list-title">商城</li>
            <li class="hk-list-newbar text-white-2 text-center">饮用水工程环保监测</li>
            <li><el-button type="" class="">查看更多</el-button></li>
          </ul>
          <!-- 右边项目 -->
          <ul class="fl hk-list-add">
            <li class="hk-right-mall-list shows" v-for="item in 3" :key="item">
              <img src="../../assets/image/group_01.png"/>
              <div class="padding-lr-20 clearfix">
                <span class="fl hk-mall-completed margin-tb-25 public-title-bar title-nowrap">竣工设计图</span>
                <span class="fr public-post-salary line-70">￥14w-15w</span>
              </div>
            </li>
          </ul>
          <!-- 换一批 -->
          <div class="hk-more">
            <el-button class="" @click="clickZB">换一批</el-button>
          </div>
        </div>
        <!-- 列表三 -->
        <div>
          <ul class="fl hk-list-left padding-t-60 padding-lr-20">
            <li class="hk-list-title text-center" >知识<br/>武装自己</li>
            <!-- <li class="hk-list-newbar text-white-2">项目公示最新最全</li> -->
            <li><el-button type="" class="">查看更多</el-button></li>
          </ul>
          <ul class="fl hk-questions">
            <li class="hk-whit-wasp line-40 public-title-bar" v-for="item in 6" :key="item">【问答】关于今年考环评师应该怎么准备</li>
            <li class="hk-whit-wasp line-40 public-title-bar">......</li>
            <div class="hk-button-querst">
              <el-button class="hk-but-questions " type="">提问</el-button>
              <el-button class="hk-but-questions hk-write" type="">写文章</el-button>
              <el-button class="hk-but-questions hk-waiting " type="">等你来答</el-button>
            </div>
          </ul>
        </div>
        <!-- 环保职位 -->
        <div class="">
          <div class="post-muster clearfix">
            <ul class="fl hk-list-left margin-t-10 padding-t-30 padding-lr-20">
              <li class="hk-list-title">环保职位</li>
              <li class="hk-list-newbar text-white-2 text-center" @click="onRecommendPost('环评工程师')"><span>环评工程师</span></li>
              <li class="hk-list-newbar text-white-2 text-center" @click="onRecommendPost('水环境工程师')"><span>水环境工程师</span></li>
              <li class="hk-list-newbar text-white-2 text-center" @click="onRecommendPost('土壤工程师')"><span>土壤工程师</span></li>
              <li class="hk-list-newbar text-white-2 text-center" @click="onRecommendPost('环境监测技术员')"><span>环境监测技术员</span></li>
              <li><el-button type="" class="" @click="onPost">查看更多</el-button></li>
            </ul>
            <div class=" post-list" >
              <ul  class="clearfix">
                <div class="hk-list-recruit-bar fl" v-for="(item, index) in post" :key="index">
                  <div class="post-list-content shows">
                    <div class=" clearfix">
                      <div class="fr title-nowrap hk-post-salary" :class="item !== 0 ? '' : 'bg'">
                        <span class="public-post-salary ">{{item.min_salary | onSalary}}{{item.min_salary !== undefined ? '-' : ''}}</span>
                        <span class="public-post-salary">{{item.max_salary | onSalary}}</span>
                      </div>
                      <span class="fl hk-mall-completed margin-tb-20 public-title-bar title-nowrap hk-cursor" :class="item !== 0 ? '' : 'bg'" @click="onPostDetail(item)">{{item.name}}</span>
                    </div>
                    <div class="hk-requirement margin-b-20" :class="item !== 0 ? '' : 'bg'">
                      <!-- {{item.area2_name === "市辖区" ? item.area1_name: item.area2_name}} -->
                      <span class="margin-r-15" >{{item.area2_name}}</span>
                      <span class="margin-r-15">{{item.work_life | onWorkLife}}</span>
                      <span class="margin-r-15">{{item.min_edu | onMinEdu}}</span>
                      <span class="margin-r-15" >{{item.work_type | onWorkType}}</span>
                    </div>
                    <div class="hk-company">
                      <p :class="item !== 0 ? '' : 'bg'">{{item.org_name}}</p>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          </div>
          <div class="hk-more post-buton">
            <el-button class="" @click="clickPost">换一批</el-button>
          </div>
        </div>
      </div>
    </div>
    <footer></footer>
  </div>
</template>

<script>
import {getHomeData, getGSData, getZbData, getPostData} from '@/api/public'
import {fundRang, mainSalary, workType, workLife,minEdu} from '@/config/constant'
import utils from '@/utils/index.js'
import { mapMutations, mapGetters } from "vuex";
// import cookie from '@/utils/store/cookie'
import ProjectList from "@/components/project/project-list"
export default {
  // name: 'banner',
  name: 'Testkeepalive',
  filters: {
    onFundRang (value) {
      var obj = utils.findObj(fundRang, value)
      return obj.label
    },
    onSalary (value) {
      var obj = utils.findObj(mainSalary, value)
      return obj.label
    },
    onWorkLife (value) {
      var obj = utils.findObj(workLife, value)
      return obj.label
    },
    onWorkType (value) {
      var obj = utils.findObj(workType, value)
      return obj.label
    },
    onMinEdu(value) {
      var obj = utils.findObj(minEdu, value);
      return obj.label;
    },
  },
  data () {
    return {
      includedComponents: "test-keep-alive",
      interval: 10000,
      login:true,
      fullscreenLoading: true,
      fundRang: fundRang,
      salary: mainSalary,
      workType: workType,
      workLife: workLife,
      searchinput: '',
      select: '',
      logoUrl: '',
      newGoodsBananr: '',
      // api,
      currentDate: new Date(),
      gSPage: 1,
      zBPage: 1,
      postPage: 1,
      dataimage: [{
        id: 10,
        name: 'banner',
        pic: '/static/img/banner01.jpg'
      }],
      zbxm: [0,0,0,0,0,0,0,0,0],
      post: [0,0,0,0,0,0],
      gsxm: [0,0,0,0,0,0,0,0,0],
      RecentBrowsingSalary: mainSalary,
    }
  },
  components: {
    ProjectList
  },
  beforeCreate () {
    this.fullscreenLoading = true
  },
  created () {
    this.fullscreenLoading = false
    this.getIndexData()
    //初始化职位访问记录
    this.INIT_POST_RECORD();
  },
  computed: {
    ...mapGetters({
      isLogin: 'isLogin',
    })
  },
  methods: {
    ...mapMutations(["INIT_POST_RECORD", "ADD_POST_RECORD"]),
    getIndexData () {
      let that = this
      getHomeData().then(res => {
        that.fullscreenLoading = true
        if (res.status === 200) {
          // console.log("首页数据")
          // 轮播图
          localStorage.setItem('front', res)
          if (res.data.banner.length > 0) {
            this.dataimage = res.data.banner
          }

          // 公示项目
          this.$set(that, 'gsxm', res.data.gsxm)
          // 招标项目
          this.$set(that, 'zbxm', res.data.zbxm.slice(0, 9))
          // 职位项目
          this.$set(that, 'post', res.data.post)
          this.logoUrl = res.data.logoUrl
          this.newGoodsBananr = res.data.newGoodsBananr
          this.fullscreenLoading = false
        } else {
          // console.log('错误')
        }
        this.fullscreenLoading = false
      })
    },
    // 获取更新数据
    getGSMoreData () {
      let that = this
      getGSData(that.gSPage).then(res => {
        // let that = this
        // 公示项目
        if (res.data.length === 0) {
          that.gSPage = 1
          // that.clickGS()
        } else {
          that.$set(that, 'gsxm', res.data)
        }
      })
    },
    getZBMoreData () {
      let that = this
      getZbData(that.zBPage).then(res => {
        // let that = this
        // 招标项目
        if (res.data.length === 0) {
          that.zBPage = 1
          // that.clickZB()
        } else {
          that.$set(that, 'zbxm', res.data.slice(0, 9))
        }
      })
    },
    getPostMoreData () {
      let that = this
      getPostData(that.postPage).then(res => {
        // let that = this
        // 职位项目
        if (res.data.length === 0) {
          that.postPage = 1
          // that.clickPost()
        } else {
          that.$set(that, 'post', res.data.slice(0, 6))
        }
      })
    },
    // 点击项目公示换一批事件
    clickGS () {
      if (this.gsxm.length / 9 === this.gSPage) {
        this.gSPage = this.gSPage + 1
        this.getGSMoreData()
      } else {
        this.gSPage = 1
        this.getGSMoreData()
      }
      
    },
    // 点击招标换一批事件
    clickZB () {
      if (this.zbxm.length / 9 === this.zBPage) {
        this.zBPage = this.zBPage + 1
        this.getZBMoreData()
      } else {
        this.zBPage = 1
        this.getZBMoreData()
      }
      
    },
    // 跳转公示项目详情
    onNoticeDetail (val) {
      // console.log(val.id)
      if(val !== 0)
      {
        this.$router.push({ path: "/front/project/noticedetail",query: {id: val.id}});
      }
    },
    // 点击职位换一批事件
    clickPost () {
      if (this.post.length / 6 === this.postPage) {
        this.postPage = this.postPage + 1
        this.getPostMoreData()
      } else {
        this.postPage = 1
        this.getPostMoreData()
      }
    },
    /**
     * 跳转到项目搜索列表
     */
    onProject (e) {
      if (e) {
        this.$router.push({ path: "/front/project/search", query: { type: e} });
      } else{
        this.$router.push({path: '/front/project/search'})
      }
    },
    /**
     * 跳转传参到项目搜索列表
     */
    onRecommendProject (val) {
      this.$router.push({path: '/front/project/search', query: {key: val}})
    },
    /**
     * 跳转传参到职位搜索列表
     */
    onRecommendPost (name) {
      this.$router.push({path: '/front/recruit/post/search', query: {key: name}})
    },
    /**
     * 跳转到职位搜索列表
     */
    onPost () {
      this.$router.push({path: '/front/recruit/post/search'})
    },
    // 跳转职位详情
    onPostDetail(val) {
      // console.log(val);
      let max_salary = null, min_salary = null
      this.RecentBrowsingSalary.forEach(item => {
        if (item.value === val.min_salary) {
          return min_salary = item.label
        }
        if (item.value === val.max_salary) {
          return max_salary = item.label
        }
      })
      // console.log(min_salary +'-' + max_salary)
      this.ADD_POST_RECORD({
        post_id: val.id,
        org_name: "贵州活性炭有限公司",
        post_name: val.name,
        salary: min_salary +'-' + max_salary
      });
      this.$router.push({path:'/front/recruit/post/detail',query:{post_id:val.id}});
    },
    /**
     * 跳转到发布职位
     */
    onAddProject () {
      this.$router.push({path:'/user/org/project/add',query:{proid:0}})
    },
    onSeatch(){
      this.onJump()
    },
    onJump(){
      if(this.select == 1 || this.select == ""){
        // 项目中心
        this.$router.push({path:'/front/project/search',query:{key:this.searchinput}})
      } else if(this.select == 2){
        // 公示
        this.$router.push({path:'front/project/search',query:{key:this.searchinput}})
      } else if(this.select == 3){
        // 招聘
        this.$router.push({path:'/front/recruit/post/search',query:{key:this.searchinput}})
      } else if(this.select == 4){
        // 商城
        this.$router.push({path:'/front/store',query:{key:this.searchinput}})
      } else if(this.select == 5){
        // 学院
        this.$router.push({path:'/front/college/home/recommend',query:{key:this.searchinput}})
      }if(this.select == 1 || this.select == ""){
        // 项目中心
        this.$router.push({path:'/front/project/search',query:{key:this.searchinput}})
      } else if(this.select == 2){
        // 公示
        this.$router.push({path:'front/project/search',query:{key:this.searchinput}})
      } else if(this.select == 3){
        // 招聘
        this.$router.push({path:'/front/recruit/post/search',query:{key:this.searchinput}})
      } else if(this.select == 4){
        // 商城
        this.$router.push({path:'/front/store',query:{key:this.searchinput}})
      } else if(this.select == 5){
        // 学院
        this.$router.push({path:'/front/college/recommend',query:{key:this.searchinput}})
      }
    },
    onSearchEnterFun(e){
      var keyCode = window.event? e.keyCode:e.which;
      if(keyCode == 13){
        this.onJump()
      }
    },
    // 跳转广告
    onAD(){
      this.$router.push({path:'/ad'})
    }
  }
}
</script>
<style lang="less" scoped>
  @import './index.less';
</style>
