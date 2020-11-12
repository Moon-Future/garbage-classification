const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:1111/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  configureWebpack: config => {
    let externals = {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'axios': 'axios',
      'element-ui': 'ElementUI'
    }
    if (process.env.NODE_ENV === 'production') {
      return {
        externals: externals,
        plugins: [new CompressionPlugin({
          test: /\.js$|\.html&|\.css/,
          threshold: 10204,
          deleteOriginalAssets: false
        })]
      }
    } else {
      return {
        externals: externals
      }
    }
  }
}