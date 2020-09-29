<template>
  <div>
    <div class="content">
      <!-- 头部文字 -->
      <div class="top__text">
        <span style="font-size: 18px">我的设计 · </span>
        <span style="color:#9d9d9d">共{{ total }}个文件</span>
      </div>
      <!--顶部筛选栏-->
      <div class="flex-between">
        <div class="flex">
          <div>
            排序：
            <el-select v-model="sort_by" placeholder="请选择" @change="initData()">
              <el-option
                v-for="item in sortList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <!--选择-->
          <div v-if="isEdit" class="flex-center selected">
            <div class="mr-30px">共选择0项</div>
            <div @click="handleAllCheck">全选</div>
            <div @click="handleAntiCheck">反选</div>
            <div @click="handleDeleteList">删除</div>
          </div>
        </div>
        <div class="pointer" @click="isEdit = !isEdit"><i class="el-icon-setting mr-10px" />{{ isEdit ? '取消操作' : '批量管理' }}</div>
      </div>
      <!--设计列表-->
      <div class="devise">
        <div v-for="(item,index) in list" :key="index" class="devise-list">
          <div class="content-img">
            <img :src="item.thumbnail" @click="handleContent">
            <div v-if="isEdit" class="content-active" @click="handlecontentSelect(item, index)">
              <div v-if="!item.isCheck" class="check-box" />
              <div v-if="item.isCheck" class="check-box" style="background: #000;opacity: 1 !important;">
                <i class="el-icon-check" />
              </div>
            </div>
          </div>
          <div class="flex-between mt-8px">
            <div class="content-title">{{ item.title }}</div>
            <!--更多按钮-->
            <el-popover placement="right" trigger="hover">
              <div class="more">
                <div @click="handleCopy(item)">复制</div>
                <div @click="handleDelete(item)">删除</div>
                <div @click="handleRename(item)">重命名</div>
                <div @click="handleDownload(item)">下载</div>
              </div>
              <i slot="reference" class="el-icon-more pointer" />
            </el-popover>
          </div>
          <div class="content-size">尺寸：{{ item.size }}</div>
        </div>
      </div>
    </div>

    <!--分页-->
    <el-pagination
      background
      class="pagination"
      layout="prev, pager, next"
      :total="total"
      :page-size="per_page"
      :current-page="page"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import config from './mixins/config.js'
export default {
  name: 'Index',
  mixins: [config],
  data() {
    return {
      isEdit: false,
      isShowMore: false,
      list: [],
      total: 0, // 总数
      page: 1, // 当前页
      per_page: 24 // 每页显示多少
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      this.gitTemplateList()
    },

    // 获取模板列表
    async gitTemplateList() {
      const resources = [{ name: 'product' }]
      const params = {
        page: this.page,
        per_page: this.per_page,
        user_id: this.$store.state.user.userInfo.id,
        sort_by: this.sort_by
      }
      const res = await this.api.restful({ resources, params })
      if (this.$isSucc(res)) {
        this.total = res.meta.pagination.total
        this.list = []
        res.data.map(item => {
          item.isCheck = false
          this.list.push(this.$objClone(item))
        })
      }
    },

    // 分页
    handleCurrentChange(page) {
      this.page = page
      this.gitTemplateList()
    },

    // 点击模板内容
    handleContent() {
      // console.log(123)
    },

    // 选择状态下点击模板（操作）
    handlecontentSelect(item, index) {
      this.$set(this.list[index], 'isCheck', !this.list[index].isCheck)
    },

    // 全选
    handleAllCheck() {
      this.list.forEach(item => {
        item.isCheck = true
      })
    },

    // 反选
    handleAntiCheck() {
      this.list.forEach(item => {
        item.isCheck = !item.isCheck
      })
    },

    // 批量删除
    async handleDeleteList() {
      const ids = []
      this.list.filter(item => item.isCheck).map(val => ids.push(val.id))
      const resources = [{ name: 'product', id: ids.join(',') }]
      const method = 'delete'
      const res = await this.api.restful({ resources, method })
      if (this.$isSucc(res)) {
        this.$message.success('删除成功')
        this.initData()
      }
    },

    // 删除
    async handleDelete(item) {
      const resources = [{ name: 'product', id: item.id }]
      const method = 'delete'
      const res = await this.api.restful({ resources, method })
      if (this.$isSucc(res)) {
        this.$message.success('删除成功')
        this.initData()
      }
    },

    // 复制
    async handleCopy(item) {
      const resources = [{ name: 'product' }]
      const method = 'post'
      const data = item
      delete data.id
      data.title = data.title.indexOf('副本') === -1 ? data.title + '（副本）' : data.title
      const res = await this.api.restful({ resources, method, data })
      if (this.$isSucc(res)) {
        this.initData()
        this.$message.success('复制成功')
      }
    },

    // 重命名
    handleRename(item) {
      this.$prompt('', '重命名', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async({ value }) => {
        const resources = [{ name: 'product', id: item.id }]
        const method = 'put'
        const data = {
          title: value
        }
        const res = await this.api.restful({ resources, method, data })
        if (this.$isSucc(res)) {
          this.$message.success('修改成功')
          this.initData()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改'
        })
      })
    },

    // 下载
    handleDownload(item) {
      const downImg = document.createElement('a')
      downImg.href = item.url
      downImg.download = item.title
      downImg.click()
    }
  }
}
</script>

<style lang="scss" scoped>
.content{
  height: calc(100vh - 150px);
  overflow-y: auto;
  .top__text {
    margin-bottom: 30px;
    display: flex;
    align-items: center;
  }
  .selected{
    background: white;
    margin-left: 30px;
    div{
      margin-left: 10px;
      font-size: 14px;
      cursor: pointer;
      color: #5e5d5d;
    }
    div:first-child{
      font-size: 12px;
      line-height: 1;
      cursor: auto;
      color: #b7b7b7;
    }
    div:last-child{
      margin-right: 10px;
    }
  }
  .devise{
    display: flex;
    flex-flow:row wrap;
    margin-top: 40px;
    .devise-list{
      margin-right: 18px;
      margin-bottom: 18px;
      .content-img{
        cursor: pointer;
        width: 191px;
        height: 191px;
        background: #eaeaea;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          transition: 0.6s;
          width: 171px;
          height: 171px;
        }
      }
      .content-img:hover{
        img{
          transition: .6s;
          width: 191px;
          height: 191px;
        }
      }
      .content-active{
        background: #4fa6ff;
        width: 191px;
        height: 191px;
        position: absolute;
        z-index: 200;
        opacity: 0.5;
        .check-box{
          width: 40px;
          height: 40px;
          border-radius: 100%;
          background: white;
          position: relative;
          top: 28%;
          left: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 30px;
          font-weight: bold;
        }
      }
      .content-title{
        font-size: 14px;
        color: #2e2e2e;
        max-width: 155px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1;
        text-align: center;
      }
      .content-size{
        width: 100%;
        display: flex;
        margin-top: 4px;
        font-size: 12px;
        color: #b9b9b9;
        height: 12px;
        margin-bottom: 0;
        line-height: 1;
      }
    }
  }
}
.more{
  div{
    max-width: 169px;
    font-size: 14px;
    padding: 0 10px;
    color: #5e5d5d;
    height: 28px;
    line-height: 28px;
  }
  div:hover{
    background: #4fa6ff;
    color: white;
    cursor: pointer;
  }
}
.pagination{
  text-align: end;
  margin-top: 20px;
}
</style>
