<template>
  <div class="search__page">
    <p class="search__path"><span>搜索 > 共搜索到<font> {{ searchTotal }} </font>个与<font> "{{ keyName }}" </font>有关的模板</span></p>
    <div class="search__content">
      <li v-for="item in templateContent" :key="item.id" class="content__li" @click="handleTemplate(item)">
        <img :src="item.thumbnail" alt="">
        <div class="li__message">
          <p class="message__des">{{ item.introduction }}</p>
          <p class="message__info">
            <span class="info__name">{{ item.title }}</span>
            <span class="info__size">{{ item.size }}px</span>
          </p>
        </div>
      </li>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="searchTotal"
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
      searchTotal: 0, // 总数
      page: 1, // 当前页
      per_page: 23, // 每页显示多少
      pageTotal: 1, // 一共有多少分页
      keyName: '',
      templateContent: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    // 页面初始化
    initData() {
      this.keyName = this.$route.query.keyname
      this.getSearch()
    },

    // 发起搜索请求
    getSearch() {
      return new Promise((resolve, reject) => {
        const resources = [{ name: 'product' }]
        const params = { title: this.$route.query.keyname, per_page: this.per_page, page: this.page }
        this.api.restful({ resources, params }).then(res => {
          if (this.$isSucc(res)) {
            this.templateContent = res.data
            this.searchTotal = res.meta.pagination.total
            this.pageTotal = res.meta.pagination.total_pages
            resolve(res.data)
          } else {
            reject()
          }
        })
      })
    },

    handleCurrentChange(v) {
      this.page = v
      this.getSearch()
      console.log('handleCurrentChange', this.page)
    },

    handleTemplate(item) {
      window.open(`/detail?id=${item.id}&type=0`)
    }
  }
}
</script>
<style lang="less" scoped>
.search__page {
  .search__path,
  .search__content,
  .el-pagination {
    margin: 0 12vw;
  }
  .search__path {
    padding: 40px 0 30px 0;
    color: #a1a1a1;
    font-weight: 600;
    font {
      color: #0083e9;
    }
  }
  .search__content {
    columns: 14vw;
    column-width: auto;
    -webkit-column-width: auto;
    -moz-column-width: auto;
    column-count: 5;
    -webkit-column-count: 5;
    -moz-column-count: 5;
    column-gap: 12px;
    -webkit-column-gap: 12px;
    -moz-column-gap: 12px;
    position: relative;
    .content__li {
      width: 14vw;
      padding-bottom: 1px;
      cursor: pointer;
      position: relative;
      display: block;
      -moz-page-break-inside: avoid;
      -webkit-column-break-inside: avoid;
      break-inside: avoid;
      box-shadow: 1px 1px 8px rgba(197, 197, 197, .8);
      margin-bottom: 12px;
      img {
        width: 14vw;
        height: auto;
        display: block;
      }
      .li__message {
        padding: 0 10px;
        background-color: white;
        .message__des {
          margin: 0;
          padding: 20px 0 5px 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #000;
          font-size: .13rem;
        }
        .message__info {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-size: .11rem;
          padding-top: 10px;
          color: #969696;
          :first-child {
            margin-right: 5px;
          }
        }
      }
      .li__message::after {
        content: '';
        width: 100%;
        display: block;
        border-top: 1px solid rgb(197, 197, 197);
        position: relative;
        top: -36px;
      }
    }
  }
  .el-pagination {
    text-align: right;
    padding: 40px 0 15vh 0;
  }
}
</style>
