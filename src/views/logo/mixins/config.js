const mixins = {
  data() {
    return {
      element: [],
      logoList: [],
      element_id: null,
      category_id: null,
      color_id: null
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      this.getElement()
      this.getLogo()
    },

    // 获取元素
    async getElement() {
      const resources = [{ name: 'element' }]
      const res = await this.api.restful({ resources, loading: false })
      this.element = res.data
    },

    // 获取列表
    async getLogo() {
      const resources = [{ name: 'logo' }]
      const params = {
        category_id: this.category_id,
        color_id: this.color_id,
        element_id: this.element_id,
        page: this.page,
        per_page: this.per_page
      }
      const res = await this.api.restful({ resources, params, loading: false })
      this.total = res.meta.pagination.total
      this.logoList = res.data
    }
  }
}

export default mixins
