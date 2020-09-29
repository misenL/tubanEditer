<template>
  <div>
    <div class="design-menu">
      <div class="flex">
        <p class="element-title">元素</p>
        <ul class="element-list ">
          <li v-for="(item, index) in classify" :key="index" class="item">{{ item }}</li>
        </ul>
      </div>
    </div>

    <div class="design-list">
      <ul>
        <li v-for="item in 20" :key="item">
          <div><img :src="$store.state.user.userInfo.avatar"></div>
          <div class="list-info">
            <div>建立空白画布</div>
            <div>800px*800px</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import config from '../mixins/config'
export default {
  name: 'Art',
  mixins: [config]
}
</script>

<style lang="less" scoped>
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
            }
        }
    }
}
</style>
