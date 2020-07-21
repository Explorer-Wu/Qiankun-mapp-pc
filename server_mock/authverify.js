const Mock = require('mockjs');
// import {param2Obj} from '@utils'
const fs = require('fs');
const jwt = require('jsonwebtoken');
const userdb = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'UTF-8'))

const secret = 'testJwt'; //撒盐：加密的时候混淆
const SECRET_KEY = 'testJwt'
const expiresIn = '1h'
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

const logData = (user) => Mock.mock({
    'token': () => {
        return jwt.sign(user, secret)
    }  //"17fba0027f300248b804",
})

// Create a token from a payload 
exports.createToken = function(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

// Verify the token 
exports.verifyToken = function(token){
  return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
  // jwt.verify(sso_token, secret, function (err, decoded) {
  //   if (!err){
  //       console.log(decoded.name);  //会输出123，如果过了60秒，则有错误。
  //       if (decoded.name === user.name) {
  //           user = {}
  //           return {
  //               code: 200,
  //               login_url: "auth/login",
  //               message: "登出成功！"
  //           }
  //       }
  //   } else {
  //       return {
  //           code: 401,
  //           message: "登出失败",
  //       }
  //   }
  // })
}

// Check if the user exists in database
exports.isAuthorized = function({username, password}){
  return userdb.users.findIndex(user => user.username === username && user.password === password) !== -1
}

// module.exports.add = add;
