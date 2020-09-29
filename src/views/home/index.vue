<template>
  <div>
    <!--    悬浮的二维码-->
    <!-- <div class="qrCode-container">
      <div>
        <img src="@/assets/img/qrcode.jpg" alt="">
      </div>
      扫一扫关注微信公众号
    </div> -->

    <!--    悬浮按钮组-->
    <div class="fixed-buttons">
      <div class="fixed-buttons-container-header">
        <el-image
          style="width: 100%; "
          :src="require('@/assets/img/videodesc.png')"
        />
      </div>

      <div class="fixed-buttons-container">
        <div>
          <i class="iconfont iconqiandao" />
        </div>
        <div>
          签到
        </div>
      </div>

      <div class="fixed-buttons-container">
        <div>
          <i class="iconfont iconjiaochengqianniu" />
        </div>
        <div>
          教程
        </div>
      </div>

      <div class="fixed-buttons-container">
        <div>
          <i class="iconfont iconziyuan" />
        </div>
        <div>
          客服
        </div>
      </div>

    </div>

    <login style="position: fixed; top: 100px" :show.sync="showDialog" :show-type="loginType" />

    <div class="layout">
      <div class="box" @mouseleave="mouseleave">
        <!--左边功能列表-->
        <div ref="features" class="features-list">
          <div v-for="(item,index) in featuresList" :ref="item.id" :key="index" class="list-item" @mouseenter="mouseenter(item)">
            <div class="item-icon"><i class="iconfont" :class="item.icon_class" /></div>
            <div class="ml-10px text-hidden">
              <div class="pointer font-16px font-wiight" @click="handleFeatures(item)">{{ item.title }}</div>
              <div>
                <span v-for="(child,i) in item.child" :key="i" @click="handleFeatures(child)">
                  <span v-if="i<3">
                    {{ child.title }}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div />

        <!--业务列表-->
        <div v-if="shwoFeatures" ref="list__content" class="list-content">
          <list-content :mouse-data="mouseData" />
        </div>

        <!--中间轮播图-->
        <div v-if="!shwoFeatures" class="banner bg-e4e2e2">
          <el-carousel height="3.97rem">
            <el-carousel-item v-for="item in bannerList" :key="item.id" @click.native="handleBanner(item)">
              <el-image :src="item.img_url" fit="scale-down" />
            </el-carousel-item>
          </el-carousel>
        </div>

        <!--右边-->
        <div v-if="!shwoFeatures" class="user">
          <div v-if="!$store.state.user.userInfo || !$store.state.user.token" class="info">
            <div><img src="@/assets/img/face.png"></div>
            <div class="welcome">Hi，欢迎来到中国广州市</div>
            <div class="login">
              <span @click="showDialog = true, loginType = 1">登录</span>
              <span class="mr-5px ml-5px"> / </span>
              <span @click="showDialog = true,loginType = 2">注册</span>
            </div>
          </div>
          <div v-else class="info">
            <div><img :src="$store.state.user.userInfo.avatar"></div>
            <div class="welcome">{{ $store.state.user.userInfo.name }}</div>
            <div class="login" style="background:white;border:2px solid #1890ff;color:#1890ff" @click="handleDevise">我的设计</div>
          </div>
          <div class="des-dynamic">
            <span>设计师动态</span>
          </div>
          <div class="dynamic-content">
            <div class="swiper-wrapper">
              <div v-for="(item,index) in dynamicsList" :key="index" class="coreRotate">
                <div class="text-hidden">{{ item.title }}</div>
              </div>
            </div>
            <div class="dynamic-content4">
              <span class="font-12px">模板持续收入→</span>
              <span class="signing" @click="handleCertification">设计师签约</span>
            </div>
          </div>
        </div>
      </div>

      <!--海报下面业务图片-->
      <div class="poster">
        <div v-for="item in middleList" :key="item.id" class="pointer" @click="handlePoster(item.code)">
          <el-image fit="fit" class="template__transition" :src="item.img_url" />
        </div>
      </div>

      <!--模板列表-->
      <div v-for="(item, key, index) in templateList" :key="index">
        <p class="template-title">{{ key }}</p>
        <div class="template">
          <div v-for="child in item" :key="child.id" class="template-list template__transition" @click="handleTemplate(child)" @mouseenter="handleMouseenter(child)" @mouseleave="handleMouseleave(child,key)">
            <div style="position: relative">
              <el-image fit="fit" :src="child.url || child.thumbnail" />
              <div :ref="'template_' + child.id" class="like" style="display: none" @click.stop="handleCancelKeep(child)">
                <i class="iconfont iconshoucang font-30px color-gray" :class="child.keep.length ? 'color-red' : 'color-gray'" />
              </div>
            </div>
            <div class="info">
              <div class="text-hidden title1">{{ child.introduction }}</div>
              <div class="title2 mt-10px">
                <span>{{ child.title }}</span>
                <span class="ml-8px">{{ child.size }} px</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--      签约设计师-->
      <div class="design-ruk">
        <div>
          <el-image
            style="width: 470px; height: 95%"
            :src="require('@/assets/img/banner-design.png')"
          />
        </div>
        <div class="design-ruk-container">
          <div>我是设计师，我要名利双收</div>
          <div>
            <p>轻松上传模板，优秀的模板有机会获得官网主频道推荐展示，为店铺引流。</p>
            <p>单个模板无限次出售，获得持续性收入。</p>
            <p>店铺模板越多，使用体验越佳，覆盖行业越广，收入就越高</p>
          </div>
          <div>
            <el-button type="primary" round @click="handelRouter(0)">立即签约</el-button>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import config from './mixins/config.js'
import login from '@/layout/navbar/components/login'
import listContent from './components/listContent'
export default {
  name: 'Index',
  components: { listContent, login },
  mixins: [config],
  data() {
    return {
      shwoFeatures: false,
      mouseData: {},
      showDialog: false,
      loginType: null
    }
  },
  methods: {
    // 单纯的函数跳转
    handelRouter(type) {
      const path = [
        '/workbench/certification'
      ]
      this.$router.push({ path: path[type] })
    },
    // 鼠标进入左边功能列表
    mouseenter(item) {
      for (const key in this.$refs) {
        if (key === item.id) {
          this.$refs.features.style.position = 'absolute'
          this.$refs[item.id][0].style.border = '2px solid #1890ff'
          this.$refs[item.id][0].style.borderRight = '0'
          this.$refs[item.id][0].classList.add('list-item-cover')
        } else {
          if (this.featuresList.filter(item => item.id == key).length) {
            this.$refs[key][0].style.border = '2px solid #fff'
            this.$refs[key][0].classList.remove('list-item-cover')
          }
        }
      }
      this.mouseData = item
      this.shwoFeatures = true
    },
    // 鼠标离开左边功能列表
    mouseleave() {
      for (const key in this.$refs) {
        if (this.featuresList.filter(item => item.id == key).length) {
          this.$refs[key][0].style.border = '2px solid #fff '
          this.$refs[key][0].classList.remove('list-item-cover')
        }
      }
      this.$refs.features.style.position = 'relative'
      this.shwoFeatures = false
    },

    // 点击功能列表的模块
    handleFeatures(item) {
      console.log(item)
      let classfiy_id = item.id
      if (!item.parent_id) classfiy_id = item.child[0].id
      window.open(`/template?classfiy_id= ${classfiy_id}&title_id=${this.mouseData.id}`)
    },

    // 轮播图下面业务模块(搜索跳转)
    handlePoster(code) {
      window.open('/search?keyname=' + code)
    },

    // 点击模板
    handleTemplate(item) {
      // window.open('/imgEditor?type=0&id=' + item.id)
      window.open(`/detail?id=${item.id}&type=0`)
    },

    // 点击轮播图
    handleBanner(item) {
      console.log(123)
      window.open(item.url)
    },

    // 点击我的设计
    handleDevise() {
      window.open('/member/devise')
    },

    // 点击设计师签约
    handleCertification() {
      if (this.$store.state.user.token) {
        window.open('/workbench/certification')
      } else {
        this.showDialog = true
        this.loginType = 1
      }
    },

    // 鼠标进入(收藏)
    handleMouseenter(item) {
      this.$refs['template_' + item.id][0].style.display = 'block'
    },

    // 鼠标离开(收藏)
    handleMouseleave(item, classfiy) {
      for (const key in this.$refs) {
        if (this.templateList[classfiy].filter(item => 'template_' + item.id == key).length) {
          this.$refs[key][0].style.display = 'none'
        }
      }
    },

    // 取消收藏或加入收藏
    async handleCancelKeep(item) {
      // 判断是否登陆
      if (!this.$store.state.user.token) {
        this.showDialog = true
        this.loginType = 1
        return false
      }
      if (item.keep.length) {
        const resources = [{ name: 'keep', id: item.keep[0].id }]
        const method = 'delete'
        const loading = false
        const res = await this.api.restful({ resources, method, loading })
        if (this.$isSucc(res)) {
          this.$message.success('已取消收藏')
          this.getProductList()
        }
      } else {
        const resources = [{ name: 'keep' }]
        const method = 'post'
        const loading = false
        const data = {
          product_id: item.id,
          user_id: this.$store.state.user.userInfo.id,
          type: 0
        }
        const res = await this.api.restful({ resources, method, data, loading })
        if (this.$isSucc(res)) {
          this.$message.success('已加入收藏')
          this.getProductList()
        }
      }
    }

  }
}
</script>

<style src="./css/index.less" lang="less" scope />

