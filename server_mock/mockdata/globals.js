const Mock = require('mockjs');
const Random = Mock.Random;

let globalData = [
  Mock.mock({
    "name": "Mainstream front-end framework",
    "cname": "主流前端框架",
    "value": 3,
  }),
  Mock.mock({
    "name": "Micro-front-end applications",
    "cname": "微前端应用",
    "value": 6,
  }),
  Mock.mock({
    "name": "React Ecosphere",
    "cname": "React生态圈",
    "value": Random.integer(1, 10000),
  }),
  Mock.mock({
    "name": "React Stars",
    "cname": "React星级数",
    "value": Random.integer(1, 100000000),
  }),
]

let activeLi = [];
let framesArr = ['React','Vue', 'Angular', 'Next', 'Nuxt', 'Nest', 'Single-spa', 'Qiankun', 'NodeJs', 'KOA', 'React Native', 'Taro', 'BootStrap', 'RequireJs', 'Jquery', 'Antd', 'Iview', 'ElementUI']
for (var i = 0; i < 18; i++) {
  activeLi.push(Mock.mock({
    "name": framesArr[i],
    'activities|1': ['Pull Requests', 'Star', 'Watch', 'Fork', 'Active Issues', 'BROADCAST', 'Projects', ' Security', 'Live logs', 'Comments'],
    'agotime|0-100': +"h ago",
    'amount': Random.integer(0, 100000),
  }));
}

module.exports = {
  getGlobals: globalData,
  getActivities: activeLi
}