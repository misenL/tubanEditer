<template>
  <div>
    <div class="layout">
      <!--导航栏-->
      <div class="menu">
        <ul>
          <li v-for="(item,index) in featuresList" :key="index" :class="title_id == item.id ? 'active' : ''" class="pointer" @click="handleTitle(item)">{{ item.title }}</li>
        </ul>
      </div>
      <!---分类列表-->
      <div class="classify">
        <div v-for="(item,index) in classfiyList" :key="index" class="classify-item pointer" :style="classfiy_id == item.id ? ' background: #1890ff' : ''" @click="handleClassfiy(item)">
          <div class="item-icon"><i class="iconfont" :class="item.icon_class" /></div>
          <div class="title" :style="classfiy_id == item.id ? ' color:#fff' : ''">{{ item.title }}</div>
        </div>
      </div>
      <!--列表-->
      <div class="design-list">
        <ul>
          <li class="created pointer" @click="handleCreatedTemplage">
            <div class="icon">
              <i class="el-icon-circle-plus-outline" />
            </div>
            <div class="list-info">
              <div>新建模板</div>
              <div />
            </div>
          </li>

          <li v-for="(item,index) in templateList" :key="index" class="pointer" @click="handleTemplate(item)" @mouseenter="handleMouseenter(item)" @mouseleave="handleMouseleave(item)">
            <div style="position: relative">
              <img :src="item.url">
              <div :ref="'template_' + item.id" class="like" style="display: none" @click.stop="handleCancelKeep(item)">
                <i class="iconfont iconshoucang font-30px color-gray" :class="item.keep.length ? 'color-red' : 'color-gray'" />
              </div>
            </div>
            <div class="list-info">
              <div>{{ item.title }}</div>
              <div>{{ item.size }} px</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import config from './mixins/config.js'
export default {
  name: 'Index',
  mixins: [config],
  data() {
    return {
      title_id: null,
      classfiyList: [],
      classfiy_id: null,
      templateList: []
    }
  },
  methods: {
    // 点击一级模板
    handleTitle(item) {
      this.title_id = item.id
      this.classfiyList = []
      this.templateList = []
      if (item.child.length) {
        item.child.map(res => {
          this.recursive(res)
        })
      }
      this.handleClassfiy(this.classfiyList[0])
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
        return false
      }
    },

    // 点击分类, 获取分类列表
    async handleClassfiy(item) {
      this.classfiy_id = item ? item.id : 0
      const resources = [{ name: 'product' }]
      const params = { category_id: item.id }
      const res = await this.api.restful({ resources, params, loading: false })
      if (this.$isSucc(res)) {
        this.templateList = res.data
      }
    },

    // 创建模板
    handleCreatedTemplage() {
      window.open('/imgEditor')
    },

    // 修改模板
    // handleEditTemplate(item) {
    //   window.open('/imgEditor?type=0&id=' + item.id)
    // },

    // 鼠标进入
    handleMouseenter(item) {
      this.$refs['template_' + item.id][0].style.display = 'block'
    },

    // 鼠标离开
    handleMouseleave(item) {
      for (const key in this.$refs) {
        if (this.templateList.filter(item => 'template_' + item.id == key).length) {
          this.$refs[key][0].style.display = 'none'
        }
      }
    },

    // 取消收藏或加入收藏
    async handleCancelKeep(item) {
      if (item.keep.length) {
        const resources = [{ name: 'keep', id: item.keep[0].id }]
        const method = 'delete'
        const loading = false
        const res = await this.api.restful({ resources, method, loading })
        if (this.$isSucc(res)) {
          this.$message.success('已取消收藏')
          this.initData()
        }
      } else {
        const resources = [{ name: 'keep' }]
        const method = 'post'
        const loading = false
        const data = {
          product_id: item.id,
          user_id: this.$store.state.user.userInfo.id,
          type: 0
        }
        const res = await this.api.restful({ resources, method, data, loading })
        if (this.$isSucc(res)) {
          this.$message.success('已加入收藏')
          this.initData()
        }
      }
    },

    // 点击模板
    handleTemplate(item) {
      window.open(`/detail?id=${item.id}&type=0`)
    }
  }
}
</script>

<style lang="less" scoped>
body{
  font-size: 0 !important;
}
#layout__view {
  position: absolute;
  top: 1.3rem;
  width: 100%;
  background-color: #f2f2f2;
}
.menu{
    width: 100%;
    margin-top: 30px;
    ul{
        width: 100%;
        background: #fff;
        height: 51px;
        box-sizing: border-box;
        border-bottom: 2px solid #0084e9;
        padding-left: 24px;
        display: flex;
        align-items: center;
        li{
            list-style: none;
            margin-right: 54px;
        }
        .active{
            color:#0083E9;
            font-size: 16px;
            font-weight: 600;
        }
    }
}

.classify{
    margin-top: 20px;
    display: flex;
    flex-flow:row wrap;
    .classify-item{
        width: 8.65%;
        height: 103px;
        background: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        margin-right: 5px;
        margin-bottom: 6px;
        .item-icon{
          width: 41px;
          height: 41px;
          font-size: 18px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 100%;
          background: #ededed;
        }
    }
    .title{
        font-size: 12px;
        line-height: 1;
        color: #444;
        margin-top: 12px;
    }
}

.design-list{
    width: 1190px;
    .like{
      position: absolute;
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background: white;
      z-index: 100;
      top: 10px;
      right: 10px;
      text-align: center;
      line-height: 40px;
    }
    ul{
        // width: 100%;
        // display: flex;
        // flex-wrap: wrap;
        padding: 0;
        webkit-column-width: auto;
        -moz-column-width: auto;
        column-width: auto;
        -webkit-column-count: 5;
        -moz-column-count: 5;
        column-count: 5;
        -webkit-column-gap: 12px;
        -moz-column-gap: 12px;
        column-gap: 12px;
        .created{
          .icon{
            width: 100%;
            min-height: 1.2rem;
            display: flex;
            justify-content: center;
            background: #f8f8f8;
            font-size: 50px;
            align-items: center;
            color: #b3b3b3;
          }
        }
        li{
            -webkit-column-break-inside: avoid;
            break-inside: avoid;
            margin-right: 23px;
            margin-bottom: 24px;
            list-style: none;
            box-shadow: 0 2px 9px rgba(0,0,0,.05);
            text-decoration: none;
            display: block;
            width: 219px;
            img{
                width: 100%;
                // height: 219px
            }
            .list-info{
                width: 100%;
                background: #fff;
                height: 66px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-top: -5px;
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
</style>
