const mixins = {
  data() {
    return {
      featuresList: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    // 页面初始化
    initData() {
      // 多个请求并发的处理方式
      Promise.all([this.getTemplate()]).then(res => {
        this.featuresList = res[0]
        // 筛选选中的一级分类
        this.handleTitle(this.featuresList.filter(item => item.id === Number(this.$route.query.title_id))[0])
        // 筛选选中的二级一下的分类并且获取对应的分类列表
        this.handleClassfiy(this.classfiyList.filter(item => item.id === Number(this.$route.query.classfiy_id))[0])
      })
    },

    // 获取模板列表
    getTemplate() {
      return new Promise((resolve, reject) => {
        const resources = [{ name: 'category' }]
        const params = { type: 0 }
        this.api.restful({ resources, params, loading: false }).then(res => {
          if (this.$isSucc(res)) {
            resolve(res.data)
          } else {
            reject()
          }
        })
      })
    }

  }
}

export default mixins
