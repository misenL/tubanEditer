<template>
  <div class="footer-box">
    <div class="footer-other">
      <span v-for="(item, index) in aboutList" :key="index" class="pointer" @click="handleService(item)">{{ item.title }}</span>
    </div>

    <div class="footer">
      <span class="mr-20px">Copyright © 2019 tubangzhu.com</span>
      <span class="mr-20px pointer">鲁ICP备14013361号-8</span>
      <span class="mr-20px pointer">鲁公网安备 37020202001075号经营证照</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Concise',
  data() {
    return {
      aboutList: []
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 页面初始化
    initData() {
      this.getAboutList()
    },

    // 获取关于我们列表
    async getAboutList() {
      const resources = [{ name: 'about' }]
      const params = {
        page: 1,
        per_page: 9999,
        sort_by: '-created_at'
      }
      const res = await this.api.restful({ resources, params })
      if (this.$isSucc(res)) {
        this.aboutList = res.data
        this.handleKey = res.data[0].id
      }
    },

    // 点击关于服务项
    handleService(data) {
      if (window.location.pathname.indexOf('about') !== -1) {
        return false
      }
      window.open(data.url)
    }
  }
}
</script>

<style lang="less" scoped>
    .footer-box{
        position: absolute;
        bottom: 0;
        width: 100%;
    .footer-other{
        width: 100%;
        background: #f2f2f2;
        height: 43px;
        display: flex;
        justify-content: center;
        align-items: center;
    span{
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 94px;
        height: 15px;
        box-sizing: border-box;
        font-size: 14px;
        color: #545454;
        line-height: 1;
    }
    }
    .footer{
        width: 100%;
        height: 37px;
        background: #232830;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #a1a1a1;
        line-height: 1;
        font-family: Arial;
    }
 }
</style>
