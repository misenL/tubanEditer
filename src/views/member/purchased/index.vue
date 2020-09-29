<template>
  <div>
    <div class="content">
      <!-- 头部文字 -->
      <div class="top__text">
        <span style="font-size: 18px">已购模板 · </span>
        <span style="color:#9d9d9d">共{{ total }}个模板</span>
      </div>
      <!--顶部筛选栏-->
      <div>
        排序：
        <el-select v-model="sort_by" placeholder="请选择">
          <el-option v-for="item in sortList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <!--列表-->
      <div class="template">
        <div v-for="(item,index) in list" :key="index" class="template-list template__transition" @click="handleTemplate(item)" @mouseenter="handleMouseenter(item)" @mouseleave="handleMouseleave(item)">
          <div style="position: relative">
            <el-image fit="fit" :src="item.product.thumbnail" />
            <div :ref="item.id" class="like" style="display: none" @click="handleCancelKeep(item)">
              <i class="iconfont iconshoucang font-30px color-gray" :class="item.keep ? 'color-red' : 'color-gray'" />
            </div>
          </div>
          <div class="info">
            <div class="text-hidden title1">{{ item.product.title }}</div>
            <div class="title2 mt-10px">
              <span>尺寸</span>
              <span class="ml-8px">{{ item.product.size }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--分页-->
    <el-pagination
      background
      class="pagination"
      layout="prev, pager, next"
      :total="total"
      :page-size="per_page"
      :current-page="page"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import config from './mixins/config.js'
export default {
  name: 'Index', // 已购模板
  mixins: [config],
  data() {
    return {
      list: [],
      total: 0, // 总数
      page: 1, // 当前页
      per_page: 25 // 每页显示多少
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.getPurchasedList()
    },

    // 已购列表
    async getPurchasedList() {
      const resources = [{ name: 'payTemplate' }]
      const params = {
        user_id: this.$store.state.user.userInfo.id
      }
      const methods = 'get'
      const res = await this.api.restful({ resources, params, methods })
      console.log('已购列表', res)
      if (this.$isSucc(res)) {
        this.total = res.meta.pagination.total
        this.list = res.data
      }
    },

    // 分页
    handleCurrentChange(page) {
      this.page = page
      this.getPurchasedList()
    },

    // 鼠标进入
    handleMouseenter(item) {
      this.$refs[item.id][0].style.display = 'block'
    },

    // 鼠标离开
    handleMouseleave(item) {
      for (const key in this.$refs) {
        if (this.list.filter(item => item.id == key).length) {
          this.$refs[key][0].style.display = 'none'
        }
      }
    },

    // 取消收藏
    async handleCancelKeep(item) {
      if (item.keep) {
        const resources = [{ name: 'keep', id: item.keep.id }]
        const method = 'delete'
        const res = await this.api.restful({ resources, method })
        if (this.$isSucc(res)) {
          this.$message.success('已取消收藏')
          this.initData()
        }
      } else {
        const resources = [{ name: 'keep' }]
        const method = 'post'
        const data = {
          product_id: item.product.id,
          user_id: this.$store.state.user.userInfo.id,
          type: 0
        }
        const res = await this.api.restful({ resources, method, data })
        if (this.$isSucc(res)) {
          this.$message.success('已加入收藏')
          this.initData()
        }
      }
    },

    // 点击模板
    handleTemplate(item) {
      window.open(`/detail?id=${item.product_id}&type=0`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .content{
    height: calc(100vh - 150px);
    overflow-y: auto;
    .top__text {
      margin-bottom: 30px;
      display: flex;
      align-items: center;
    }
    .template{
      background: #f2f2f2;
      margin: 0 auto;
      display: flex;
      flex-flow:row wrap;
      justify-content: flex-start;
      position: relative;
      z-index: 0;
      .like{
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius: 8px;
        background: white;
        z-index: 100;
        top: 10px;
        right: 10px;
        text-align: center;
        line-height: 40px;
      }
      .template-list{
        width: 221px;
        margin-right: 12px;
        margin-top: 20px;
        cursor: pointer;
        .info{
          margin-top: -16px;
          background: white;
          padding: 10px;
          .title1{
            font-size: 14px;
            color: #5e5d5d;
          }
          .title2{
            font-size: 12px;
            color: #b3b3b3;
            display: inline-block;
            line-height: 1;
          }
        }
      }
    }
  }
  .pagination{
    text-align: end;
    margin-top: 20px;
  }
</style>
