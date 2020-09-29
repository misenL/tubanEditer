const path = require('path')
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  lintOnSave: true,
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          // px转换为rem
          require('postcss-pxtorem')({
            rootValue: 100, // 换算的基数
            selectorBlackList: [], // 忽略转换正则匹配项
            propList: ['*']
          })
        ]
      }
    },
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },

  chainWebpack: config => {
    config.module.rules.delete('svg') // 重点:删除默认配置中处理svg,
    // const svgRule = config.module.rule('icons')
    // svgRule.uses.clear()
    config.module
      .rule('icons-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(resolve('src/icons'))// 处理svg目录
      .end()
      .use('icons-sprite-loader')
      .loader('icons-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },

  devServer: {
    open: false,
    disableHostCheck: true,
    port: 8077,
    proxy: { // 方向代理
      '/api': {
        ws: false,
        // target: process.env.VUE_APP_BASE_API,
        target: 'http://tubang.youxiangyin.cn',
        changeOrigin: true,
        logLevel: 'debug'
      }
    }
  }
}
