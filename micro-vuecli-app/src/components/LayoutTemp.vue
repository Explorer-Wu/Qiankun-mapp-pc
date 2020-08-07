<template>
  <div class="layout">
    <Layout :style="{ height: '100vh' }">
      <Sider
        ref="leftMenu"
        hide-trigger
        collapsible
        :collapsed-width="78"
        :width="200"
        v-model="isCollapsed"
      >
        <MenuNav :isFold="isCollapsed"></MenuNav>
      </Sider>
      <Layout :style="{ background: '#eee' }">
        <Header :style="{ height: '50px', padding: '0' }" class="layout-header-bar">
          <HeadBar
            @collapsedEv="collapsedSider"
            :isRotate="isCollapsed"
            :username="username"
            @logout="logout"
          ></HeadBar>
        </Header>
        <Content :style="{ padding: '16px' }">
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
    <!--<Affix class="affix-pos">-->
    <!--<div class="affix-tip" v-show="!isNoticeModal">-->
    <!--&lt;!&ndash;<Icon type="android-warning"></Icon> &ndash;&gt;-->
    <!--<em @click="toggleNotice">5</em> <span> 条告警</span>-->
    <!--</div>-->
    <!--<dl class="affix-box" v-if="isNoticeModal">-->
    <!--<dt><Icon type="android-close" class="fr" @click="toggleNotice"></Icon><h5>最新告警</h5></dt>-->
    <!--<dd></dd>-->
    <!--</dl>-->
    <!--</Affix>-->
  </div>
</template>

<script>
  import HeadBar from "./HeadBar"
  import MenuNav from "./MenuNav"
  // import cookiestorage from '@/utils/cookiestorage'

  export default {
    name: "MainLayout",
    components: { HeadBar, MenuNav },
    data() {
      return {
        isCollapsed: false,
        isNoticeModal: false,
        username: ""
      }
    },
    created() {
      // cookiestorage.getCookie('sessionid')
      // Cookies.setCookie('sessionid', sessionid, "d7");//用户名密码存1年
      // this.username = cookiestorage.getCookie('username')
    },
    mounted() {},
    methods: {
      toggleNotice() {
        this.isNoticeModal = !this.isNoticeModal
      },
      collapsedSider() {
        this.$refs.leftMenu.toggleCollapse()
      },
      logout() {
        this.$ApiAuth
          .logout()
          .then(res => {
            console.log("logout-res:", res)
            const url = res.data && res.data.login_url
            window.location.href = url
          })
          .catch(err => {
            this.$Notice.error({ title: err + "登出错误，请稍后重试" })
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  #top-bar {
    line-height: 60px;
  }

  .logo-text {
    font-size: 21px;
    color: #2e2e2e;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
  }
  #user-info {
    float: right;
  }

  #user-info-box {
    height: 40px;
    border: 1px solid #f0f0f8;
    margin-top: 10px;
    line-height: 40px;
    padding: 0 8px;
    font-size: 12px;
    cursor: pointer;
  }

  #logout-item {
    background: #a9d96c;
    width: 200px;
    padding: 15px 10px;
    line-height: 20px;
    color: white;
    text-align: center;
  }

  .main-content {
    background: #f1f2f7;
    padding-bottom: 0;
  }

  .sc-table div.pagination-wrap {
    margin-top: 5px;
  }

  .ivu-layout-sider-trigger {
    background: none !important;
    color: #727682 !important;
  }
</style>
