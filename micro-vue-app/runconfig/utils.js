const path = require('path')
const config = require('./config')

module.exports = {
  resolve: function(fileDir) {
    // if (typeof fileDir !== 'String') {
    //   return
    // }
    // return path.resolve(__dirname, fileDir) //会返回当前工作目录的绝对路径
    return path.join(__dirname, '..', fileDir)  //将所有给定的 path 片段连接到一起
  },
  assetsPath: function(_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory
  
    return path.posix.join(assetsSubDirectory, _path)
  },
  createNotifierCallback: () => {
    const notifier = require('node-notifier')
  
    return (severity, errors) => {
      if (severity !== 'error') return
  
      const error = errors[0]
      const filename = error.file && error.file.split('!').pop()
  
      notifier.notify({
        title: packageConfig.name,
        message: severity + ': ' + error.name,
        subtitle: filename || '',
        icon: path.join(__dirname, 'logo.png')
      })
    }
  }
}

