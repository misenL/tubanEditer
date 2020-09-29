<template>
  <div class="user-box box-shadow">
    <div class="info">
      <div class="ml-80px">
        <el-avatar :size="83" :src="$store.state.user.userInfo.avatar" />
      </div>
      <div class="ml-20px">
        <el-input v-model="userName" @blur="userNameBlur" />
        <!--          <div class="name">{{ this.$store.state.user.userInfo.name }}</div>-->
        <div v-if="this.$store.state.user.userInfo.email" class="id">邮箱 : {{ this.$store.state.user.userInfo.email }}</div>
        <div v-if="this.$store.state.user.userInfo.phone" class="id">手机 : {{ this.$store.state.user.userInfo.phone }}</div>
      </div>
    </div>
    <div v-if="submitType !== 1" class="pt-10px ml-10px font-14px color-gray" style="background: #fbfbfb;">
      <span class="pointer" @click="submitType = 1"><i class="el-icon-arrow-left" />返回信息页</span>
    </div>
    <!--用户信息内容-->
    <div v-if="submitType === 1" class="user-content">
      <div class="item">
        <div><i class="el-icon-phone mr-15px" />绑定手机</div>
        <div class="color-main pointer">
          <span v-if="$store.state.user.userInfo.phone" @click="submitType = 2">更改绑定</span>
          <span v-if="!$store.state.user.userInfo.phone" @click="submitType = 2">立即绑定</span>
        </div>
      </div>
      <div class="item">
        <div><i class="el-icon-s-promotion mr-15px" />绑定邮箱</div>
        <div class="color-main pointer">
          <span v-if="$store.state.user.userInfo.email" @click="submitType = 3">更改绑定</span>
          <span v-if="!$store.state.user.userInfo.email" @click="submitType = 3">立即绑定</span>
        </div>
      </div>
      <div class="item">
        <div class="pointer" @click="submitType = 4"><i class="el-icon-key mr-15px" />修改密码</div>
      </div>
    </div>
    <!--修改手机号码或者邮箱-->
    <div v-if="submitType !== 1" class="user-phone">
      <el-form ref="form" :model="form" :rules="rules" class="from-row">
        <el-row v-for="(item,index) in formKeys" :key="index">
          <el-form-item v-if="item.submitType.includes(submitType)" :prop="item.key">
            <el-input v-if="item.type === 'input' || item.type === 'password'" v-model="form[item.key]" :placeholder="item.label" :show-password="item.type === 'password'" />
            <el-input v-if="item.type === 'code'" v-model="form[item.key]" :placeholder="item.label">
              <el-button slot="append" :disabled="countdown !== 60" @click="handleSendCode"> {{ countdown === 60 ? '验证码' : countdown }}</el-button>
            </el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <!--按钮-->
      <el-button v-if="submitType === 2" type="primary" size="medium" @click="confirmBind">确认绑定手机</el-button>
      <el-button v-if="submitType === 3" type="primary" size="medium" @click="confirmBind">确认绑定邮箱</el-button>
      <el-button v-if="submitType === 4" type="primary" size="medium" @click="editPassword">确认修改密码</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Index',
  data() {
    return {
      submitType: 1, // 1为展示用户信息, 2为绑定手机号, 3绑定邮箱, 4修改密码
      countdown: 60,
      userName: this.$store.state.user.userInfo.name,
      rules: {
        phone: [
          { required: true, message: '请输入手机号码' }
        ],
        email: [
          { required: true, message: '请输入邮箱' }
        ],
        username: [
          { required: true, message: '请输入手机号码或邮箱' }
        ],
        code: [
          { required: true, message: '验证码' }
        ],
        password: [
          { required: true, message: '请输入密码' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符' }
        ],
        onceAgain: [
          { required: true, message: '请才再次输入密码' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符' }
        ]
      },
      form: {},
      formKeys: [
        { label: '请输入手机号码', key: 'phone', type: 'input', submitType: [2] },
        { label: '请输入邮箱', key: 'email', type: 'input', submitType: [3] },
        { label: '请输入用户账号', key: 'username', type: 'input', submitType: [4] },
        { label: '请输入验证码', key: 'code', type: 'code', submitType: [2, 3, 4] },
        { label: '请输入密码', key: 'password', type: 'password', submitType: [4] },
        { label: '请再次输入密码', key: 'onceAgain', type: 'password', submitType: [4] }
      ]
    }
  },
  methods: {
    // 引入vux
    ...mapActions([
      'handleEditInfo',
      'getUserInfo'
    ]),

    // 发送验证码
    async handleSendCode() {
      const perEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      const perPhone = /^(13[0-9]{1}|14[0-9]{1}|15[0-9]{1}|166|17[0-9]{1}|18[0-9]{1}|19[8-9]{1}){1}\d{8}$/
      let perKey = null
      let check = false
      let message = null
      switch (this.submitType) {
        case 2:
          perKey = this.form.phone
          check = perPhone.test(perKey)
          message = check ? '' : '请输入正确的手机号码'
          break
        case 3:
          perKey = this.form.email
          check = perEmail.test(perKey)
          message = check ? '' : '请输入正确的邮箱'
          break
        case 4:
          perKey = this.form.username
          check = perEmail.test(perKey) || perPhone.test(perKey)
          message = check ? '' : '请输入正确的手机号码或邮箱'
      }
      if (!check) {
        this.$message.error(message)
        return false
      }
      // TODO 发起获取验证码请求
      const resources = [{ name: 'VerifyCode' }]
      const method = 'post'
      const data = { key: perKey }
      const res = await this.api.restful({ resources, method, data })
      this.Countdown()
    },

    // 修改名字
    userNameBlur() {
      this.handleEditInfo({ name: this.userName }).then(res => {
        this.getUserInfo().then(() => {
          this.$message.success('修改成功')
        })
      })
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

    // 绑定或者更改绑定手机号码或邮箱
    confirmBind() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.handleEditInfo(this.form).then((res) => {
            this.getUserInfo().then(() => {
              this.$message.success('绑定成功')
              this.submitType = 1
            })
          })
        }
      })
    },

    // 修改密码
    async editPassword() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          if (this.form.password === this.form.onceAgain) {
            const resources = [{ name: 'changePwd' }]
            const method = 'post'
            const data = this.$objClone(this.form)
            const res = await this.api.restful({ resources, method, data })
            if (this.$isSucc(res)) {
              this.$message.success('修改成功')
              this.submitType = 1
            }
          } else {
            this.$message('两次密码不一致')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .user-box{
    font-size: 16px;
    background: white;
    min-width: 812px;
    max-width: 812px;
    min-height: 500px;
    margin: auto;
    margin-top: 100px;
  .info{
    box-sizing: border-box;
    background: #fff;
    width: 100%;
    height: 158px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e8e8e8;
    /deep/ .el-input__inner {
      padding: 0;
      border: 0;
      line-height: 0;
      font-size: 18px;
      color: #2f2f2f;
    }
  .name{
    font-size: 18px;
    color: #2f2f2f;
    display: block;
    max-width: 90px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .id{
    box-sizing: border-box;
    padding-left: 4px;
    margin-top: 13px;
    line-height: 1;
    font-size: 11px;
    color: #a5a5a5;
    font-family: Arial
  }
  }
  .user-content{
    box-sizing: border-box;
    width: 100%;
    min-height: 100%;
    background: #fbfbfb;
    padding: 41px 71px 65px;
  .item{
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    padding-left: 8px;
    margin-top: 41px;
    margin-bottom: 7px;
    justify-content: space-between;
    padding-right: 27px;
    cursor: pointer;
  }
  .item:hover{
    background: white;
    color: #1890ff;
    border-radius: 8px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  }
  }
  .user-phone{
    box-sizing: border-box;
    width: 100%;
    min-height: 100%;
    background: #fbfbfb;
    padding: 41px 200px 90px;
  }
  }
</style>
