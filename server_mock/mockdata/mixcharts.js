const Mock = require('mockjs');
const Random = Mock.Random;

let capacityData = Mock.mock([{
  "name": "已用量",
  "value": Random.integer(1, 10000),
}, {
  "name": "剩余量",
  "value": Random.integer(1, 1000),
}])

let visitsData = [];
let weeks = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
for (var i = 0; i < 7; i++) {
  visitsData.push(Mock.mock({
    'weeks': weeks[i],
    'visits': [{
      "name": "React",
      "value": Random.integer(1000, 1000000),
    },{
      "name": "Vue",
      "value": Random.integer(1000, 1000000),
    },{
      "name": "Angular",
      "value": Random.integer(1000, 1000000),
    }] 
  }));

  // visitorsData.push(Mock.mock({
  //   id: '@increment',
  //   "date": '@date(T)', //'@datetime("yyyy-MM-dd HH H hh h mm m ss s SS S A a T")'
  //   "value": Random.integer(1, 100000),
  // }));
}

module.exports = {
  getVisits: {
    total: 7,
    data: visitsData
  },
  getCapacityRatio: capacityData,
}