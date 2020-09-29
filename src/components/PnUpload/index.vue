<template>
  <div style="height: 88px">
    <el-upload
      class="avatar-uploader"
      :action="action"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :on-success="successUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'PnUpload',
  props: {
    // 服务器地址
    resources: {
      type: String,
      default: 'url'
    },
    // 参数
    data: {
      type: Object,
      default: () => {}
    },
    // 父组件传过来的图片路径
    backtrack: {
      type: String,
      default: ''
    },
    // 图片大小
    size: {
      type: Number,
      default: 0
    }

  },
  data() {
    return {
      imageUrl: ''
    }
  },
  computed: {
    action() {
      return window.location.origin + this.resources
    }
  },
  watch: {
    backtrack: {
      handler: function(val) {
        this.imageUrl = val
      },
      immediate: true
    }
  },
  methods: {
    // 文件上传之前的钩子
    async beforeUpload(file) {
      const isLtSize = file.size / 1024 / 1024 < this.size
      if (!isLtSize) {
        this.$message.error(`上传的图片大小不能超过 ${this.size}MB!`)
        return isLtSize
      }
    },

    // 文件上传成功时的钩子
    successUpload(response, file) {
      this.$emit('update:backtrack', response.data)
    },

    // Base64装换为文件
    BaseToFile: (database64, filename) => {
      const arr = database64.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    },

    // 文件转换为Base64
    FileToBase: file => {
      return new Promise(function(resolve, reject) {
        const reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file.raw)
        reader.onload = function() {
          imgResult = reader.result
        }
        reader.onerror = function(error) {
          reject(error)
        }
        reader.onloadend = function() {
          resolve(imgResult)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  /deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 88px;
    height: 88px;
    line-height: 88px;
    text-align: center;
  }
  .avatar {
    width: 88px;
    height: 88px;
    display: block;
  }
</style>
