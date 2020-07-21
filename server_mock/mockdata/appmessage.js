const Mock = require('mockjs');
const count = 50
let appMesData = []
// let deviceData = []
let appArr = ['React App','Vue App', 'Angular App', 'Next App', 'Nuxt App', 'Nest App', 'Single-spa App', 'Qiankun App', 'KOA App', 'React Native App']

for (let i = 0; i < 10; i++) {
  appMesData.push(Mock.mock({
    uuid: '@guid',
    appid: '@id',
    appname: appArr[i],
    wechat: /[a-z][A-Z][0-9]{2,6}_/,
    email: '@mail',
    'status|1': ["Warning", "Error", "Comment", "Activity", "Note", "Update", "Reading", "Concern", 'Like'],
    amount: '@integer(0, 10000)',
    msg: '@sentence(3, 5)',
    url: '@url',
    host: '@ip'+':'+'@integer(80, 9999)',
    'agotime|0-100': 1,
  }));
}

// for (var i = 0; i < 10; i++) {
//   deviceData.push(Mock.mock({
//     "cluster|1": ["cluster-1", 'cluster-2', 'cluster-3', 'cluster-4', 'cluster-5'],
//     'ip': '@ip',
//     'status|1': ['初始化', '运行中', '异常'],
//     "uuid": '@guid'
//   })
// )}

module.exports = {
  getAppMesData: appMesData,
  // getDevices: {
  //   total: 50,
  //   data: deviceData
  // }
}