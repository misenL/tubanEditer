// 排序列表
const sortList = [
  {
    value: '0',
    label: '创建时间'
  },
  {
    value: '1',
    label: '修改时间'
  }
]

const config = {
  data() {
    return {
      sortList,
      sort_by: '0'
    }
  }
}

export default config
