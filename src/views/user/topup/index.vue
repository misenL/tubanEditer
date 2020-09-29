<template>
  <div class="topup-box">
    <div class="heard">
      <div class="flex-column pt-20px">
        <div class="icon">
          <i class="iconfont iconchongzhi" />
        </div>
        <div class="text-center font-18px font-wiight mt-8px">充值</div>
      </div>
      <div class="money">
        <span class="color-gray">账户余额：</span>
        <span class="color-main">{{ $store.state.user.userInfo.money }}</span> (1元 = 1积分)
      </div>
    </div>

    <div class="content">
      <div class="title">选择充值金额</div>
      <!--选项-->
      <div class="calculate">
        <div class="calculate1">
          <div v-for="(item,index) in moneyOptions" :key="index" class="choosermb" :class="item.money===moneyKey ? 'active' : ''" @click="handleMoneySize(item)">
            <div class="money1">
              <span>{{ item.money }}</span>
              <span>元</span>
            </div>
            <div class="money2">{{ item.money }}元 = {{ item.money }}积分</div>
          </div>
        </div>
        <!--支付类型-->
        <div class="calculate2">
          <el-tabs v-model="activePay" type="border-card" stretch>
            <el-tab-pane class="flex-column" style="height: 1.4rem;" label="支付宝支付" name="ali_pay">
              <div class="ali-pay-money">
                <span>应付金额：</span>
                <span>{{ moneyKey }}</span>
                <span>元</span>
              </div>
              <div class="ali-pay-but">
                <el-button type="primary" @click="aliPay">立即支付</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="微信支付" class="flex-column" style="height: 1.4rem;" name="wechat_pay">
              <div id="qrcode" />
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div></template>

<script>
import { mapActions } from 'vuex'
import QRCode from 'qrcodejs2'

export default {
  name: 'Index',
  data() {
    return {
      moneyOptions: [
        { money: 0.01 },
        { money: 50 },
        { money: 100 },
        { money: 200 }
      ],
      moneyKey: 100,
      activePay: 'ali_pay',
      check_time: 0,
      interval: null
    }
  },
  watch: {
    activePay(val) {
      if (val === 'wechat_pay') {
        this.wechatCode()
      }
      if (val === 'ali_pay') {
        clearInterval(this.interval)
      }
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    ...mapActions([
      'getUserInfo'
    ]),

    // 切换金额大小
    handleMoneySize(item) {
      this.moneyKey = item.money
      this.activePay === 'wechat_pay' ? this.wechatCode() : null
    },

    // 支付宝立即支付
    async aliPay() {
      window.open('/alipay?money=' + this.moneyKey)
    },

    // 生成微信支付二维码
    async wechatCode() {
      clearInterval(this.interval)
      document.getElementById('qrcode').innerHTML = '' // 清空之前的二维码
      const resources = [{ name: 'wxQrCode' }]
      const params = {
        name: '积分充值，微信支付',
        money: this.moneyKey
      }
      const res = await this.api.restful({ resources, params })
      if (this.$isSucc(res)) {
        // 页面生产二维码插件（二维码的状态只有三分钟有效期）
        const qrcode = new QRCode('qrcode', {
          width: 120,
          height: 120,
          text: res.data.code_url
        })
        qrcode.makeCode(res.data.code_url)
        // 开始轮询检测是否是否已经支付
        this.interval = setInterval(async() => {
          this.check_time += 2
          if (this.check_time <= 179) { // 二维码的有效期为三分钟
            const resources = [{ name: 'checkPay' }]
            const params = {
              out_trade_no: res.data.out_trade_no
            }
            const back = await this.api.restful({ resources, params, loading: false })
            if (back.data.trade_state_desc === '支付成功') {
              this.check_time = 0
              clearInterval(this.interval)
              this.$message.success('支付成功')
              document.getElementById('qrcode').innerHTML = '支付成功'
            }
          } else {
            this.check_time = 0
            clearInterval(this.interval)
            this.wechatCode()
          }
        }, 2000)
      }
    }

    // 检查支付请求支付状态
    // async checkPay(out_trade_no) {
    //   this.check_time++
    //   if (this.check_time <= 179) { // 二维码的有效期为三分钟
    //     const resources = [{ name: 'checkPay' }]
    //     const params = {
    //       out_trade_no: out_trade_no
    //     }
    //     const res = await this.api.restful({ resources, params })
    //   } else {
    //     this.check_time = 0
    //     clearInterval(this.interval)
    //   }
    // }

  }
}
</script>

<style lang="scss" scoped>
.topup-box{
  font-size: 16px;
  background: white;
  min-width: 812px;
  max-width: 812px;
  min-height: 540px;
  margin: auto;
  margin-top: 100px;
  .heard{
    box-sizing: border-box;
    background: #fff;
    width: 100%;
    height: 190px;
    border-bottom: 1px solid #e8e8e8;
    .icon{
      font-size: 60px;
      width: 90px;
      height: 90px;
      border-radius: 100%;
      text-align: center;
      line-height: 90px;
      color: white;
      background: #4fa6ff;
      i{
        font-size: 60px;
      }
    }
    .money{
      padding: 10px 0 20px 20px;
      font-size: 14px;
    }
  }
  .content{
    box-sizing: border-box;
    width: 100%;
    min-height: calc(540px - 190px);
    background: #fbfbfb;
    padding: 20px;
    .title{
    }
    .calculate{
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
      padding: 10px 25px 0 25px;
      .calculate1{
        box-sizing: border-box;
        width: 362px;
        display: flex;
        flex-wrap: wrap;
        .choosermb{
          box-sizing: border-box;
          width: 170px;
          background: #fff;
          height: 103px;
          display: flex;
          margin-right: 7px;
          margin-bottom: 7px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 0 5px rgba(0,0,0,.1);
          .money1{
            font-size: 29px;
            color: #0083e9;
            font-family: Arial;
            span:nth-child(2){
              font-size: 14px;
            }
          }
          .money2{
            font-size: 14px;
            color: #acacac;
            margin-top: 8px;
            line-height: 1;
            font-family: Arial;
          }
        }
        .active{
          border: 2px solid #4fa6ff;
        }
        .choosermb:hover{
          cursor: pointer;
          border: 2px solid #4fa6ff;
        }
      }
      .calculate2{
        box-sizing: border-box;
        width: 351px;
        height: 217px;
        display: flex;
        flex-direction: column;
        padding-top: 3px;
        padding-left: 3px;
        padding-right: 3px;
        /deep/ .el-tabs--border-card{
          box-shadow: 0 0 3px #ebebeb;
        }
        .ali-pay-money{
          span:nth-child(1){
            line-height: 1;
            font-size: 14px;
            color: #5e5d5d;
          }
          span:nth-child(2){
            line-height: 1;
            font-size: 22px;
            color: #0083e9;
            font-family: Arial;
          }
          span:nth-child(3){
            line-height: 1;
            font-size: 12px;
            color: #acacac;
            margin-left: 6px;
          }
        }
        .ali-pay-but{
          .el-button{
            width: 132px;
            height: 36px;
            background: #0083e9;
            color: #fff;
            font-size: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 30px;
            border-radius: 3px;
          }
        }
      }
    }
  }
}
</style>
