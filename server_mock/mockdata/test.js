import Mock from 'mockjs'
import {param2Obj} from '@utils'

const count = 50
const userList = []
const chartsData = []
for (let i = 0; i < count; i++) {
  userList.push(Mock.mock({
    id: '@increment',
    ip: '@ip',
    'port|80-9999': 1,
    created_date: '@date',
    phone: '@telephone'
  }));

  chartsData.push(Mock.mock({
    times: '@datetime',
    total: Mock.mock({
      'inflows|100-1000000.1-5': 1,  //99278302.26666668,
      'outflows|100-1000000.1-5': 1,
    }),
    datas: getChartsVals
  }));
}

let getChartsVals = function () {
  let chartsValsArr = []
  for (let i = 0; i < 2; i++) {
    chartsValsArr.push(Mock.mock({
      'ips|100000000-1000000000': 1,  //1684015651
      'inflows|100-1000000.1-5': 1,
      'outflows|100-1000000.1-5': 1,
    }));
  }
  return chartsValsArr;
}

let getLoad = function() {
  let loadArr = []
  for (let i = 0; i < 3; i++) {
    loadArr.push(Mock.mock({
      'name|1': ['core0', 'core1', 'core3', 'core4', 'core5'],
      'value|1-5.0-1': 1.0,
    }));
  }
  return loadArr;
}

let getPort = function() {
  let portArr = []
  for (let i = 0; i < 3; i++) {
    portArr.push(Mock.mock({
      'port|80-9999': 1,
      'name|1': ['mac0', 'mac1', 'mac3', 'mac4', 'mac5'],
      'value|1-8.0-1': 1.0,
    }));
  }
  return portArr;
}

let userDetailData = Mock.mock({
  name: '@name',
  start_time: '@datetime',
  end_time: '@datetime',
  email: '@mail',
  phone: '@telephone'
});

export default {
  getUserLi: config => {
    const {page, limit} = param2Obj(config.url)
    let pageList = userList
    if (page !== undefined && page !== "" && limit !== undefined && limit !== "") {
      pageList = userList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    }
    return {
      data: {
        total: userList.length,
        data: pageList
      }
    }
  },
  getUserDetail: () => ({
    data: userDetailData
  }),
  addUserTest: config => {
    console.log("param-", config);
    const {name, pone} = JSON.parse(config.body)
    if (name !== undefined && pone !== undefined) {
      // ipNum = ipNum+1;
      return {
        code: 0,
        msg: "添加成功！"
      }
    } else {
      return {
        code: -1,
        msg: "添加失败！"
      }
    }
  },
  delUserTest: () => ({
    code: 0,
    msg: "删除成功！"
  }),
  editUserTest: config => {
    console.log("param-edit:", config);
    const {name, pone} = JSON.parse(config.body);
    if (name !== undefined && pone !== undefined) {
      return {
        code: 0,
        msg: "修改成功！"
      }
    } else {
      return {
        code: -1,
        msg: "修改失败！"
      }
    }
  },
  getCharts: config => {
    const { period, limit, startTime, endTime } = param2Obj(config.url)
    return {
      charts: chartsData
    }
  }
}
