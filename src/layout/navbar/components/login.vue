<template>
  <el-dialog class="dialog-tem" :visible.sync="showDialog" width="20%" :close-on-click-modal="showClose" :show-close="showClose">
    <!--关闭按钮-->
    <div class="icon-box" @click="showDialog = false">
      <i class="el-icon-close" />
    </div>
    <!--标题-->
    <i class="el-icon-right title" />
    <span v-if="submitType === 1" class="title">账号密码登录</span>
    <span v-if="submitType === 2" class="title">账号密码注册</span>
    <span v-if="submitType === 3" class="title">账号找回密码</span>
    <!--表单-->
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
    <el-button v-if="submitType === 1" type="primary" size="medium" @click="handleSignIn" @keydown.enter="handleSignIn">登录</el-button>
    <el-button v-if="submitType === 2" type="primary" size="medium" @click="handleSubmitRegister">确定注册</el-button>
    <el-button v-if="submitType === 3" type="primary" size="medium" @click="findBackPassword">确定信息</el-button>
    <div class="flex-end">
      <div v-if="submitType !== 1" class="register mr-10px" @click="submitType = 1">登录</div>
      <div v-if="submitType !== 2" class="register mr-10px" @click="submitType = 2">注册</div>
      <div v-if="submitType !== 3 && submitType!== 2" class="find-back" @click="submitType = 3">忘记密码</div>
    </div>
  </el-dialog>

</template>

<script>
import { mapActions } from 'vuex'
import { dialog } from '@/mixins/dialog.js'
export default {
  name: 'Login',
  mixins: [dialog],
  props: {
    showType: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      submitType: 1, // 1为登录, 2为注册, 3为找回密码
      countdown: 60,
      rules: {
        name: [
          { required: true, message: '请输入姓名' }
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
        { label: '请输入姓名', key: 'name', type: 'input', submitType: [2] },
        { label: '请输入手机号或者邮箱登录', key: 'username', type: 'input', submitType: [1, 2, 3] },
        { label: '请输入验证码', key: 'code', type: 'code', submitType: [2, 3] },
        { label: '请输入密码', key: 'password', type: 'password', submitType: [1, 2, 3] },
        { label: '请再次输入密码', key: 'onceAgain', type: 'password', submitType: [2, 3] }
      ]
    }
  },
  watch: {
    showType(val) {
      this.submitType = this.showType
    },
    submitType(val) {
      this.form = {}
    }
  },
  methods: {
    // 引入vux
    ...mapActions([
      'handleLogin',
      'getUserInfo',
      'handleRegister',
      'handleFindPassword'
    ]),

    // 发送验证码
    async handleSendCode() {
      const perEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      const perPhone = /^(13[0-9]{1}|14[0-9]{1}|15[0-9]{1}|166|17[0-9]{1}|18[0-9]{1}|19[8-9]{1}){1}\d{8}$/
      if (!perEmail.test(this.form.username) && !perPhone.test(this.form.username)) {
        this.$message.error('请输入正确的手机号码或邮箱')
        return false
      }
      // TODO 发起获取验证码请求
      const resources = [{ name: 'VerifyCode' }]
      const method = 'post'
      const data = { key: this.form.username }
      const res = await this.api.restful({ resources, method, data })
      this.Countdown()
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

    // 登录
    handleSignIn() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.handleLogin(this.form).then((res) => {
            if (this.$isSucc(res)) {
              this.getUserInfo().then(() => {
                this.$message.success('登录成功')
                this.showDialog = false
              })
            }
          })
        }
      })
    },

    // 注册
    handleSubmitRegister() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.password === this.form.onceAgain) {
            this.handleRegister(this.form).then(res => {
              if (this.$isSucc(res)) {
                this.$message.success('注册成功')
                const form = { username: this.form.username, password: this.form.password }
                this.handleLogin(form).then((res) => {
                  if (this.$isSucc(res)) {
                    this.getUserInfo().then(() => {
                      this.$message.success('登录成功')
                      this.showDialog = false
                    })
                  }
                })
              }
            })
          } else {
            this.$message('两次密码不一致')
          }
        }
      })
    },

    // 找回密码
    findBackPassword() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.password === this.form.onceAgain) {
            this.handleFindPassword(this.form).then(res => {
              if (this.$isSucc(res)) {
                this.$message.success('密码修改成功')
                this.submitType = 1
              }
            })
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
/deep/ .el-dialog__header{
    padding: 0;
}
/deep/ .el-button--medium {
        width: 100%;
    }
.dialog-tem{
    position: relative;
    .icon-box{
        width: 25px;
        height: 25px;
        font-size: 20px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #1890ff;
        background: white;
        border-radius: 100%;
        position: absolute;
        right: -35px;
        top: -25px;
    }
    .title{
        font-size: 15px;
        color: #484444;
    }
    .from-row{
        margin-top: 30px;
    }
    .find-back{
        font-size: 12px;
        color: #bfbfbf;
        padding-bottom: 2px;
        cursor: pointer;
        margin-top: 10px;
    }
    .find-back:hover{
        color: #1890ff;
    }
    .register{
        font-size: 12px;
        color: #bfbfbf;
        padding-bottom: 2px;
        cursor: pointer;
        margin-top: 10px;
    }
    .register:hover{
        color: #1890ff;
    }
}
</style>
