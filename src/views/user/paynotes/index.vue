<template>
  <div class="paynotes-box">
    <div v-if="list.length">
      <div v-for="(item,index) in list" :key="index" class="list-item">
        <div>交易编号：{{ item.out_trade_no }},{{ item.name }}{{ item.money }}元,交易时间：{{ item.created_at }},交易状态：{{ status[item.status] }}</div>
      </div>
    </div>
    <div v-else class="mt-40px">暂无支付记录</div>

    <!--分页-->
    <el-pagination
      v-if="list.length"
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
export default {
  name: 'Index',
  data() {
    return {
      list: [],
      total: 0, // 总数
      page: 1, // 当前页
      per_page: 10, // 每页显示多少
      status: ['未支付', '支付成功', '支付失败']
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 页面初始化
    initData() {
      this.getPayRecord()
    },

    async getPayRecord() {
      const resources = [{ name: 'payRecord' }]
      const params = {
        page: this.page, // 当前页
        per_page: this.per_page, // 每页显示多少
        sort_by: '-created_at'
      }
      const res = await this.api.restful({ resources, params })
      if (this.$isSucc(res)) {
        this.total = res.meta.pagination.total
        this.list = res.data
      }
    },

    // 分页
    handleCurrentChange(page) {
      this.page = page
      this.getPayRecord()
    }
  }
}
</script>

<style lang="scss" scoped>
.paynotes-box{
  position: relative;
  font-size: 16px;
  background: white;
  min-width: 812px;
  max-width: 812px;
  min-height: 540px;
  margin: auto;
  margin-top: 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
  .list-item{
    list-style: none;
    width: 764px;
    min-height: 50px;
    line-height: 2em;
    background: #f6f6f6;
    margin-top: 13px;
    box-sizing: border-box;
    padding: 0 7px;
    display: flex;
    align-items: center;
  }
  .pagination{
    margin: 15px;
    padding-right: 75px;
    width: 100%;
    text-align: end;
    /*position: absolute;*/
    /*bottom: 0;*/
  }
}
</style>
