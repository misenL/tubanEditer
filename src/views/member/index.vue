<template>
  <div class="font-16px">
    <!--头部-->
    <div class="header">
      <div class="logo">
        <div>
          <img class="mr-10px" src="@/assets/img/whith-logo.png">
        </div>
      </div>
      <div class="main">
        <div class="mr-20px">充值劲币</div>
        <div class="flex-vertical mr-20px">
          <img class="mr-10px" :src="$store.state.user.userInfo.avatar">
          <div>{{ $store.state.user.userInfo.name }}</div>
        </div>
      </div>
    </div>
    <!--左边导航栏-->
    <div class="sidebar">
      <el-menu :default-active="$route.fullPath" class="el-menu-vertical-demo">
        <el-submenu v-for="(item,index) in sidebar" :key="index" :index="item.path">
          <template slot="title">
            <i :class="item.icon" />
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item v-for="(child,cndex) in item.children" :key="cndex" :index="child.path" @click="$router.push(child.path)">
            <template slot="title">
              <i :class="child.icon" />
              <span>{{ child.title }}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
      <div class="flex-center mt-30px">
        <el-button icon="el-icon-plus" type="info" round plain @click="showDialog = true">新建画布</el-button>
      </div>
      <div class="sidebar__content font-14px">
        <el-upload action="/api/UserFileUpload" :show-file-list="false" :on-success="onSuccess" :data="{type: 1, user_id: $store.state.user.userInfo.id}">
          <span>PSD文件导入</span>
        </el-upload>
      </div>
      <div class="sidebar__buttom">
        <span>客服在线<i class="el-icon-s-comment" style="margin-left:5px" /></span>
        <span>新手教程</span>
        <span @click="handleOpenNeed">提模板需求</span>
      </div>
    </div>
    <!--页面-->
    <router-view class="router-view" />
    <CreateCanvas style="position: absolute" :show.sync="showDialog" />

    <!-- 提需求dialog -->
    <el-dialog title="提模板需求" :visible.sync="dialogNeed" width="30%">
      <span>优图帮重视您的模板需求</span>
      <span>您可以将需求告诉我们，设计师将根据你的需求设计模板上架</span>
      <h3>我需要</h3>
      <input v-model="needContent" class="modeneed__input" type="text" placeholder="比如：我需要关于国庆的海报模板">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogNeed = false">取 消</el-button>
        <el-button type="primary" @click="handleModelNeedConform">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CreateCanvas from './components/CreateCanvas'
export default {
  name: 'Index',
  components: { CreateCanvas },
  data() {
    return {
      sidebar: [
        {
          title: '设计管理',
          icon: 'el-icon-mobile',
          path: 'sheji',
          // 素材和回收站还没有
          children: [
            {
              icon: 'el-icon-edit-outline',
              title: '我的设计',
              path: '/member/devise'
            },
            {
              icon: 'el-icon-collection-tag',
              title: '我的收藏',
              path: '/member/collect'
            },
            {
              icon: 'el-icon-picture-outline',
              title: '我的素材',
              path: '/member/material'
            },
            {
              icon: 'el-icon-shopping-bag-2',
              title: '已购模板',
              path: '/member/purchased'
            },
            {
              icon: 'el-icon-delete',
              title: '回收站',
              path: '/member/recycle'
            }
          ]
        }
      ],
      showDialog: false,
      dialogNeed: false, // 提需求dialog
      needContent: '' // 提需求
    }
  },
  created() {
    document.getElementById('layout__view').style.top = 0
  },
  methods: {
    // 上传成功回调
    onSuccess() {
      this.$message.success('上传成功')
    },
    // 打开提需求界面
    handleOpenNeed() {
      this.dialogNeed = true
    },
    // 确定模板需求提交
    handleModelNeedConform() {
      this.dialogNeed = false
      this.$message.success('提交成功')
      console.log('handleModelNeedConform', this.needContent)
    }
  }

}
</script>

<style lang="scss" scoped>
/deep/ .el-menu{
  border: 0;
}
/deep/ .el-submenu .el-menu-item{
  min-width: 183px;
}
.header{
  display: flex;
  width: 100%;
  height: 57px;
  position: fixed;
  background: #fff;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 7px 0 7px rgba(0,0,0,.15);
  .logo{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0083e9;
    div{
      width: 183px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 56px;
        height: 25px;
      }
    }
  }
  .main{
    height: 57px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    font-size: 12px;
    line-height: 1;
    color: #5e5d5d;
    img{
      border-radius: 100%;
      width: 26px;
      height: 26px;
    }
  }
}
.sidebar{
  width: 183px;
  background: white;
  height: calc(100vh - 57px);
  position: fixed;
  top: 57px;
  left: 0;
  display: flex;
  flex-direction: column;
  .sidebar__buttom,
  .sidebar__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    position: fixed;
    bottom: 20px;
    left: 40px;
    span {
      margin: 14px 0;
      cursor: pointer;
    }
    span:hover {
      color: #409EFF;
    }
  }
  .sidebar__content {
    position: relative;
    margin-top: 50px;
  }
}
.router-view{
  margin-top: 77px;
  margin-left: 203px;
  margin-right: 20px;
}
/deep/ .modeneed__input {
  border: none;
  width: 70%;
  height: 40px;
  line-height: 40px;
}
</style>
