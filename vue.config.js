const path = require('path')
const env = process.env.NODE_ENV

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  /**
  * 如果计划在子路径下部署站点，则需要设置publicPath，
  * 例如GitHub页面。如果您计划将站点部署到https://foo.github.io/bar/，
  * 那么publicPath应该设置为“/bar/”
  * 在大多数情况下，请使用“/”！！！
  */
  publicPath: './',
  outputDir: 'dist', // 生成文件的目录名称
  lintOnSave: env === 'development', // 是否开启eslint保存检测，有效值：ture | false | 'error'
  productionSourceMap: !(env === 'production'), // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  chainWebpack: config => {
    if (env === 'production') {
      config.entry.app = ['@babel/polyfill', 'src/main.js']
    }

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
  configureWebpack: {
    name: 'vue element system',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin, 这会使vue中修改css无法自动更新
    extract: env === 'production',
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {}
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        resolve('src/style/index.less') // 导入公共样式
      ]
    }
  }
}
