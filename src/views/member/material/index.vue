<template>
  <div>
    <div class="content">
      <!-- 头部文字 -->
      <div class="top__text">
        <span style="font-size: 18px">我的素材 · </span>
        <span style="color:#9d9d9d">共{{ total }}个素材</span>
      </div>
      <!--顶部筛选栏-->
      <div>
        排序：
        <el-select v-model="sortVal" placeholder="请选择">
          <el-option v-for="item in sortList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <!--列表-->
      <!--      <div class="template">-->
      <!--        <div v-for="(item,index) in list" :key="index" class="template-list template__transition" @mouseenter="handleMouseenter(item)" @mouseleave="handleMouseleave(item)">-->
      <!--          <div style="position: relative">-->
      <!--            <el-image fit="fit" :src="item.product.thumbnail" />-->
      <!--            <div :ref="item.id" class="like" style="display: none" @click.stop="handleCancelKeep(item)">-->
      <!--              <i class="iconfont iconshoucang font-30px color-red" />-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <div class="info">-->
      <!--            <div class="text-hidden title1">{{ item.product.title }}</div>-->
      <!--            <div class="title2 mt-10px">-->
      <!--              <span>尺寸</span>-->
      <!--              <span class="ml-8px">{{ item.product.size }}</span>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->

      <div class="design-list">
        <ul>
          <li v-for="(item,index) in list" :key="index" class="pointer" @click="handleTemplate(item)" @mouseenter="handleMouseenter(item)" @mouseleave="handleMouseleave(item)">
            <div style="position: relative">
              <img fit="fit" :src="item.url">
              <div :ref="item.id" class="like" style="display: none" @click.stop="handleCancelKeep(item)">
                <i class="el-icon-delete font-30px color-red" />
              </div>
            </div>
            <div class="list-info">
              <!-- <div>{{ item.product.title }}</div> -->
              <div class="update">上传时间：{{ item.updated_at }}</div>
            </div>
          </li>
        </ul>
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
  name: 'Index', // 我的素材
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
      this.getCollectList()
    },

    // 获取素材列表
    async getCollectList() {
      const resources = [{ name: 'file' }]
      const params = {
        user_id: this.$store.state.user.userInfo.id,
        type: 1
      }
      const res = await this.api.restful({ resources, params })
      console.log('获取素材列表', res)
      if (this.$isSucc(res)) {
        this.total = res.data.length
        this.list = res.data
      }
    },

    // 分页
    handleCurrentChange(page) {
      this.page = page
      this.getCollectList()
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

    // 删除素材
    async handleCancelKeep(item) {
      const resources = [{ name: 'RecycleBin' }]
      console.log('删除素材', item)
      const data = {
        type: 0, // 0素材 1模板
        user_id: this.$store.state.user.userInfo.id,
        delete_id: item.id
      }
      const method = 'post'
      const res = await this.api.restful({ resources, method, data })
      if (this.$isSucc(res)) {
        this.$message.success('删除成功')
        this.initData()
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
  .design-list{
    width: 1680px;
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
      -webkit-column-count: 7;
      -moz-column-count: 7;
      column-count: 7;
      -webkit-column-gap: 12px;
      -moz-column-gap: 12px;
      column-gap: 12px;
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
          margin-top: -6px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
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
  .update {
    font-size: 12px!important;
    color: #b3b3b3!important;
  }
}
.pagination{
  text-align: end;
  margin-top: 20px;
}

</style>
