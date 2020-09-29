<template>
  <div>
    <!--顶部导航栏-->
    <div class="menu">
      <div class="logo" />
      <!--首页-->
      <div class="menu-content">
        <div v-for="(item,index) in menuList" :key="index" :class="$route.fullPath === item.url ? 'div-active': ''" class="pointer" @click="$router.push(item.url)">{{ item.title }}</div>
      </div>
    </div>
    <!--用户信息-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      menuList: [
        { title: '首页', url: '/' },
        { title: '账户设置', url: '/user/setting' },
        { title: '积分充值', url: '/user/topup' },
        { title: '支付记录', url: '/user/paynotes' }
      ],
      activeIndex: 1
    }
  },
  mounted() {
    document.getElementById('layout__view').style.top = '0'
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
/deep/ .el-button--medium {
  width: 100%;
}

.menu{
    background: #fff;
    box-shadow: 7px 0 7px rgba(0,0,0,.15);
    height: 57px;
    position: relative;
    display: flex;
    align-items: center;
    font-size: 16px;
    .logo{
      position:absolute;
      left: 80px;
      width: 200px;
      height: 53px;
    }
    .menu-content{
      width: 812px;
      margin: auto;
      height: 100%;
      display: flex;
      align-items: center;
      div{
        display: flex;
        align-items: center;
        margin: 0 15px;
        height: 100%;
      }
      div:nth-child(1){
        margin-left: 0px;
      }
      .div-active{
        font-weight: 700;
        color: #1890ff;
        border-bottom: 2px solid #1890ff;
      }
    }
}
</style>
