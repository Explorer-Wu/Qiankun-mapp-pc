import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';

//函数式组件的写法
// let Authuser = ({component:Component,...rest})=>{
//     return  <Route {...rest} render={(props)=>{
//         return   Math.random() <0.5 ? <Component {...props}/> : <Redirect to='/login' />
//     }}/>
// }

//类组件的写法
class Authuser extends Component{
    constructor(){
        super()
        this.state={
            hasReq:false,
            authuser:false,
            username:"",
            data:{}
        }
    }
    componentDidMount(){
        //组件挂载完毕之后异步读取数据，并更新state
        fetch(
            `/data/data.json`
        ).then(
            (res)=>{
                return res.json()
            }
        ).then((res)=>{
            this.setState(
                {
                    hasReq:true,
                    authuser:res.authuser,
                    username:res.id,
                    data:res.password
                }
            )
        })
    }
    render(){
        let {component:Component, ...rest} = this.props
        //解构组件身上的props，将component单独拿出来，如果条件满足，则允许进入该component，将剩余参数放入rest，rest是一个对象
        //此处Component == User
        if (!this.state.hasReq) {return null}
        //组件被触发后会首先渲染一次，但此时state中的hasReq状态未被更新，当此处hasReq未被更新时，我们先不渲染页面，直到组件挂载完毕异步操作返回结果并更新state中的数据后，我们再执行下一步操作
        return (
            //组件最终返回的仍然是一个Route
            <Route {...rest} render={(props)=>{
                //将传递进来的props展开传给Route组件，render函数接收参数props并进行一系列判断，决定路由跳转至哪个组件，同时可以将props继续向下传递
                return (this.state.authuser?<Component  {...props} username={this.state.username}/> : <Redirect to='/login' />)
            }}/>
        )
    }
}
export default Authuser