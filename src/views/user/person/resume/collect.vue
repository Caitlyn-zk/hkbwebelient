<template>
  <div class="hk-collect">
    <div class="hk-checkbox-all">
      <el-checkbox :indeterminate="isIndeterminate" v-model="ischackbox" @change="toggleSelection()">全选</el-checkbox>
    </div>
    <el-tabs v-model="activeName" class="hk-collect-tabs" @tab-click="handleClick">
      <el-tab-pane label="职位收藏" name="first" class="text-conter">
        <el-table
          ref="multipleTable"
          :data="postList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="40">
          </el-table-column>
          <el-table-column
            prop="name"
            label="职位名称"
            width="300"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="salary"
            label="薪资"
            width="180"
            :formatter="filterSalary"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="address"
            label="办公地点"
            width="300"
            :formatter="filterAddress"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="onDelCollect(scope.$index, scope.row)">取消收藏</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="margin-top:15px;" v-if="postList.length > list_rows ">
          <!-- <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="list_rows"
            layout="prev, next"
            >
          </el-pagination> -->
         <el-button-group class="button">
            <el-button type="primary" icon="el-icon-arrow-left" @click="onPreviousPage(1)">上一页</el-button>
            <el-button type="primary" @click="onNextPage(1)">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          </el-button-group>
        </div>
      </el-tab-pane>
      <el-tab-pane label="公司收藏" name="second">
        <el-table
          ref="companyList"
          :data="postList"
          tooltip-effect="dark"
          style="width: 100%"
          empty-text=""
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="40">
          </el-table-column>
          <el-table-column
            prop="name"
            label="公司名称"
            width="300"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="address"
            label="公司地址"
            width="300"
            :formatter="filterAddress"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="onDelCollect(scope.$index, scope.row)">取消收藏</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="margin-top:15px;" v-if="postList.length > list_rows">
          <el-button-group class="button">
            <el-button type="primary" icon="el-icon-arrow-left" @click="onPreviousPage(2)">上一页</el-button>
            <el-button type="primary" @click="onNextPage(2)">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          </el-button-group>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {delCollection, postCollectionList} from '@/api/recruit'
import {salary} from '@/config/constant'
export default {
  data() {
    return {
      activeName: 'first',
      ischackbox: false,
      selectArrCloth: [],
      isIndeterminate: false,
      postList: [],
      collection_id: '',
      salaryList: salary,
      // 第几页
      // page: 1,
      // 一页几条
      currentPage: 1, // 当前页码
      list_rows: 5 // 每页的数据条数
    }
  },
  created () {
    this.collectList()
  },
  mounted () {
    
  },
  methods: {
    collectList(val) {
      let that = this
      let requestParameters = {}
      if (this.activeName == 'first') {
        requestParameters = {
          type: 1,
          page: that.currentPage,
          list_rows: that.list_rows
        }
        console.log('first')
        this.getCollectList(requestParameters)
      } else {
        requestParameters = {
          type: 2,
          page: that.currentPage,
          list_rows: that.list_rows
        }
        console.log('second')
        this.getCollectList(requestParameters)
      }
      // console.log(requestParameters)
    },
    getCollectList (requestParameters) {
      console.log(requestParameters)
      let that = this
      postCollectionList(requestParameters).then(res => {
        console.log(1213412)
        if (res.status == 200) {
          that.postList = res.data
          console.log('请求成功',JSON.stringify(res.data));
          console.log(res.data.length)
        }
      }).catch(res => {
        this.$message({
          message: res.msg,
          type: 'error',
          showClose: true,
          duration: 3000
        })
      })
    },
    handleSelectionChange(val) {
      this.selectArrCloth = val
      let str = ""
      val.forEach((e) => {
        str += e.id + ','
      })
      this.collection_id = str.substring(0, str.length -1)
      let checkedCount = val.length
      this.ischackbox = checkedCount === this.postList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.postList.length
    },
    onDelCollect(index, row) {
      console.log("列参数",JSON.stringify(row.collection_id))
      var collect_id = row.collection_id+''
      // let that = this
      // if (that.collection_id === "") {
      //   that.collection_id = row.id.toString()
      // }
      // console.log("id",collection_id)
      delCollection(collect_id).then(res => {
        if (res.status == 200) {
          this.postList.splice(index, 1)
          this.$message({
            message: res.msg,
            type: 'success',
            showClose: true,
            duration: 3000
          })
        } else {
          this.$message({
            message: res.msg,
            type: 'success',
            showClose: true,
            duration: 3000
          })
        }
      }).catch(res => {
        this.$message({
          message: res.msg,
          type: 'error',
          showClose: true,
          duration: 3000
        })
      })
    },

    toggleSelection() {
      let rows = this.postList
      if (this.activeName == 'first') {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleAllSelection(row)
          });
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      } else {
        if (rows) {
          rows.forEach(row => {
            this.$refs.companyList.toggleAllSelection(row)
          });
        } else {
          this.$refs.companyList.clearSelection()
        }
      }
      
    },
    filterSalary(row, column) {
      let salary = ''
      this.salaryList.map( item => {
        if (item.value === row.salary) {
          salary = item.label
        }
      })
      return salary;
    },
    filterAddress (row, column) {
      // console.log(area1_name)
      let address = row.area1_name + row.area2_name + row.area3_name
      return address;
    },
    // 切换
    handleClick(){
      this.currentPage = 1
    },
    // 上一页
    onPreviousPage(e){
      if (this.currentPage >1) {
        this.currentPage = this.currentPage - 1
        let requestParameters = {
          type: e,
          page: this.currentPage,
          list_rows: this.list_rows
        }
        this.getCollectList(requestParameters)
      }
    },
    // 下一页
    onNextPage(e){
      if (this.postList.length > 0) {
        this.currentPage = this.currentPage + 1
        let requestParameters = {
          type: e,
          page: this.currentPage,
          list_rows: this.list_rows
        }
        this.getCollectList(requestParameters)
      }
    }
  },
  watch: {
    selectArrCloth() {
      if (this.selectArrCloth.length == this.postList.length) {
        this.ischackbox = true
      } else {
        this.ischackbox = false
      }
      let selectArr = 0
      if (this.selectArrCloth.length > 0) {
        for (let item in this.selectArrCloth) {
          selectArr = item
        }
        this.ischackbox = true
      } else {
        this.ischackbox = false
      }
    },
    activeName () {
      this.collectList()
    }
  }
}
</script>

<style lang="less">
@import './collect.less';
</style>