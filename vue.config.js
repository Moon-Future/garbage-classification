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
  }
}