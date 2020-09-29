<template>
  <div class="certification">
    <div class="certification-title1">认证管理</div>
    <div class="certification-title2">通过认证后，即可上传你的作品，作品一经通过，即可获得持续性收入</div>
    <div class="certification-title3">
      <span>1</span>
      <span>完善资料</span>
      <span v-if="$store.state.user.userInfo.designer !== null" />
      <span v-if="$store.state.user.userInfo.designer !== null" />
      <span v-if="$store.state.user.userInfo.designer !== null" />
      <span v-if="$store.state.user.userInfo.designer !== null">2</span>
      <span v-if="$store.state.user.userInfo.designer !== null">{{ $store.state.user.userInfo.designer!==null && $store.state.user.userInfo.designer.status === 0 ? '审核中' : $store.state.user.userInfo.designer!==null && $store.state.user.userInfo.designer.status === 1 ? '审核通过' : '审核不通过' }}</span>
    </div>
    <div class="certification-title4">
      <span />
      <span>个人信息</span>
    </div>
    <div class="certification-title5">请确保你的姓名和身份证件、支付宝账号的姓名一致性，图帮主尊重你的隐私并严格保密你的个人信息</div>

    <el-form ref="form" :model="form" :rules="rules" class="from-row">
      <el-row v-for="(item,index) in formKeys" :key="index">
        <el-form-item :prop="item.key" :label="item.label" label-width="80px">
          <el-input v-if="item.type === 'input' || item.type === 'password'" v-model="form[item.key]" :placeholder="item.label" :show-password="item.type === 'password'" />
          <el-input v-if="item.type === 'code'" v-model="form[item.key]" :placeholder="item.label">
            <el-button slot="append" :disabled="countdown !== 60" @click="handleSendCode"> {{ countdown === 60 ? '验证码' : countdown }}</el-button>
          </el-input>
        </el-form-item>
      </el-row>
    </el-form>

    <div class="certification-title4">
      <span />
      <span>版权备案资料（身份证）</span>
    </div>

    <div class="upload-idCard">
      <div class="mr-15px">
        <pn-upload :size="5" :backtrack.sync="form.id_card_z" resources="/api/upload" />
        <div class="positive-title">手持身份证正面照</div>
      </div>
      <div>
        <pn-upload :size="5" :backtrack.sync="form.id_card_f" resources="/api/upload" />
        <div class="positive-title">手持身份证反面照</div>
      </div>
    </div>

    <div class="certification-title7">特别说明：</div>
    <div class="certification-title8">· 手持身份证正反面照片请保证照片清晰，建议他人帮助拍摄，手机前置摄像头拍摄会导致身份证信息镜像，请不要上传镜像的身份证信息</div>
    <div class="certification-title8">· 建议上传5M以内的jpg、jpeg或png格式图片</div>
    <div class="submit">
      <el-button :disabled="$store.state.user.userInfo.designer!==null && ($store.state.user.userInfo.designer.status === 0 || $store.state.user.userInfo.designer.status === 1)" type="primary" round @click="handleSubmit">下一步</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Index', // 认证管理
  data() {
    return {
      countdown: 60,
      form: {},
      formKeys: [
        { label: '真是姓名', key: 'name', type: 'input' },
        { label: '身份证号', key: 'id_card', type: 'input' },
        { label: '手机号码', key: 'phone', type: 'input' },
        { label: '验证码', key: 'code', type: 'code' },
        { label: '支付宝', key: 'alipay', type: 'input' },
        { label: '联系QQ', key: 'qq', type: 'input' }
      ]
    }
  },
  computed: {
    // 表单校验规则
    rules() {
      const rules = {}
      this.formKeys.forEach(item => {
        rules[item.key] = [{ required: true, message: `请输入${item.label}` }]
        if (item.key === 'phone') {
          rules[item.key].push({ min: 11, max: 11, message: '请输入正确的手机号码' })
        }
        if (item.key === 'id_card') {
          rules[item.key].push({ min: 18, max: 18, message: '请输入正确的身份证号码' })
        }
      })
      return rules
    }
  },
  created() {
    this.getUserInfo().then(res => {
      console.log(res)
      if (res.data.designer !== null) {
        this.formKeys.forEach(item => {
          // this.form[item.key] = res.data.designer[item.key]
          this.$set(this.form, item.key, res.data.designer[item.key])
        })
        this.$set(this.form, 'id_card_z', res.data.designer.id_card_z)
        this.$set(this.form, 'id_card_f', res.data.designer.id_card_f)
      }
    })
  },
  methods: {
    ...mapActions([
      'getUserInfo'
    ]),
    // 点击发送验证码
    async handleSendCode() {
      if (!this.form.phone) {
        this.$message('请输入手机号码或者邮箱')
      } else {
        const resources = [{ name: 'VerifyCode' }]
        const method = 'post'
        const data = { key: this.form.phone }
        const res = await this.api.restful({ resources, method, data })
        this.Countdown()
      }
    },

    // 倒计时
    Countdown() {
      this.countdown = this.countdown - 1
      if (this.countdown === 0) {
        this.countdown = 60
        return
      }
      setTimeout(this.Countdown, 1000)
    },

    // 点击下一步
    handleSubmit() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          if (!this.form.id_card_z || !this.form.id_card_f) {
            this.$message('身份证照片不能为空')
            return false
          }
          // 通过表单校验
          const resources = [{ name: 'designer' }]
          const method = 'post'
          const data = this.$objClone(this.form)
          data.user_id = this.$store.state.user.userInfo.id
          data.status = this.$store.state.user.userInfo.designer !== null && this.$store.state.user.userInfo.designer.status === 2 ? 0 : 0
          const res = await this.api.restful({ resources, method, data })
          if (res.status_code === 200) {
            this.getUserInfo() // 重新获取用户信息
          }
        } else {
          this.$message('请重新检查提交信息是否有误')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.certification{
  background: white;
  box-sizing: border-box;
  padding: 20px 25px 56px 22px;
  .certification-title1{
    font-size: 14px;
    color: #5e5d5d;
    line-height: 1;
  }
  .certification-title2{
    width: 100%;
    margin-top: 12px;
    font-size: 14px;
    color: #919191;
    line-height: 1;
    box-sizing: border-box;
    padding-bottom: 12px;
    border-bottom: 1px solid #ddd;
  }
  .certification-title3{
    margin-top: 44px;
    box-sizing: border-box;
    padding-left: 21px;
    display: flex;
    align-items: center;
    span:nth-child(1){
      width: 48px;
      height: 48px;
      background: #0083e9;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Arial;
      color: #fff;
      font-size: 20px;
      border-radius: 4px;
    }
    span:nth-child(2){
      margin-left: 6px;
      width: 146px;
      height: 48px;
      background: #0083e9;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: #fff;
      border-radius: 4px;
    }
    span:nth-child(3){
      width: 6px;
      height: 6px;
      background: #ddd;
      border-radius: 3px;
      margin-left: 18px;
    }
    span:nth-child(4){
      width: 6px;
      height: 6px;
      background: #ddd;
      border-radius: 3px;
      margin-left: 6px;
    }
    span:nth-child(5){
      width: 6px;
      height: 6px;
      background: #ddd;
      border-radius: 3px;
      margin-left: 6px;
    }
    span:nth-child(6){
      margin-left: 18px;
      width: 48px;
      height: 48px;
      background: #9F9999;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Arial;
      color: #fff;
      font-size: 20px;
      border-radius: 4px;
    }
    span:nth-child(7){
      margin-left: 6px;
      width: 146px;
      height: 48px;
      background: #9F9999;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: #fff;
      border-radius: 4px;
    }

  }
  .certification-title4{
    margin-top: 54px;
    box-sizing: border-box;
    padding-left: 21px;
    display: flex;
    align-items: center;
    span:nth-child(1){
      display: inline-block;
      width: 3px;
      height: 18px;
      background: #0083e9;
    }
    span:nth-child(2){
      margin-left: 6px;
      font-size: 16px;
      color: #282828;
      line-height: 1;
      font-weight: 700;
    }
  }
  .certification-title5{
    box-sizing: border-box;
    padding-left: 21px;
    margin-top: 10px;
    font-size: 12px;
    color: #919191;
    line-height: 1;
  }
  .from-row{
    margin-top: 33px;
    padding-left: 21px;
    box-sizing: border-box;
    padding-bottom: 43px;
    border-bottom: 1px solid #ebebeb;
    width: 450px;
  }
  .upload-idCard{
    margin-top: 18px;
    display: flex;
    padding-left: 21px;
    /deep/ .avatar-uploader-icon {
      font-size: 40px;
      width: 150px;
      height: 150px;
      line-height: 150px;
    }
    /deep/ .avatar {
      width: 150px;
      height: 150px;
    }
    .positive-title{
      margin-top: 80px;
      font-size: 14px;
      color: #5e5d5d;
      display: flex;
      justify-content: center;
    }
  }
  .certification-title7{
    margin-top: 50px;
    box-sizing: border-box;
    padding-left: 21px;
    font-size: 14px;
    color: #5e5d5d;
    line-height: 1;
    font-weight: 700;
  }
  .certification-title8{
    margin-top: 18px;
    box-sizing: border-box;
    padding-left: 21px;
    font-size: 14px;
    color: #939393;
    line-height: 1;
  }
  .submit{
    /deep/ .el-button{
      margin-top: 30px;
      margin-left: 21px;
      padding: 12px 50px;
    }
  }
}
</style>
