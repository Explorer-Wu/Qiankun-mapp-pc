module.exports = {
    // jsonServer.defaults([options]) ,  Returns middlewares used by JSON Server.
    // options:
    "static": "../public", //设置静态文件 path to static files
    "logger": true,// enable logger middleware (default: true)
    "bodyParser": true, //enable body-parser middleware (default: true)
    "noCors":  false,  //disable CORS  禁止跨域资源共享
    "readOnly": false, // accept only GET requests (default: false) 只允许 GET 请求 
    

    //自定义配置文件 json-server [options] <source>
    // # 默认使用：json-server.json配置文件
    // $ json-server --watch app.js  

    // # 指定配置文件
    // $ json-server --watch -c jserver.json db.json
    // Options: 
    // --config, -c       Path to config file   指定 config 文件  [default: "json-server.json"]
    // --port, -p         Set port 设置端口号                                   [default: 3000]
    // --host, -H         Set host 设置主机                              [default: "localhost"]
    // --watch, -w        Watch file(s) 监控文件                                    [boolean]
    // --routes, -r       Path to routes file  指定路由文件
    // --middlewares, -m  Paths to middleware files                           [array]
    // --static, -s       Set static files directory  设置静态文件
    // --read-only, --ro  Allow only GET requests 只允许 GET 请求                        [boolean]
    // --no-cors, --nc    Disable Cross-Origin Resource Sharing 禁止跨域资源共享             [boolean]
    // --no-gzip, --ng    Disable GZIP Content-Encoding  禁止GZIP                    [boolean]
    // --snapshots, -S    Set snapshots directory  设置快照目录                    [default: "."]
    // --delay, -d        Add delay to responses (ms) 设置反馈延时 (ms)
    // --id, -i           Set database id property (e.g. _id)  设置数据的id属性 (e.g. _id)  [default: "id"]
    // --foreignKeySuffix, --fks  Set foreign key suffix, (e.g. _id as in post_id)
    //                                                                 [default: "Id"]
    // --quiet, -q        Suppress log messages from output   不输出日志信息               [boolean]
    // --help, -h         Show help  显示帮助信息                                       [boolean]
    // --version, -v      Show version number  显示版本号                              [boolean]
}