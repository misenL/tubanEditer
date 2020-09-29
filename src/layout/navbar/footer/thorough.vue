<template>
  <div>
    <!--icon-->
    <div class="footer-top">
      <div class="layout flex-between">
        <div v-for="(item,index) in descList" :key="index" class="content">
          <div class="img-box">
            <img :src="item.img">
          </div>
          <p class="p1">{{ item.title }}</p>
          <p class="p2">{{ item.desc }}</p>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <!--about-->
      <div class="layout">
        <div class="footer-content1">
          <ul><li v-for="(item, index) in aboutList" :key="index" @click="handleAbout(item)">{{ item.title }}</li></ul>
          <div>
            <span>官方服务电话: </span>
            <span>110-110-0-0</span>
          </div>
        </div>

        <!--友情链接-->
        <div class="link">
          <div style="width: 8.89rem;">
            <div class="mt-30px">
              <a v-for="(item,index) in linkList" :key="index" href="">{{ item.title }}</a>
            </div>
            <div class="mt-30px">
              <div><a href="">Copyright © 2019 xxx.com</a></div>
              <div>
                <a href="">ICP备xxx号</a>
                <a href="">公网安备xxx号</a>
                <a href="">经营证照</a>
              </div>
            </div>
          </div>
          <!--二维码-->
          <div class="erwema">
            <img src="@/assets/img/qrcode.jpg" alt="">
            <p>微信公众号</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Thorough',
  data() {
    return {
      descList: [
        { img: 'https://www.tubangzhu.com/assets/img/skin/tutorial1.svg', title: '操作简单', desc: '会打字就能用，拖拉拽，轻松改' },
        { img: 'https://www.tubangzhu.com/assets/img/skin/tutorial2.svg', title: '海量模板', desc: '会30万+ 模板免费用，行业覆盖丰富' },
        { img: 'https://www.tubangzhu.com/assets/img/skin/tutorial3.svg', title: '云端储存', desc: 'PC/手机同步、随时随地修改和下载' },
        { img: 'https://www.tubangzhu.com/assets/img/skin/tutorial4.svg', title: '快捷下载', desc: '多格式高清输出，JPG/PNG/PDF/PPT' }
      ],
      aboutList: [],
      linkList: [
        { title: '平面设计', url: '' },
        { title: '懒人图库', url: '' },
        { title: '工作证模板', url: '' },
        { title: '工作证设计', url: '' },
        { title: '插画教程', url: '' },
        { title: '苏打苏塔', url: '' },
        { title: '红动中国设计稿', url: '' },
        { title: '公众号图片设计', url: '' },
        { title: '名片设计', url: '' },
        { title: '宣传单设计', url: '' },
        { title: '代金券设计', url: '' },
        { title: '免费模板', url: '' },
        { title: '优波设计', url: '' },
        { title: '品牌策划公司', url: '' },
        { title: 'logo设计', url: '' },
        { title: 'logo设计网站', url: '' },
        { title: '研究报告', url: '' },
        { title: '一站式印刷城', url: '' }
      ]
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 页面初始化
    initData() {
      this.getAboutList()
    },

    // 获取关于我们列表
    async getAboutList() {
      const resources = [{ name: 'about' }]
      const params = {
        page: 1,
        per_page: 9999,
        sort_by: '-created_at'
      }
      const res = await this.api.restful({ resources, params })
      if (this.$isSucc(res)) {
        this.aboutList = res.data
      }
    },

    // 点击关于我们
    handleAbout(data) {
      window.open(data.url)
    }
  }
}
</script>

<style lang="less" scoped>
.footer-top{
    background: white;
    margin-top: 38px;
    .content{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 52px;
        height: 195px;
        .img-box{
            width: 81px;
            height: 81px;
            img{
                height: 100%;
                width: 100%;
            }
        }
        p{
            margin: 0;padding: 0;
        }
        .p1{
            margin-top: 18px;
            font-size: 20px;
            color: #383838;
            line-height: 1;
        }
        .p2{
            margin-top: 12px;
            font-size: 14px;
            color: #8b8d9b;
            line-height: 1;
        }
    }
}
.footer-bottom {
    box-sizing: border-box;
    width: 100%;
    height: 266px;
    background: url('.../../../../../assets/img/footer.png') center center/100% 100% no-repeat #353535;
    position: relative;
    z-index: 197;
    .footer-content1 {
        width: 100%;
        height: 69px;
        box-sizing: border-box;
        padding-top: 32px;
        border-bottom: 1px solid #393b3f;
        display: flex;
        justify-content: space-between;
        ul{
            color: white;
            display: flex;
            margin: 0;padding: 0;
            list-style: none;
            li{
                padding-right: 25px;
                font-size: 14px;
                cursor: pointer;
            }
        }
        span{
            font-size: 14px;
            color: #0083e9;
            line-height: 1;
        }
        span:nth-child(2) {
            font-size: 26px;
            color: #0083e9;
            line-height: 20px;
            font-family: Arial;
        }
    }
    .link{
        display: flex;
        justify-content: space-between;
        a {
            text-decoration: none;
            font-size: 12px;
            margin-right: 28px;
            color: #78808d;
            margin-bottom: 14px
        }
        a:hover{
            color: #1890ff;
        }
        .erwema{
            margin-top: 20px;
            img{
                width: 124px;
                height: 124px;
                margin: 0;
                padding: 0;
            }
            p{
                width: 124px;
                height: 31px;
                background: #3d4148;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                color: #fff;
                line-height: 1;
                margin: 0;
            }
        }

    }
}
</style>
