<template>
  <el-dialog class="dialog-temp" :visible.sync="showDialog" width="20%" :close-on-click-modal="showClose" :show-close="showClose">
    <!--关闭按钮-->
    <div class="icon-box" @click="showDialog = false">
      <i class="el-icon-close" />
    </div>
    <div class="title">自定义尺寸</div>
    <div class="content">
      <el-input v-model="fileName" placeholder="请输入文件名" />
      <el-input v-model="fileWidth" type="number" placeholder="请输入文件宽（PX）" />
      <el-input v-model="fileHeight" type="number" placeholder="请输入文件高（PX）" />
    </div>

    <div class="flex-between footer-bottom">
      <el-button size="medium" @click="showDialog = false">取 消</el-button>
      <el-button type="primary" size="medium" @click="handleComfirm">确 认</el-button>
    </div>

  </el-dialog>
</template>

<script>
import { dialog } from '@/mixins/dialog.js'
export default {
  name: 'Login',
  mixins: [dialog],
  data() {
    return {
      fileName: null,
      fileWidth: null,
      fileHeight: null
    }
  },
  methods: {
    handleComfirm() {
      if (!this.fileName || !this.fileWidth || !this.fileHeight) {
        this.$message('请输入画图的属性信息')
        return false
      }
      window.open(`/imgEditor?height=${this.fileHeight}&width=${this.fileWidth}&name=${this.fileName}`)
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
  /deep/ input[type=number] {
    -moz-appearance:textfield;
  }
  /deep/ input[type=number]::-webkit-inner-spin-button,
  /deep/ input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .dialog-temp{
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
      color: #1890ff;
      font-weight: bold;
      font-size: 16px;
    }
    .content{
      padding: 10px;
      /deep/ .el-input__inner{
        margin: 8px 0;
      }
    }
    .footer-bottom{
      padding: 10px;
    }

  }
</style>

