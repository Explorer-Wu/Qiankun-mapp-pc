const path = require('path')
const jsonServer = require('json-server')
// const low = require('lowdb')
// const FileSync = require('lowdb/adapters/FileSync')
// const FileAsync = require('lowdb/adapters/FileAsync')

const rules = require('./routes')
// const config = require('./server-config.json') 
const config = require('./config')
const dbfile = require(config.DB_FILE)
const defaultOpts = require('./server-opts')
// const cors = require('cors')
const authVerify = require('./authverify')

const ip = config.SERVER
const port = config.PORT

const server = jsonServer.create()
// const adapter = new FileAsync(dbfile())
// var low_dbfile = low(adapter)
const router = jsonServer.router(dbfile())
const middlewares = jsonServer.defaults(defaultOpts)

//console.log(dbfile())
//console.log(rules);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
// server.use(jsonServer.bodyParser.urlencoded({extended: true}))
// server.use(jsonServer.bodyParser.json())

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
// server.get('/echo', (req, res) => {
//     res.jsonp(req.query)
// })

// Login to one of the users from ./users.json
server.post('/auth/login', (req, res) => {
  console.log("login request body:", req.body);
  const {username, password} = req.body;
  let status = 200
  if (authVerify.isAuthorized({username, password}) === false) {
    const message = 'Incorrect username or password'
    status = 401
    // res.sendStatus(401)
    res.status(status).json({status, message})
    return
  }
  const access_token = authVerify.createToken({username, password})
  console.log("Access Token:" + access_token);
  res.status(status).json({
    status,
    data: { access_token },
    message: "登录成功！"
  })
})

// server.use((req, res, next) => 
server.use(/^(?!\/auth).*$/,  (req, res, next) => {
  // res.header('X-Hello', 'World')
  // if (req.method === 'POST') {
  //   req.body.createdAt = Date.now()
  //   // res.send(handleCgid(req.body))
  // }
  console.log("other-req:", req.headers);
  const status = 401
  const loginurl = '/login'
  // if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
  //   const message = 'Access token not provided'
  //   res.status(status).json({status, data: { loginurl }, message})
  //   // res.status(status).json({status, message})
  //   return
  // }
  
  try {
    // let verifyTokenResult;
    //   verifyTokenResult = authVerify.verifyToken(req.headers.authorization.split(' ')[1]);
    //   console.log("verify-Token:", verifyTokenResult);

    // if (verifyTokenResult instanceof Error) {
    //   const message = 'Error in authorization format'
    //   res.status(status).json({status, data: { loginurl }, message})
    //   return
    // }

    if (req.method === 'POST') {
      req.body.createdAt = Date.now()
    }
    // req.method = 'GET'

    next() // continue to JSON Server router
  } catch (err) {
    // const status = 401
    // const message = 'Error access_token is revoked'
    // res.status(status).json({status, message})
    throw err;
  }
  
})



//数据返回前端之前包一层
router.render = (req, res) => {
  console.log("render-res:", res)
  res.status(200).jsonp({
    // code: 0,
    msg: 'mock data success!',
    data: res.locals.data //res.locals.data这个是真正的数据
  });

  // res.status(500).jsonp({
  //     error: "fail, server error message"
  // })
}

// server.use("/view",router);
// server.use("/api",router);
server.use(jsonServer.rewriter(rules));
server.use(router);

server.listen({
    host: ip,
    port: port,
}, () => {
    console.log(JSON.stringify(jsonServer));
    console.log(`JSON Server is running in http://${ip}:${port}`);
});