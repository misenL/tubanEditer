<template>
  <div class="layout mt-30px detail">
    <login style="position: absolute;top: -100px" :show.sync="showDialog" :show-type="loginType" />
    <div class="content">
      <div class="limian">
        <img :src="info.thumbnail">
      </div>
    </div>

    <div class="left-info">
      <div class="goods-info">
        <div class="title">{{ info.title }}</div>
        <div class="qudhuiyin-price">
          <div class="qushuiyin-title">购买价格</div>
          <div class="many-jifen">
            <span>{{ info.money }}</span>
            <span>积分</span>
          </div>
        </div>
        <div v-if="!info.pay" class="submit-but" @click="handlePay">立即购买</div>
        <div v-else class="submit-but" @click="handleEdit">立即编辑</div>
      </div>

      <div class="goods-shop">
        <el-row type="flex">
          <el-col class="headurl">
            <img :src="info.user ? info.user.avatar : 'http://192.168.2.138:9588/static/img/logo.67d34b0d.jpg'" alt="">
          </el-col>
          <el-col class="specific-name">
            <div class="names">{{ info.user ? info.user.name : '后台自营' }}</div>
            <div class="works">发布了{{ info.designer_count }}个作品</div>
          </el-col>
        </el-row>
        <el-row class="specific-base2">
          <div @click="handleShop">Ta的店铺 ></div>
        </el-row>
      </div>

      <div class="goods-detail">
        <div class="title">相关说明</div>
        <div class="title1">使用方式：在线编辑</div>
        <div class="title1">模板尺寸：{{ info.size }}</div>
        <div class="title1">下载格式：可选{{ info.download_type }}</div>
        <div class="title1">能否印刷：不支持印刷</div>
      </div>
    </div>
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
      info: {},
      showDialog: false,
      loginType: null
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    ...mapActions([
      'getUserInfo'
    ]),
    // 页面初始化
    initData() {
      this.getDetail()
    },

    // 获取模板详情
    async getDetail() {
      const resources = [{ name: 'search' }]
      const params = {
        type: this.$route.query.type,
        id: this.$route.query.id
      }
      const res = await this.api.restful({ resources, params })
      this.info = res.data
    },

    // 立即购买
    async handlePay() {
      if (!this.$store.state.user.token) {
        this.showDialog = true
        this.loginType = 1
        return false
      }
      // 购买商品
      const resources = [{ name: 'payProduct' }]
      const method = 'post'
      const data = {
        product_id: this.info.id,
        type: Number(this.$route.query.type)
      }
      const res = await this.api.restful({ resources, data, method })
      if (this.$isSucc(res)) {
        this.getUserInfo()
        this.initData()
        this.$message.success('购买成功！！！')
      }
    },

    // 立即编辑
    handleEdit() {
      window.open(`/imgEditor?type=${this.$route.query.type}&id=${this.info.id}`)
    },

    // 设计师店铺
    handleShop() {
      window.open('/shop?user_id=' + this.info.user_id)
    }
  }

}
</script>

<style lang="scss" scoped>
  .detail{
    display: flex;
    .content{
      width: 100%;
      background: #fff;
      box-sizing: border-box;
      padding: 20px;
      position: relative;
      .limian{
        box-sizing: border-box;
        width: 100%;
        text-align: center;
        vertical-align: middle;
        background: #e1e1e1;
        padding: 38px 0;
        border: 1px solid #e1e1e1;
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
          max-height: 500px !important;
          max-width: 100%;
        }
      }
    }
    .left-info{
      width: 450px;
      margin-left: 24px;
      .goods-info{
        box-sizing: border-box;
        width: 100%;
        background: #fff;
        padding: 21px 16px 16px 18px;
        .title{
          font-size: 20px;
          color: #444;
          line-height: 24px;
        }
        .qudhuiyin-price{
          margin-top: 16px;
          width: 100%;
          height: 81px;
          background: #f2f2f2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-sizing: border-box;
          padding-left: 19px;
          .qushuiyin-title{
            font-size: 12px;
            color: #969696;
            line-height: 1;
          }
          .many-jifen{
            margin-top: 8px;
            span:nth-child(1){
              font-size: 24px;
              color: #0083e9;
              font-family: Arial;
              line-height: 1;
            }
            span:nth-child(2){
              font-size: 12px;
              color: #696969;
              line-height: 1;
              margin-top: 5px;
              margin-left: 3px;
            }
          }
        }
        .submit-but{
          display: block;
          box-sizing: border-box;
          background: #0083e9;
          text-decoration: none;
          height: 43px;
          line-height: 43px;
          text-align: center;
          color: #fff;
          font-size: 16px;
          margin-top: 14px;
          cursor: pointer;
        }
      }
      .goods-detail{
        background: #fff;
        margin-top: 9px;
        box-sizing: border-box;
        padding: 20px 0 20px 18px;
        .title{
          font-size: 14px;
          color: #444;
          line-height: 1;
        }
        .title1{
          margin-top: 16px;
          font-size: 12px;
          color: #757575;
          line-height: 1;
        }
      }
      .goods-shop{
        background: #fff;
        margin-top: 9px;
        box-sizing: border-box;
        padding: 20px 18px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .headurl{
          width: 46px;
          height: 46px;
          border-radius: 23px;
          img{
            vertical-align: middle;
            border-style: none;
            width: 46px;
            height: 46px;
          }
        }
        .specific-name{
          margin-left: 11px;
          .names{
            font-size: 15px;
            color: #444;
            line-height: 1;
            margin-top: 4px;
          }
          .works{
            font-size: 13px;
            color: #969696;
            line-height: 1;
            margin-top: 8px;
          }
        }
        .specific-base2{
          width: 82px;
          div{
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 24px;
            background: #d7eeff;
            font-size: 12px;
            color: #0083e9;
            line-height: 1;
            font-weight: 700;
            cursor: pointer;
          }
        }
      }
    }
  }

</style>
