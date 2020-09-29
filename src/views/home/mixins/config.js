import fa from 'element-ui/src/locale/lang/fa'

const mixins = {
  data() {
    return {
      featuresList: [],
      bannerList: [],
      middleList: [],
      dynamicsList: [],
      templateList: {}
    }
  },
  created() {
    this.initData()
    this.getDynamics()
  },
  methods: {
    // 页面初始化
    initData() {
      // 多个请求并发的处理方式
      Promise.all([this.getTemplate(), this.getMaterial()]).then(res => {
        this.featuresList = res[0]
        this.templateList = {}
        // res[0].map(item => {
        //   this.getProduct(item.id).then(resp => {
        //     this.$set(this.templateList, item.title, resp)
        //   })
        // })
        this.getProductList()
        this.bannerList = res[1].filter(item => item.type === 0)
        this.middleList = res[1].filter(item => item.type === 1)
      })
    },

    // 获取模板列表（在原有的基础上在抽一层，方便后边局部刷新）
    getProductList() {
      this.featuresList.map(item => {
        this.getProduct(item.id).then(resp => {
          this.$set(this.templateList, item.title, resp)
        })
      })
    },

    // 获取模板列表
    getTemplate() {
      return new Promise((resolve, reject) => {
        const resources = [{ name: 'category' }]
        const params = { type: 0 }
        this.api.restful({ resources, params }).then(res => {
          if (this.$isSucc(res)) {
            resolve(res.data)
          } else {
            reject()
          }
        })
      })
    },

    // 获取轮播图及下面模板(type 0是轮播图, 1是中间推荐模板(也就是轮播图下面的模板)
    getMaterial() {
      return new Promise((resolve, reject) => {
        const resources = [{ name: 'home' }]
        const params = { status: 1 }
        this.api.restful({ resources, params }).then(res => {
          if (this.$isSucc(res)) {
            resolve(res.data)
          } else {
            reject()
          }
        })
      })
    },

    // 获取商品推荐列表, 也就是模板推荐类别
    getProduct(id) {
      return new Promise((resolve, reject) => {
        const resources = [{ name: 'product' }]
        const params = { category_id: id }
        this.api.restful({ resources, params, loading: false }).then(res => {
          if (this.$isSucc(res)) {
            resolve(res.data)
          } else {
            reject()
          }
        })
      })
    },

    // 获取设计师动态列表
    getDynamics() {
      return new Promise((resolve, reject) => {
        const resources = [{ name: 'dynamics' }]
        this.api.restful({ resources, loading: false }).then(res => {
          if (this.$isSucc(res)) {
            let start = 0
            this.dynamicsList = res.data.slice(start, start + 3)
            start += 3
            setInterval(() => {
              if (start + 3 < res.data.length) {
                this.dynamicsList = res.data.slice(start, start + 3)
                start += 3
              } else {
                this.dynamicsList = res.data.slice(start, res.data.length)
                start = 0
              }
            }, 2000)
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
