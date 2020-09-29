// 排序列表
const sortList = [
  {
    value: '-created_at',
    label: '购买时间'
  }
]

const config = {
  data() {
    return {
      sortList,
      sort_by: '-created_at'
    }
  }
}

export default config
