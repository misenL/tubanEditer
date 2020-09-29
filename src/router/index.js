import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken, setToken, removeToken, getInfo, setInfo, removeInfo } from '@/utils/cookies'
import store from '@/store'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      meta: {
        title: '网站首页',
        navbar: true,
        thorough: true
      },
      component: () => import('@/views/home/index')
    },

    {
      path: '/imgEditor',
      meta: {
        title: '图片编辑',
        navbar: false
      },
      component: () => import('@/views/imgEditor/index')
    },

    {
      path: '/user',
      redirect: '/user/setting',
      meta: {
        title: '账户中心'
      },
      component: () => import('@/views/user/index'),
      children: [
        {
          path: 'setting',
          meta: {
            title: '用户设置'
          },
          component: () => import('@/views/user/setting/index')
        },
        {
          path: 'topup',
          meta: {
            title: '劲币充值'
          },
          component: () => import('@/views/user/topup/index')
        },
        {
          path: 'paynotes',
          meta: {
            title: '支付记录'
          },
          component: () => import('@/views/user/paynotes/index')
        }

      ]
    },

    {
      path: '/alipay',
      meta: {
        title: '支付宝支付'
      },
      component: () => import('@/views/user/alipay/index')
    },

    {
      path: '/template',
      meta: {
        title: '设计模板',
        navbar: true,
        concise: true
      },
      component: () => import('@/views/template/index')
    },

    {
      path: '/detail',
      meta: {
        title: '模板详情',
        navbar: true
      },
      component: () => import('@/views/detail/index')
    },

    {
      path: '/shop',
      meta: {
        title: 'Ta的店铺'
      },
      component: () => import('@/views/shop/index')
    },

    {
      path: '/logo',
      meta: {
        title: 'logo和艺术字设计',
        navbar: true,
        concise: true
      },
      component: () => import('@/views/logo/index')
    },

    {
      path: '/search',
      meta: {
        title: '搜索',
        navbar: true,
        concise: true
      },
      component: () => import('@/views/search/index')
    },

    {
      path: '/workbench',
      redirect: '/workbench/mouldboard',
      meta: {
        title: '设计师工作台'
      },
      component: () => import('@/views/workbench/index'),
      children: [
        {
          path: 'mouldboard',
          meta: {
            title: '模板管理-我上传的模板'
          },
          component: () => import('@/views/workbench/mouldboard/index')
        },
        {
          path: 'withdraw',
          meta: {
            title: '支付设置'
          },
          component: () => import('@/views/workbench/withdraw/index')
        },
        {
          path: 'certification',
          meta: {
            title: '认证管理'
          },
          component: () => import('@/views/workbench/certification/index')
        },
        {
          path: 'income',
          meta: {
            title: '模板文档-收益说明'
          },
          component: () => import('@/views/workbench/income/index')
        }
      ]
    },

    {
      path: '/member',
      redirect: '/member/devise',
      meta: {
        title: '设计师工作台'
      },
      component: () => import('@/views/member/index'),
      children: [
        {
          path: 'devise',
          meta: {
            title: '我的设计'
          },
          component: () => import('@/views/member/devise/index')
        },
        {
          path: 'collect',
          meta: {
            title: '我的收藏'
          },
          component: () => import('@/views/member/collect/index')
        },
        {
          path: 'material',
          meta: {
            title: '我的素材'
          },
          component: () => import('@/views/member/material/index')
        },
        {
          path: 'purchased',
          meta: {
            title: '已购模板'
          },
          component: () => import('@/views/member/purchased/index')
        },
        {
          path: 'recycle',
          meta: {
            title: '回收站'
          },
          component: () => import('@/views/member/recycle/index')
        }
      ]
    },

    {
      path: '/about',
      meta: {
        title: '关于我们',
        concise: true
      },
      component: () => import('@/views/about/index')
    }

  ]
})

router.beforeEach(async(to, from, next) => {
  const hasToken = getToken()
  if (hasToken) {
    const hasGetUserInfo = getInfo()
    if (hasGetUserInfo) {
      next()
    } else {
      try {
        // get user info
        await store.dispatch('getUserInfo')
        next()
      } catch (error) {
        await store.dispatch('resetToken')
        await store.dispatch('resetInfo')
      }
    }
  } else {
    await store.dispatch('resetToken')
    await store.dispatch('resetInfo')
  }
  next()
})

export default router
