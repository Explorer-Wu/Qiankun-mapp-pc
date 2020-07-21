const Mock = require('mockjs');
const Random = Mock.Random;

const count = 50
const UserList = []
for (let i = 0; i < 20; i++) {
  UserList.push(Mock.mock({
    id: '@increment',
    user_name: '@name',
    email: '@email',
    created_date: '@date',
    phone: /\d{8,11}/
  }));
}
const addUser = config => {
  // console.log("param-", config);
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
}

const ArticlesLi = {}
let images = [1, 2, 3].map(x => Random.image('200x100', Random.color(), Random.word(2, 6)));
//动态生成新闻数据
let content = Random.cparagraph(0, 10);
const ArticleInfo = () => Mock.mock({
  id: '@increment',
  "title": Random.cword(8, 16),
  "author": '@cname',
  "desc": content.substr(0, 20),
  "content": content.substr(0, 1000),
  'publish_date': '@date',
  "tag": Random.cword(2, 6),
  "images": images.slice(0, Random.integer(1, 3))
})
ArticlesLi.total=count;
ArticlesLi.data = [];
for (let i = 0; i < count; i++) {
  ArticlesLi.data.push(ArticleInfo());
}

let delArticleData = {
  code: 0,
  message: "文章删除成功！"
}

let TeamsMesLi = []
let ActivitiesLi = []
let appArr = ['React App','Vue App', 'Angular App', 'Next App', 'Nuxt App', 'Nest App', 'Single-spa App', 'Qiankun App', 'KOA App', 'React Native App']
for (var i = 0; i < 10; i++) {
  TeamsMesLi.push(Mock.mock({
    id: '@increment',
    name: '@name',
    title: '@title(5, 8)',
    'agotime|0-100': 1,
    context: '@cparagraph(1, 3)', 
  }));

  ActivitiesLi.push(Mock.mock({
    appid: '@id',
    prod: appArr[i],
    activities: '@integer(0, 10000)',
    info: '@sentence(2, 5)',
    'agotime|0-100': 1,
  }));
}

module.exports = {
  getUsersData: UserList,
  // addUserData: addUser,
  getTeamMesData: TeamsMesLi,
  getActiveData: ActivitiesLi,
  getArticlesData: ArticlesLi,
  getArticleInfo: ArticleInfo(),
  delArticle: delArticleData
}