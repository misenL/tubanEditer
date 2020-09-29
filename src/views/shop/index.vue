<template>
  <div class="shop layout">
    <div class="header">
      <div class="des-headurl">
        <img :src="$route.query.user_id !== 'null' ? info.avatar : 'http://192.168.2.138:9588/static/img/logo.67d34b0d.jpg'" alt="">
      </div>
      <div class="des-name">{{ $route.query.user_id !== 'null' ? info.name : '后台自营' }}</div>
      <div class="des-level2">{{ $route.query.user_id !== 'null' ? '设计师' : '后台直营' }}</div>
      <div class="all-count1">模板数</div>
      <div class="all-count2">{{ total }}</div>
    </div>

    <!--列表-->
    <div class="design-list">
      <ul>
        <li v-for="(item,index) in list" :key="index" class="pointer" @click="handleEditTemplate(item)" @mouseenter="handleMouseenter(item)" @mouseleave="handleMouseleave(item)">
          <div style="position: relative">
            <img :src="item.thumbnail">
            <div :ref="'template_' + item.id" class="like" style="display: none" @click.stop="handleCancelKeep(item)">
              <i class="iconfont iconshoucang font-30px color-gray" :class="item.keep.length ? 'color-red' : 'color-gray'" />
            </div>
          </div>
          <div class="list-info">
            <div>{{ item.title }}</div>
            <div>{{ item.size }} px</div>
          </div>
        </li>
      </ul>
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
export default {
  name: 'Index',
  data() {
    return {
      info: {},
      list: [],
      total: 0,
      page: 1,
      per_page: 20
    }
  },
  created() {
    document.getElementById('layout__view').style.top = 0
    this.initData()
  },
  methods: {
    // 页面初始化
    initData() {
      this.getShopInfo()
      this.getList()
    },

    // 获取设计师信息
    async getShopInfo() {
      if (this.$route.query.user_id !== 'null') {
        const resources = [{ name: 'user', id: this.$route.query.user_id }]
        const params = { include: 'designer' }
        const res = await this.api.restful({ resources, params })
        if (this.$isSucc(res)) {
          this.info = res.data
        }
      }
    },

    // 获取设计师作品列表
    async getList() {
      // 非后台管理
      if (this.$route.query.user_id !== 'null') {
        const resources = [{ name: 'product' }]
        const params = {
          user_id: this.$route.query.user_id,
          page: this.page,
          per_page: this.per_page,
          sort_by: 0
        }
        const res = await this.api.restful({ resources, params, loading: false })
        if (this.$isSucc(res)) {
          this.list = res.data
          this.total = res.meta.pagination.total
        }
      }

      // 后台管理
      if (this.$route.query.user_id === 'null') {
        const resources = [{ name: 'adminIndex' }]
        const res = await this.api.restful({ resources, loading: false })
        if (this.$isSucc(res)) {
          this.list = res.data
          this.total = res.meta.pagination.total
        }
      }
    },

    // 点击模板
    handleEditTemplate(item) {
      window.open(`/detail?id=${item.id}&type=0`)
    },

    // 分页
    handleCurrentChange(page) {
      this.page = page
      this.getList()
    },

    // 鼠标进入
    handleMouseenter(item) {
      this.$refs['template_' + item.id][0].style.display = 'block'
    },

    // 鼠标离开
    handleMouseleave(item) {
      console.log(item)
      for (const key in this.$refs) {
        if (this.list.filter(item => 'template_' + item.id == key).length) {
          this.$refs[key][0].style.display = 'none'
        }
      }
    },

    // 取消收藏
    async handleCancelKeep(item) {
      if (item.keep.length) {
        const resources = [{ name: 'keep', id: item.keep[0].id }]
        const method = 'delete'
        const res = await this.api.restful({ resources, method, loading: false })
        if (this.$isSucc(res)) {
          this.$message.success('已取消收藏')
          this.getList()
        }
      } else {
        const resources = [{ name: 'keep' }]
        const method = 'post'
        const data = {
          product_id: item.id,
          user_id: this.$store.state.user.userInfo.id,
          type: 0
        }
        const res = await this.api.restful({ resources, method, data, loading: false })
        if (this.$isSucc(res)) {
          this.$message.success('已加入收藏')
          this.getList()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  body{
    font-size: 0;
  }
.shop{
  .header{
    margin: 50px auto;
    background: #fff;
    box-sizing: border-box;
    padding-left: 204px;
    padding-right: 25px;
    height: 143px;
    /*display: flex;*/
    /*justify-content: space-between;*/
    position: relative;
    .des-headurl{
      width: 134px;
      height: 134px;
      position: absolute;
      top: -25px;
      left: 50px;
      img{
        display: block;
        max-width: 134px;
        max-height: 134px;
      }
    }
    .des-name{
      font-size: 18px;
      color: #1b1b1b;
      line-height: 1;
      padding-top: 20px;
    }
    .des-level2{
      margin-top: 5px;
      min-width: 60px;
      max-width: 90px;
      height: 20px;
      background: #a9a9a9;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      color: #f2f2f2;
    }
    .all-count1{
      margin-top: 10px;
      font-size: 14px;
      color: #7e7e7e;
      line-height: 1;
    }
    .all-count2{
      font-size: 18px;
      color: #1b1b1b;
      line-height: 1;
      font-family: Arial;
      margin-top: 11px;
    }
  }
  .design-list{
    width: 1190px;
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
    ul{
      padding: 0;
      webkit-column-width: auto;
      -moz-column-width: auto;
      column-width: auto;
      -webkit-column-count: 5;
      -moz-column-count: 5;
      column-count: 5;
      -webkit-column-gap: 12px;
      -moz-column-gap: 12px;
      column-gap: 12px;
      .created{
        .icon{
          width: 100%;
          min-height: 1.2rem;
          display: flex;
          justify-content: center;
          background: #f8f8f8;
          font-size: 50px;
          align-items: center;
          color: #b3b3b3;
        }
      }
      li{
        -webkit-column-break-inside: avoid;
        break-inside: avoid;
        margin-right: 23px;
        margin-bottom: 24px;
        list-style: none;
        box-shadow: 0 2px 9px rgba(0,0,0,.05);
        text-decoration: none;
        display: block;
        width: 219px;
        img{
          width: 100%;
          // height: 219px
        }
        .list-info{
          width: 100%;
          background: #fff;
          height: 66px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: -6px;
          div:nth-child(1){
            font-size: 14px;
            color: #000000;
            line-height: 1;
          }
          div:nth-child(2){
            margin-top: 7px;
            font-size: 14px;
            color: #b3b3b3;
            line-height: 1;
            font-family: Arial;
          }
        }
      }
    }
  }
  .pagination{
    text-align: end;
  }
}
</style>
