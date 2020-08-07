module.exports = {
  entry: '../src/main.js',
  rootID: 'app',
  extensions: ['.js', '.vue', '.jsx', '.less', '.scss', '.css'],
  alias: {
    '@': '../src/'
  },
  server: {
    port: '3605'
  },
  vue: true,
  lazyLoading: true,
  splitCode: true
}
