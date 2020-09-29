<template>
  <div class="font-16px">
    <div class="work">
      <div class="header-left">
        <i class="el-icon-s-platform font-20px mr-5px" />
        <span>设计师工作台</span>
      </div>
      <!--导航栏-->
      <el-menu :default-active="$route.fullPath" class="el-menu-vertical-demo">
        <div v-for="(item,index) in sidebar" :key="index">
          <el-submenu v-if="item.children!==void(0)" :index="item.path">
            <template slot="title">
              <i :class="item.icon" />
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item v-for="(child,cndex) in item.children" :key="cndex" :index="child.path" @click="$router.push(child.path)">{{ child.title }}</el-menu-item>
          </el-submenu>

          <el-menu-item v-else :index="item.path" @click="$router.push(item.path)">
            <i :class="item.icon" />
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </div>
    <!--头部-->
    <div class="header">
      <div class="text-end">
        <el-button icon="el-icon-s-home" size="small" color="red" type="info" @click="$router.push('/')">我的首页</el-button>
      </div>
    </div>

    <!--页面内容-->
    <div class="page-body">
      <router-view class="router-view" />
      <!--左边用户信息-->
      <div class="userInfo">
        <div class="info">
          <div class="info-left">
            <img :src="$store.state.user.userInfo.avatar">
          </div>
          <div class="info-right">
            <p class="username">{{ $store.state.user.userInfo.name }}，{{ new Date().getHours() >= 12 ? '下午好' : '上午好' }}</p>
            <p class="time">今天是 {{ weeks[new Date().getDay()] }} {{ `${new Date().getFullYear()}年${new Date().getMonth()}月${new Date().getDate()}日` }}</p>
          </div>
        </div>

        <div class="all-info">
          <div class="info2">
            <p class="info2-title">收入状况</p>
            <p class="online-tem">
              <span>当前上架模板：</span>
              <span>{{ templateTotal }}</span>
            </p>
            <div class="balance">
              <div class="balance-title">
                <p class="balance-title1">余额：</p>
                <p class="balance-title2">{{ $store.state.user.userInfo.money }}</p>
                <p class="balance-title3">元</p>
              </div>
              <el-popover class="withdraw-box" placement="right" width="300" trigger="hover" title="余额提现">
                <el-input v-model="account" placeholder="请输入支付宝账号" class="mb-10px" />
                <el-input v-model="money" type="number" placeholder="请输入提现金额" class="mb-10px" />
                <div class="flex-end">
                  <el-button type="primary" size="medium" @click="handleWithdraw">确 认</el-button>
                </div>
                <div slot="reference" class="withdrawal pointer">提现</div>
              </el-popover>
            </div>
            <!--            <p class="lines" />-->
            <!--            <div class="cumulative">-->
            <!--              <p class="cumulative-title1">累积收入：</p>-->
            <!--              <p class="cumulative-title2">0.00</p>-->
            <!--              <p class="cumulative-title3">元</p>-->
            <!--            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Index',
  data() {
    return {
      account: null,
      money: null,
      templateTotal: 0,
      weeks: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      sidebar: [
        {
          title: '模板管理',
          icon: 'el-icon-location',
          path: 'muban',
          children: [
            {
              title: '我上传的模板',
              path: '/member/devise'
            }
          ]
        },
        // {
        //   title: '支付设置',
        //   icon: 'el-icon-location',
        //   path: '/workbench/withdraw'
        // },
        {
          title: '认证管理',
          icon: 'el-icon-location',
          path: '/workbench/certification'
        },
        {
          title: '模板文档',
          icon: 'el-icon-location',
          path: 'wendan',
          children: [
            {
              title: '收益说明',
              path: '/workbench/income'
            }
          ]
        }
      ]
    }
  },
  created() {
    document.getElementById('layout__view').style.top = 0

    // 上架模板数量
    const resources = [{ name: 'product' }]
    const params = {
      page: 1,
      per_page: 10,
      user_id: this.$store.state.user.userInfo.id
    }
    this.api.restful({ resources, params }).then(res => {
      this.templateTotal = res.meta.pagination.total
    })
  },
  methods: {
    ...mapActions([
      'getUserInfo'
    ]),
    // 确认提现
    async handleWithdraw() {
      const resources = [{ name: 'withdraw' }]
      const method = 'post'
      const data = {
        user_id: this.$store.state.user.userInfo.id,
        account: this.account,
        money: this.money
      }
      const res = await this.api.restful({ resources, data, method })
      if (this.$isSucc(res)) {
        this.$message.success('提现成功！！！')
        this.money = null
        this.account = null
        this.getUserInfo()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-menu{
  border: 0;
}
/deep/ input[type=number] {
  -moz-appearance:textfield;
}
/deep/ input[type=number]::-webkit-inner-spin-button,
/deep/ input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.work{
  width: 200px;
  position: fixed;
  left: 0;
  top: 0;
  min-height: 100vh;
  z-index: 10;
  background: #fff;
  box-shadow: 0 0 6px rgba(0,0,0,.1);
  .header-left{
    color: white;
    width: 100%;
    height: 41px;
    background: #0083e9;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.header{
  width: 100%;
  height: 41px;
  background: #383d45;
  overflow: hidden;
  div{
    float: right;
    height: 41px;
    margin-right: 28px;
    display: flex;
    align-items: center;
  }
}
  .page-body{
    display: flex;
    justify-content: space-between;
    margin-right: 28px;
    margin-top: 30px;
    .router-view{
      margin-left: 230px;
      width: 1300px;
    }
    .userInfo{
      width: 315px;
      p{
        margin: 0;
        padding: 0;
        outline: 0!important;
      }
      .info{
        width: 100%;
        height: 79px;
        background: #fff;
        display: flex;
        align-items: center;
        box-shadow: 0 1px 4px rgba(0,0,0,.1);
        box-sizing: border-box;
        padding-left: 19px;
        .info-left{
          width: 42px;
          height: 42px;
          img{
            border-radius: 100%;
            width: 100%;
            height: 100%;
          }
        }
        .info-right{
          margin-left: 11px;
          box-sizing: border-box;
          padding-top: 1px;
          .username{
            font-size: 16px;
            color: #5e5d5d;
            line-height: 1;
          }
          .time{
            margin-top: 4px;
            font-size: 14px;
            color: #aaa;
            line-height: 1;
          }
        }
      }
      .all-info{
        width: 100%;
        margin-top: 16px;
        box-shadow: 0 1px 6px rgba(0,0,0,.1);
        .info2{
          width: 100%;
          background: #fff;
          box-sizing: border-box;
          padding: 15px 17px 22px;
          .info2-title{
            font-size: 16px;
            color: #5e5d5d;
            line-height: 1;
          }
          .online-tem{
            margin-top: 24px;
            line-height: 1;
            span:nth-child(1){
              color: #5e5d5d;
            }
            span:nth-child(2){
              color: #ff5945;
              font-family: Arial;
              line-height: 14px;
            }
          }
          .balance{
            margin-top: 12px;
            display: flex;
            align-items: center;
            .balance-title{
              display: flex;
              .balance-title1{
                line-height: 1;
                font-size: 12px;
                color: #5e5d5d;
              }
              .balance-title2{
                line-height: 13px;
                font-size: 16px;
                color: #ff5945;
                font-family: Arial
              }
              .balance-title3{
                line-height: 1;
                font-size: 12px;
                margin-left: 10px;
                color: #5e5d5d;
              }
            }
            .withdraw-box{
              /deep/ .el-input__inner{
                margin: 8px 0;
              }
              .withdrawal{
                margin-left: 28px;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 74px;
                height: 27px;
                box-sizing: border-box;
                border: 2px solid #0083e9;
                border-radius: 13px;
                font-size: 12px;
                line-height: 1;
                color: #0083e9;
              }
            }
          }
          .lines{
            width: 100%;
            margin-top: 9px;
            height: 1px;
            background: #e7e7e7;
          }
          .cumulative{
            margin-top: 18px;
            display: flex;
            .cumulative-title1{
              font-size: 12px;
              line-height: 1;
              color: #5e5d5d;
            }
            .cumulative-title2{
              font-size: 12px;
              line-height: 14px;
              color: #ff5945;
              font-family: Arial;
            }
            .cumulative-title3{
              font-size: 12px;
              line-height: 1;
              color: #5e5d5d;
            }
          }
        }
      }
    }
  }
</style>
