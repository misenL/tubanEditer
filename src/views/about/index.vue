<template>
  <div class="page">
    <!--顶部导航栏-->
    <div class="nav-header">
      <div class="nav-logo">
        <img src="@/assets/img/bg2y.jpeg" alt="">
      </div>
      <div class="nav-info">
        <div class="nav-link">
          <ul>
            <li @click="$router.push('/')">首页</li>
            <li @click="$alert('暂时还未有链接')">在线印刷</li>
          </ul>
        </div>
        <div class="nav-user">
          <div v-if="!$store.state.user.userInfo || !$store.state.user.token" class="nav-login" @click="showDialog=true">登录 / 注册</div>
          <div v-else class="nav-userinfo">
            <ul>
              <li>
                <el-dropdown>
                  <span class="el-dropdown-link">
                    设计管理<i class="el-icon-arrow-down el-icon--right" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="$router.push('/member/devise')">我的设计</el-dropdown-item>
                    <el-dropdown-item @click.native="$router.push('/member/collect')">我的收藏</el-dropdown-item>
                    <el-dropdown-item @click.native="$router.push('/member/purchased')">已够模板</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
              <li @click="$router.push('/user/topup')">积分充值</li>
              <li>
                <el-popover placement="top-start" width="200" trigger="hover">
                  <!--触发信息条件-->
                  <div slot="reference" class="flex-center">
                    <el-avatar size="small" :src="$store.state.user.userInfo.avatar" />
                    <div class="ml-10px">{{ $store.state.user.userInfo.name }}</div>
                  </div>
                  <!--用户信息-->
                  <div>
                    <div>{{ this.$store.state.user.userInfo.name }}</div>
                    <div v-if="this.$store.state.user.userInfo.email ">邮箱 : {{ this.$store.state.user.userInfo.email }}</div>
                    <div v-if="this.$store.state.user.userInfo.phone ">手机 : {{ this.$store.state.user.userInfo.phone }}</div>
                  </div>
                  <div class="flex-between mt-20px">
                    <div class="pointer" @click="handleUser"><i class="el-icon-user mr-5px" />账户管理</div>
                    <div class="pointer" @click="handleLoginOut"><i class="el-icon-refresh mr-5px" />退出登录</div>
                  </div>
                </el-popover>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <!--左边导航栏-->
      <div class="nav">
        <div class="title">
          <span>{{ aboutList.length ? aboutList.filter(item => item.id === handleKey)[0].title : '' }}</span><i />
        </div>
        <div v-for="(item, index) in aboutList" :key="index" class="about-list" :style="item.id===handleKey ? 'color: #3a8ee6':''">
          <span :style="item.id===handleKey ? 'color: #3a8ee6':''" @click="handleService(item)">{{ item.title }}</span><i />
        </div>
      </div>
      <!--右边内容-->
      <div class="right-content">
        <div v-html="aboutList.length ? aboutList.filter(item => item.id === handleKey)[0].content : handleKey" />
      </div>
    </div>
    <!--组件-->
    <login style="position: fixed; top: 100px" :show.sync="showDialog" :show-type="loginType" />
  </div>
</template>

<script>
import login from '@/layout/navbar/components/login'
import { mapActions } from 'vuex'

export default {
  name: 'Index',
  components: { login },
  data() {
    return {
      aboutList: [],
      handleKey: null,
      showDialog: false,
      loginType: 1
    }
  },
  created() {
    document.getElementById('layout__view').style.top = 0
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 引入vuex
    ...mapActions([
      'handleLogOut'
    ]),
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
      this.handleKey = data.id
    },

    // 跳转用户中心页
    handleUser() {
      this.$router.push('/user')
    },

    // 退出登录
    handleLoginOut() {
      this.handleLogOut().then((res) => {
        this.$message.success('已退出登录')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page{
  background: white;
  .nav-header{
    display: flex;
    align-items: center;
    position: fixed;
    background: #fff;
    height: 57px;
    top: 0;
    left: 0;
    right: 0;
    z-index:402;
    box-shadow: 7px 0 7px rgba(0,0,0,.15);
    .nav-logo{
      width: 221px;
      box-sizing: border-box;
      height: 57px;
      margin-right: 0;
      position: relative;
      img{
        width: 175px;
        height: 50px;
        position: absolute;
        background: #3a8ee6;
        top: 3px;
        left: 25px;
      }
    }
    .nav-info{
      height: 57px;
      width: 100%;
      .nav-link{
        float: left;
        height: 57px;
        ul{
          height: 57px;
          display: flex;
          align-items: center;
          padding: 0;
          margin: 0;
          outline: 0 !important;
          color: #6b6b6b;
          font-size: 14px;
          transition: .1s linear;
          border-bottom: 0;
          line-height: 57px;
          text-align: center;
          li{
            cursor: pointer;
            list-style: none;
            height: 57px;
            margin-right: 40px;
            display: flex;
            align-items: center;
            position: relative;
          }
          li:first-child{
            margin-left: 62px;
          }
        }
      }
      .nav-user{
        justify-content: flex-end;
        float: right;
        display: flex;
        margin-top: 6px;
        padding-right: 64px;
        width: 27%;
        .nav-login{
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 149px;
          height: 38px;
          border-radius: 19px;
          border: 2px solid #0083e9;
          color: #26a7eb;
          font-size: 14px;
          cursor: pointer;
          margin-top: 5px;
          margin-right: 10px;
        }
        .nav-userinfo{
          ul{
            display: flex;
            font-size: 12px;
            color: #6b6b6b;
            height: 22px;
            line-height: 22px;
            li{
              /deep/ .el-dropdown{
                font-size: 12px;
                cursor: pointer;
              }
              list-style: none;
              height: 16px;
              border-right: 1px solid #e6e6e6;
              padding-left: 17px;
              padding-right: 15px;
              display: flex;
              align-items: center;
            }
            li:last-child{
              border-right: 0;;
            }
          }
        }
      }
    }
  }

  .content{
    width: 1100px;
    margin: 0 auto;
    display: flex;
    min-height: calc(100vh - 80px);
    .nav{
      width: 226px;
      text-align: right;
      padding: 85px 0 125px;
      border-right: 1px solid #dadada;
      .title{
        position: relative;
        span:nth-child(1){
          display: block;
          font-family: '宋体',"Microsoft YaHei",Arial,sans-serif;
          font-size: 26px;
          color: #212121;
          line-height: 50px;
          padding-right: 20px;
        }
        i{
          position: absolute;
          width: 5px;
          height: 26px;
          background: #0083e9;
          top: 25%;
          right: -3px;
          z-index: 99;
          transition: 1s ease-in;
        }
      }
      .about-list{
        position: relative;
        line-height: 50px;
        span:nth-child(1){
          color: #9c9c9c;
          display: inline-block;
          padding-right: 15px;
          font-size: 100%;
          vertical-align: baseline;
          background: 0 0;
          text-decoration: none;
        }
        span:nth-child(1):hover{
          color: #3a8ee6;
          cursor: pointer;
        }
        i{
          position: absolute;
          width: 7px;
          height: 7px;
          border: 1px solid;
          border-radius: 50%;
          top: 40%;
          right: -5px;
          background: #fff;
          z-index: 99;
        }
      }
    }
    .right-content{
      width: 762px;
      padding: 98px 0 146px 96px;
      position: relative;
    }
  }
}
</style>
