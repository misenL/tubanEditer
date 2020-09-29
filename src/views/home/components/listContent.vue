<template>
  <div class="content">
    <div v-for="(childItem, ind) in mouseData.child" :key="ind" class="content__item">
      <div class="font-16px font-wiight">{{ childItem.title }}</div>
      <div class="list">
        <div v-for="(item, index) in childItem.child" :key="index" class="item pointer font-16px" @click="handleFeatures(item)">{{ item.title }}</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ListContent',
  components: {
  },
  props: {
    mouseData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      classfiyList: []
    }
  },
  watch: {
    mouseData: {
      handler(val, oldVal) {
        this.getClassfiy()
      },
      deep: true
    }
  },
  created() {
    console.log('list-content mouseData:', this.mouseData)
    this.getClassfiy()
  },
  methods: {
    // 获取分类列表
    getClassfiy() {
      this.classfiyList = []
      if (this.mouseData.child.length) {
        console.log('getClassfiy', this.mouseData)
        this.mouseData.child.map(res => {
          this.recursive(res)
        })
      }
    },

    // 递归模板所有分类
    recursive(list) {
      this.classfiyList.push(list)
      if (list.child.length) {
        if (list.child.length) {
          list.child.map(res => {
            this.recursive(res)
          })
        }
      } else {
        console.log('list-content classfiyList:', this.classfiyList)

        return false
      }
    },

    // 点击功能列表的模块
    handleFeatures(item) {
      window.open(`/template?classfiy_id= ${item.id}&title_id=${this.mouseData.id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.content{
  margin: 30px 0 0 10px;
  display: flex;
  justify-content: flex-start;
  flex-flow: row wrap;
  .content__item {
    padding-left: .2rem;
    width: 2.8rem;
    border-left-color: #d3d3d3;
    border-left-style: solid;
    border-left-width: 1px;
    padding-bottom: .1rem;
  }
  .content__item:nth-of-type(3n+1) {
    border: none;
  }
  .list{
    width: 2.8rem;
    margin-top: 20px;
    display: flex;
    flex-flow:row wrap;
    .item{
          list-style: none;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          min-width: 80px;
          margin-bottom: .15rem;
          color: #5f5f5f;
          border-left-color: #d3d3d3;
          border-left-style: solid;
          border-left-width: 1px;
    }
    .item:nth-of-type(3n+1) {
      border: none;
    }
  }
}
</style>
