const Mock = require('mockjs');

const count = 8
const weatherArr = [
  ["windy", "有风"],
  ["cloudy", "阴天"],
  ["sunny", "晴天"], 
  ["snow", "雪"],
  ["rain", "雨"],
  ["shower", "阵雨"], 
  ["fog", "雾"],
  ["storm", "暴风雨"],
  ["sand storm", "沙尘暴"],
  ["thunder", "雷"],
  ["hail", "冰雹"],
  ["frost", "霜冻"]
]
const weekArr = [
  ["Today", "周日"],
  ["Monday", "周一"],
  ["Tuesday", "周二"],
  ["Wednesday", "周三"],
  ["Thursday", "周四"],
  ["Friday", "周五"],
  ["Saturday", "周六"],
  ["Sunday", "周日"],
]
const weatherMap = new Map(weatherArr)
let weatherList = []
for (var i = 0; i < count; i++) {
  weatherList.push(Mock.mock({
    "weather|1": weatherArr,
    "week": weekArr[i],
    "percent|0-100": 1,
    "temperature|-10-45": 1
  }));
}

module.exports = {
  getWeatherData: weatherList
}