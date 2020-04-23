const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: config => {
    // svg rule loader
    const svgRule = config.module.rule('svg') // 找到 svg-loader
    svgRule.uses.clear() // 清除已有 loader
    svgRule // 添加新的 svg loader
      .test(/\.svg$/)
      .exclude.add(/node_modules/).end()
      .include.add(resolve('src/svg')).end() // 处理svg目录
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {}
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        resolve('src/style/param.less') // 导入公共样式
      ]
    }
  }
}
