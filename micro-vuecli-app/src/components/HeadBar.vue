<template>
  <div class="head-bar">
    <Icon @click.native="$emit('collapsedEv')" :class="rotateIcon" class="mar-0-15" type="md-menu" size="24"></Icon>
    <div class="item" style="float: right;">
      <Poptip trigger="hover" placement="bottom-end">
        <a class="topbar-btn">
          <Avatar style="background-color: #87d068; margin-right: 3px;" icon="person" />
        </a>
        <!-- <div slot="title" class="topbar-username"><i>{{username ? username : '匿名用户'}}</i></div> -->
        <div slot="content" class="topbar-usermenu">
          <!-- <ul class="usermenu-content">
              <li>
                  <a>
                    <Icon type="person" size="24"></Icon>
                    <p>基本信息</p>
                  </a>
              </li>
            <li>
              <a>
                <Icon type="android-list" size="24"></Icon>
                <p>我的订单</p>
              </a>
            </li>
            <li>
              <a>
                <Icon type="key" size="24"></Icon>
                <p>修改密码</p>
              </a>
            </li>
          </ul> -->
          <div>
            <Button type="error" long @click="$emit('logout')">退出登陆</Button>
          </div>
        </div>
      </Poptip>
    </div>
  </div>
</template>

<script>
  // import { mapState, mapGetters, mapActions } from 'vuex';
  export default {
    name: "HeadBar",
    props: {
      username: String,
      isRotate: Boolean
      //value: String
    },
    data () {
      return {
        visible: false,
      }
    },
    computed: {
      rotateIcon () {
        return [
          'menu-icon',
          this.isRotate ? 'rotate-icon' : ''
        ];
      },
    },
    created() {
      // let that = this;
    },
//    beforeRouteUpdate (to, from, next) {
//      debugger
//      // 在当前路由改变，但是该组件被复用时调用
//      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
//      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
//      // 可以访问组件实例 `this`
//      console.log("to-", to, from)
////      this.selRegion = to.params.region
////      next()
//    },
//    beforeRouteLeave (to, from, next) {
//      // 导航离开该组件的对应路由时调用
//      // 可以访问组件实例 `this`
//      console.log("Leave-to-", to, from)
//    },
    methods: {
    }
  }
</script>
<style scoped>
  .head-bar {
    font-size: 14px;
    height: 50px;
    width: 100%;
    top: 0;
    left: 0;
    padding: 0;
    line-height: 50px;
    /*background: #373d41;*/
    color: white;
  }
  .menu-icon{
    transition: all .3s;
  }
  .rotate-icon{
    transform: rotate(-90deg);
  }

  .item {
    display: inline-block;
    float: left;
  }
  .topbar-title {
    padding: 0 20px 0 10px;
    border-right: 1px solid #2a2f32;
    display: inline-block;
    color: white;
    font: normal 14px/50px 'microsoft yahei';
  }
  .topbar-btn {
    cursor: pointer;
    padding: 0 20px;
    border-right: 1px solid #2a2f32;
    line-height: 50px;
    display: inline-block;
    color: white;
  }
  .topbar-btn:hover {
    background: #2a2f32;
  }
  .topbar-username{
    color:#495060;
    text-align: center;
  }
  .topbar-usermenu{
    color:#495060;
  }
  .topbar-usermenu .usermenu-content{
    margin:0px 0px 7px 0px;
    padding:0px;
    width:210px;
    overflow: hidden;;
  }
  .topbar-usermenu .usermenu-content li{
    display: table;
    float:left;
    width:70px;
    padding:5px;
  }
  .topbar-usermenu .usermenu-content li a{
    display: table-cell;
    width:60px;
    height:60px;
    text-align: center;
    vertical-align: middle;
    background: #f9f9f9;
    color:#a8abb1;
    font-size:12px;
  }
  .topbar-usermenu .usermenu-content li a:hover{
    color:#2d8cf0;
  }

  .dropdown-rel {
    padding: 0 10px;
    height: 50px;
    display: block;
  }
  .dropdown-rel span{
    font-size: 14px;
    color: #fff;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .dropdown-rel > a > i{
    margin-top: 18px
  }
</style>
