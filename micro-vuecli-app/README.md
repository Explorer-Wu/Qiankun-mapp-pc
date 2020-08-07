# micro-vuecli-app
> vue-cli构建PC端vue单页面微应用模版

## Available Scripts
In the project directory, you can run:

### 开发坏境
* 安装 
```sh
    npm install / yarn install
``` 
* 开发环境服务启动（编译和热替换）
```sh
    npm run serve / yarn serve
```

Runs the app in the development mode.<br>
Open [http://localhost:3608](http://localhost:3608) to view it in the browser.

### 测试
* run unit tests
```sh
  yarn test:unit
```
* run e2e tests
```sh
  yarn test:e2e
```
* Lints and fixes files
```sh
  yarn lint
```

获取mock.js测试模拟后端数据在微前端qiankun主框架中启动`yarn mockserver` -> `nodemon mock/server.js`

### 生产坏境打包压缩
```sh
    npm run build / yarn build
``` 

### 部署
拷贝dist文件夹至服务器即可


## Vue封装自定义插件
利用vue封装自定义插件的本质就是"组件实例化的过程或者指令等公共属性方法的定义过程"，比较大的区别在于封装插件需要手动干预，就是一些实例化方法需要手动调用，而Vue的实例化，很多逻辑内部已经帮忙处理掉了。插件相对于组件的优势就是插件封装好了之后，可以开箱即用，而组件是依赖于项目的。

* Vue插件的作用
插件通常会为 Vue 添加全局功能。
所谓全局：即不需要像组件那样，每次使用他前都需要先引入一次。对于插件只要在最开始引入一次，在任何组件就可以直接使用。（类似于我们在window上添加的方法属性那样，任何地方都可以用）
插件能实现的功能没有限制，不过常见下面几种：
- 通过插件，添加全局方法或者属性
- 通过插件，添加全局资源：指令/过滤器/过渡等
- 通过插件(使用全局 mixin 方法)，添加一些组件选项
- 通过插件,添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。
一个库，提供自己的 API，同时提供上面提到的一个或多个功能，如 vue-router

* 插件原理
所谓vue插件其实就是一个简单的js对象而已，然后这个插件对象有一个公开属性方法install ，该方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：
```
  MyPlugin.install = function (Vue, options) {
    // 1. 添加全局方法或 property
    Vue.myGlobalMethod = function () {
      // 逻辑...
    }

    // 2. 添加全局资源
    Vue.directive('my-directive', {
      bind (el, binding, vnode, oldVnode) {
        // 逻辑...
      }
      ...
    })

    // 3. 注入组件选项
    Vue.mixin({
      created: function () {
        // 逻辑...
      }
      ...
    })

    // 4. 添加实例方法
    Vue.prototype.$myMethod = function (methodOptions) {
      // 逻辑...
    }
  }
```
例如验证插件：
```
  export default Valid = {
    install(Vue, options = { triggEvent: "input" }) {
      // static props 静态属性
      // Vue.t1703C="hello everyone"
      // Vue.t1703C = "1703C"
      // console.log(this) this指向vue  可一直往上查找,可查找到new Vue

      // 所有需要验证的组成一个列表
      let regList = [{
          "type": "phone",
          "RegExp": /^(\\+86|0086)?\\s*(13|15|18)[0-9](\\d{4})(\\d{4})$/,
          "msg": "请输入手机号码11位数字"
      }, {
          "type": "pwd",
          "RegExp": /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/, 
      }, {
          "type": "code",
          "RegExp": /\d{6}/
      }]

      // 添加属性与方法
      // $testProp等加了$符号的，表示它为vue全局的，但实际上不加也可以，访问时也不加就行了
      Vue.prototype.$myoption='我是来自插件的属性',
      Vue.prototype.$myfn=function(){
          console.log('我是来自插件的方法')
      }

      // 添加全局混入
      Vue.mixin({
          mounted() {
              console.log('组件创建成功')
          },
      })

      // 添加全局指令
      Vue.directive('testev', {
        bind (el) {
            el.addEventListener('click', function (e) {
                alert('hello world')
            })
        }
      })

      Vue.directive("valid", {
        bind(el, binding) {
          // el:dom节点 binding:对象（可使用value）
          // console.log(binding)

          // 失去焦点事件
          el.addEventListener(options.triggEvent, function(e) {
              // console.log(e.target.value)

              // 找到符合条件的对象
              let validObj = regList.find(item => item.type === binding.value)
              if (validObj.RegExp.test(e.target.value)) {
                  console.log("验证通过！")
                  e.target.classList.remove(options.errorClass)
              } else {
                  // let span = document.createElement("span");
                  // span.innerText = validObj.msg
                  // e.target.parentNode.appendChild(span)
                  console.log("格式错误")
                  e.target.classList.add(options.errorClass)
              }
          })
        }
      })
    }
  }
```
使用插件的时候，在main.js入口文件import引入，再使用use()方法使用即可, 例如：
```
//引入自定义插件插件 v-valid
import Valid from "@/plugins/validator";
Vue.use(Valid, {
    triggEvent: "blur", //triggEvent:事件  value值必须是字符串，
    errorClass: "vaild-error" //errorClass：类名
})
```
在组件中访问
```
  <template>
    <div class="login"> 
      <input v-valid="'phone'" placeholder="请输入姓名" v-model="user" class="user"/>
      <input v-valid="'pwd'" placeholder="请输入密码" v-model="password" show-password class="pwd"/>
      <input v-valid="'code'" placeholder="请输入验证码" v-model="code"  class="code"/>
      <button v-testev>
    </div>
  <template>
  export default {
    data(){
        return {
            user:"",
            password:"",
            code:"",
            svg:""
        }
    },
    computed:{

    },
    methods:{
        handleLogin(){
            let data={username:this.user,password:this.password,captcha:this.code}
            this.$http.post("/api/buyer/user/login",data).then(res=>{
                window.sessionStorage.setItem("token",res.token)
                console.log(res)
                if(res.code===1){
                   this.$router.push("/list")
                }
            }).finally(()=>{
                // 登录失败再次调用
                this.upDataCaptch()
            })
        },
        upDataCaptch(){
            // 每次点击都请求一次验证码
             this.$http.get("/api/buyer/user/captcha").then(res=>{
                console.log(res)
                this.svg=res.data
            })  
        }
    },
    created(){
        // 初始化
        this.upDataCaptch()
    },
    mounted(){
      console.log(this.$myoption)
       this.$myfn()
    }
  }
```