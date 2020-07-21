const Mock = require('mockjs');
// import {param2Obj} from '@utils'
const jwt = require('jsonwebtoken');
const secret = 'testJwt'; //撒盐：加密的时候混淆
let user = {};
//jwt生成token
// const token = jwt.sign({
//     name: 123
// }, secret, {
//     expiresIn:  60 //秒到期时间
// });
// const count = 50
// for (let i = 0; i < count; i++) {
// }

const regData = Mock.mock({
  'username': '@word(3, 8)',
  'password': /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
})
const logData = (user) => Mock.mock({
    'token': () => {
        return jwt.sign(user, secret)
    }  //"17fba0027f300248b804",
})

module.exports = {
  login: config => {
    console.log("param-", config);
    const {username, password} = JSON.parse(config.body)
    if (username !== undefined && password !== undefined) {
        user = {
            username: username
        };

        return {
            code: 200,
            data: logData(user),
            message: "登录成功！"
        }
    } else {
        return {
            code: 401,
            error: {
                message: "登录验证失败！",
            }  
        }
    }
  },
  logout: config => {
      console.log("config-out:", config)
      // if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      //     return req.headers.authorization.split(' ')[1];
      // } else if (req.query && req.query.token) {
      //     return req.query.token;
      // }
      // const {sso_token} = JSON.parse(config.headers)
      // jwt.verify(sso_token, secret, function (err, decoded) {
      //     if (!err){
      //         console.log(decoded.name);  //会输出123，如果过了60秒，则有错误。
      //         if (decoded.name === user.name) {
      //             user = {}
      //             return {
      //                 code: 200,
      //                 login_url: "auth/login",
      //                 message: "登出成功！"
      //             }
      //         }
      //     } else {
      //         return {
      //             code: 401,
      //             message: "登出失败",
      //         }
      //     }
      // })
      return {
          code: 200,
          loginurl: "auth/login",
          message: "登出成功！"
      }
  }
}
