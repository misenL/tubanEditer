import Vue from 'vue'
import PnSvg from '@/components/PnSvg'// svg component

// // register globally
Vue.component('pn-svg', PnSvg)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
