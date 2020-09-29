import Vue from 'vue'
import store from './store'
import router from './router/index'
import App from './App.vue'

Vue.config.productionTip = false

// 公共样式
import './assets/css/main.less'

// 引入svg
// import '@/icons'

// 中英文切换
import zh from '@/assets/languages/zh.js'
import en from '@/assets/languages/en.js'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  messages: {
    'zh': zh,
    'en': en
  }
})

// api
import api from '@/api/index.js'
Vue.prototype.api = api

// 引入计算根部font-size文件
import './utils/rem'

// 引入通用组件
import '@/components'

// 引入fabric
import fabric from 'fabric'
Vue.use(fabric)

// 引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 引入全局方法
import base from './utils/base'
Vue.use(base)

new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
