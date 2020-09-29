<template>
  <div class="mt-30px">
    <!--导航栏-->
    <div class="layout menu">
      <div v-for="(item, index) in menu" :key="index" class="title-font" :class="item.status === status ? 'title-font-active':''">
        <span class="pointer" @click="handleMenu(item)">{{ item.title }}</span>
      </div>
    </div>
    <!--切换分裂-->
    <Logo v-if="status === 1" />
    <Art v-if="status === 2" />
  </div>
</template>

<script>
import Logo from './components/Logo'
import Art from './components/Art'
export default {
  name: 'Index',
  components: { Logo, Art },
  data() {
    return {
      status: Number(this.$route.query.status), // 1为logo设计, 2为艺术字
      menu: [
        { title: 'Logo 设计', status: 1 }
        // { title: '艺术字体', status: 2 }
      ]
    }
  },
  methods: {
    handleMenu(item) {
      this.status = item.status
    }
  }
}
</script>

<style lang="less" scoped>
.menu{
    width: 1190px;
    height: 51px;
    margin: 0 auto;
    background: #fff;
    box-sizing: border-box;
    padding-left: 24px;
    border-bottom: 1px solid #e4e4e4;
    display: flex;
    align-items: center;
    .title-font{
      height: 51px;
      display: flex;
      align-items: center;
      font-size: 16px;
      color: #1d1d1d;
      line-height: 1;
      margin-right: 45px;
    }
    .title-font-active{
        font-weight: 700;
        color: #0083e9;
        border-bottom: 3px solid #0083e9;
        padding-top: 3px;
    }
}

</style>
