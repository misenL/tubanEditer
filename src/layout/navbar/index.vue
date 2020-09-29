<template>
  <div>
    <div class="flex-row">
      <div ref="navbar" class="fixed">
        <!--最顶部的链接跳转-->
        <div v-if="headerLink" class="header" style="position: relative">
          <div class="flex-between layout">
            <div class="header-left" @mouseenter="showWeChat" @mouseleave="hideWeChat">
              <span>微信公众号</span>
              <!-- 悬浮二维码 -->
              <div v-show="showCode" class="qrCode-container">
                <div>
                  <img src="@/assets/img/qrcode.jpg" alt="">
                </div>
                扫一扫关注微信公众号
              </div>
            </div>

            <div v-if="!$store.state.user.userInfo || !$store.state.user.token">
              <span>会打字就能在线编辑, 立即开启在线编辑之旅</span>
              <span class="color-main ml-10px pointer " @click="showDialog = true, loginType = 1">登录</span>
              <span class="color-main ml-5px mr-5px">/</span>
              <span class="color-main pointer" @click="showDialog = true,loginType = 2">注册</span>
            </div>
            <div v-else class="flex-center cursor-pointer">
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
            </div>
          </div>
          <!--          <div style="position: absolute; top: 0;right: 0" @click="$i18n.locale = 'zh'">{{ $t('nav.home') }}</div>-->
        </div>

        <div class="content">
          <!--搜索模块-->
          <div class="layout flex" style="padding: .14rem 0">
            <div class="logo">

              <a href="/">
                <el-image
                  style="width: 100px; height: 95px"
                  :src=" require('../../assets/img/logo.png')"
                />
                <!--                <img src="" class="logo-box" alt="">-->
              </a>
              <!-- <div class="border logo-box" /> -->
            </div>
            <div class="search">
              <input v-model="search" placeholder="请输入模板关键词" @keydown.enter="handleSearch">
              <div class="search-but" @click="handleSearch">搜索</div>
            </div>
            <!-- <div class="demand">
              <div class="mr-20px">或</div>
              <div class="demand-but">发布代改需求</div>
            </div> -->
          </div>
          <!--业务模块-->
          <div v-if="headerLink && $route.fullPath === '/'" v-show="headerLink" id="layoutYW" class="layout flex mt-40px">
            <div class="muban">模板分类</div>
            <div class="content-link">
              <span @click="handleLogoDesign(1)">LOGO设计</span>
              <!--              <span>横版名片</span>-->
              <!--              <span>工作证</span>-->
              <span>在线印刷</span>
              <!-- <span @click="handleLogoDesign(2)">艺术字</span> -->
              <!-- <span>VIP特权</span> -->
              <!-- <span>设计师入口</span> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--业务组件-->
    <div ref="viewable" />
    <login :show.sync="showDialog" :show-type="loginType" />
  </div>
</template>

<script>
import login from './components/login'
import { mapActions } from 'vuex'
export default {
  name: 'Navbar',
  components: { login },
  data() {
    return {
      search: '',
      headerLink: true,
      showDialog: false,
      loginType: null,
      showCode: false
    }
  },
  mounted() {
    if (this.$route.fullPath !== '/') {
      return false
    }
    window.addEventListener('scroll', this.handleScroll)
    this.$nextTick(() => {
      document.getElementById('layout__view').style.top = '2.3rem'
      this.$refs.navbar.style.height = '2.3rem'
      this.$refs.viewable.style.height = document.documentElement.scrollTop > 48 ? (this.$refs.navbar.offsetHeight + 48) + 'px' : this.$refs.navbar.offsetHeight + 'px'
    })
  },
  methods: {
    // 引入vuex
    ...mapActions([
      'handleLogOut'
    ]),
    // 监听滚动条高度
    handleScroll() {
      // 设置其他信息展示与否
      const scrollTop = document.documentElement.scrollTop
      if (scrollTop > 48) {
        this.headerLink = false
        document.getElementById('layout__view').style.top = '1.8rem'
      } else {
        this.headerLink = true
        document.getElementById('layout__view').style.top = '2.3rem'
      }
      // 挤出可视区的多少内容
      this.$refs.viewable.style.height = scrollTop > 48 ? (this.$refs.navbar.offsetHeight + 48) + 'px' : this.$refs.navbar.offsetHeight + 'px'
    },
    // 显示公众号二维码
    showWeChat() {
      console.log('????', this)
      this.showCode = true
    },
    // 隐藏公众号二维码
    hideWeChat() {
      console.log('????=====')
      this.showCode = false
    },

    // 搜索
    handleSearch() {
      window.open('/search?keyname=' + this.search)
    },

    // 退出登录
    handleLoginOut() {
      this.handleLogOut().then((res) => {
        this.$message.success('已退出登录')
      })
    },

    handleLogoDesign(status) {
      window.open('/logo?status=' + status)
    },

    // 跳转用户中心页
    handleUser() {
      this.$router.push('/user')
    }
  }
}
</script>

<style lang="less" scoped>
.fixed{
    position: fixed;
    z-index: 99;
    width: 100%;
    top: 0;
}
.ture__opacity {
  opacity: 1;
}
.false__opacity {
  opacity: 0;
}
.header{
    height: 42px;
    line-height: 42px;
    font-size: 12px;
    color: #5e5d5d;
    background: #f6f6f6;
    transition: .1s linear;
    .header-left{
      margin-left: -2.5rem;
       span{
           margin-right: 15px;
           cursor: pointer;
       }
       span:hover{
           color: #1890ff;
       }
       .qrCode-container {
          position: fixed;
          margin-left: -.2rem;
          background: #ffffff;
          font-size: 16px !important;
          text-align: center;
          padding-bottom: 10px;
          img{
            width: 200px;
          }
       }
    }
}
.content{
    background: white;
    box-shadow: 0 2px 4px rgba(0,0,0,.15);
    transition: .1s linear;
    .logo{
      overflow: hidden;
      height: 72px;
      width: 231px;
      display: flex;
      justify-content: center;
        .logo-box{
            width: 153px;
            height: 69px;
        }
    }
    .search{
        width:728px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        input{
            width: 591px;
            height: 45px;
            box-sizing: border-box;
            border: 2px solid #0083e9;
            border-right: 0;
            padding-left: 12px;
            padding-right: 12px;
            border-radius: 22px 0 0 22px;
            outline:none;
        }
        .search-but{
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 111px;
            height: 45px;
            font-size: 16px;
            color: #fff;
            line-height: 1;
            background: #0083e9;
            font-weight: 700;
            border-radius: 0 22px 22px 0;
            cursor: pointer;
        }
        .search-but:hover{
            background: #4fa6ff;
        }
    }
    .demand{
        width: 231px;
        display: flex;
         align-items: center;
         justify-content: flex-end;
        .demand-but{
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            width: 174px;
            height: 45px;
            border-radius: 22px;
            background: #0083e9;
            cursor: pointer;
        }
         .demand-but:hover{
            background: #4fa6ff;
        }
    }
    .muban{
            margin-left: 0;
            width: 231px;
            height: 48px;
            background: #0083e9;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding-left: 21px;
            font-size: 16px;
            font-weight: 600;
            color: white;
     }
     .content-link{
            font-size: 16px;
            font-weight: 600;
            display: flex;
            align-items: center;
            width: 728px;
            span{
                margin-left: 50px
            }
            span:hover{
                color: #1890ff;
                cursor: pointer;
            }
     }
}
</style>
