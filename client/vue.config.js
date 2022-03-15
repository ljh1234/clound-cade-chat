module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true
      },
      'socket.io': {
        target: 'ws://localhost:3000',
        ws: true,
        changeOrigin: true,
      }
    }
  }
}
