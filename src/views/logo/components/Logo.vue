<template>
  <div>
    <div class="design-menu">
      <div class="flex">
        <p class="element-title">元素</p>
        <ul class="element-list ">
          <li class="item pointer" :class="!element_id ? 'item-active': ''" @click="handleEelement(null)">全部</li>
          <li v-for="(item, index) in element.element" :key="index" class="item pointer" :class="element_id ===item.id? 'item-active': ''" @click="handleEelement(item.id)">{{ item.title }}</li>
        </ul>
      </div>
      <div class="flex">
        <p class="element-title">用途</p>
        <ul class="element-list ">
          <li class="item pointer" :class="!category_id ? 'item-active': ''" @click="handleCategory(null)">全部</li>
          <li v-for="(item, index) in element.use" :key="index" class="item pointer" :class="category_id === item.id ? 'item-active': ''" @click="handleCategory(item.id)">{{ item.title }}</li>
        </ul>
      </div>
      <div class="flex">
        <p class="element-title">色系</p>
        <ul class="element-list ">
          <li class="item pointer" :class="!color_id ? 'item-active': ''" @click="handleColor(null) ">全部</li>
          <li v-for="(item, index) in element.color" :key="index" class="color-item pointer" :style="`background-color:${item.code}`" @click="handleColor(item.id)">
            <i v-if="color_id === item.id" class="el-icon-check" />
          </li>
        </ul>
      </div>
    </div>

    <!--列表-->
    <div class="design-list">
      <ul>
        <li class="created template__transition pointer" @click="handleCreatedLogo">
          <div class="icon">
            <i class="el-icon-circle-plus-outline" />
          </div>
          <div class="list-info">
            <div>新建空白画布</div>
            <div>800px  * 800px</div>
          </div>
        </li>

        <li v-for="(item,index) in logoList" :key="index" class="template__transition pointer" @click="handleEditLogo(item)">
          <div><img :src="item.url || item.thumbnail"></div>
          <div class="list-info">
            <div>{{ item.title }}</div>
            <div>元素：<span v-for="(element,ii) in item.element" :key="ii">{{ element.title }}</span></div>
          </div>
        </li>
      </ul>
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
import config from '../mixins/config'
export default {
  name: 'Design',
  mixins: [config],
  data() {
    return {
      total: 0, // 总数
      page: 1, // 当前页
      per_page: 24 // 每页显示多少
    }
  },
  methods: {
    // 切换元素
    handleEelement(id) {
      this.element_id = id
      this.getLogo()
    },

    // 切换用途
    handleCategory(id) {
      this.category_id = id
      this.getLogo()
    },

    // 切换用途
    handleColor(id) {
      this.color_id = id
      this.getLogo()
    },

    // 分页
    handleCurrentChange(page) {
      this.page = page
      this.getLogo()
    },

    // 创建Logo
    async handleCreatedLogo() {
      window.open('/imgEditor?height=800&width=800')
    },

    // 编辑logo
    handleEditLogo(item) {
      // window.open('/imgEditor?height=800&width=800&type=1&id=' + item.id)
      window.open(`/detail?id=${item.id}&type=1`)
    }

  }
}
</script>

<style lang="less" scope>
/deep/ .el-popover{
    min-width: 0.5rem !important;
}
body{
  font-size: 0 !important;
}
.design-menu{
     width: 1190px;
    margin: 0 auto;
    background: #fff;
    box-sizing: border-box;
    padding: 28px 0 15px 23px;
     ul{
          list-style: none;
          margin: 0;
    }
    .element-title{
        font-size: 14px;
        color: #989898;
        margin: 0;
    }
    .element-list {
        display: flex;
        flex-wrap: wrap;
        width: 931px;
        .item{
          list-style: none;
          margin-right: 24px;
          margin-bottom: 13px;
          text-decoration: none;
          height: 21px;
          box-sizing: border-box;
          font-size: 14px;
          color: #444;
          line-height: 1;
        }
        .item-active{
          color: #1890ff;
          border-bottom: 3px solid #1890ff;
        }
        .color-item{
              text-decoration: none;
              display: flex;
              align-items: center;
              justify-content: center;
              box-sizing: border-box;
              width: 29px;
              height: 18px;
              font-size: 18px;
              border-radius: 2px;
              color: #1890ff;
              box-shadow: 0 2px 4px rgba(0,0,0,.2);
              position: relative;
              margin-right: 6px;
              margin-bottom: 13px;
        }
    }
}
.design-select{
    box-sizing: border-box;
    width: 1190px;
    margin: 10px auto;
    background: #fff;
    height: 48px;
    padding-left: 18px;
    line-height: 43px;
    display: flex;
    align-items: center;
    .title{
        font-size: 14px;
        color: #989898;
        margin: 0;
    }
    .select{
        padding-left: 14px;
        padding-right: 10px;
        display: flex;
        align-items: center;
        margin: 0;
        cursor: pointer;
        font-size: 14px;
        color: #5e5d5d;
    }
}

.design-list{
    width: 1211px;
    margin: 24px auto 0;
    ul{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        margin-left: 12px;
        .created{
          .icon{
            width: 100%;
            height: 2.19rem;
            display: flex;
            justify-content: center;
            background: #f8f8f8;
            font-size: 50px;
            align-items: center;
            color: #b3b3b3;
          }
        }
        li{
            margin-right: 23px;
            margin-bottom: 24px;
            list-style: none;
            position: relative;
            transition: .5s;
            box-shadow: 0 2px 9px rgba(0,0,0,.05);
            text-decoration: none;
            display: block;
            width: 219px;
            img{
                width: 100%;
                height: 219px
            }
            .list-info{
                width: 100%;
                background: #fff;
                height: 66px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                div:nth-child(1){
                    font-size: 14px;
                    color: #000000;
                    line-height: 1;
                }
                div:nth-child(2){
                    margin-top: 7px;
                    font-size: 14px;
                    color: #b3b3b3;
                    line-height: 1;
                    font-family: Arial;
                }
            }
        }
    }
}

.pagination{
  width: 1190px;
  margin: 10px auto;
  margin-bottom: 100px;
  text-align: end;
}
</style>
