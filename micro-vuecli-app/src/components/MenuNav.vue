<template>
  <Menu
    v-if="menuType === 'main'"
    :active-name="activeName"
    :open-names="['/views/home']"
    :class="menuitemClasses"
    @on-select="onSelect"
    theme="dark"
    width="auto"
    ref="mainMenu"
  >
    <div class="head-logo">
      <img src="../assets/images/logo.png" alt="logo" />
      <span class="title">Vue-cli App PC</span>
    </div>
    <template v-for="item in navItems">
      <Submenu v-if="item.children" :name="item.path" :key="item.path">
        <!-- :class="{collapsed: isCollapsed}" -->
        <template slot="title">
          <Icon :type="item.iconClass"></Icon>
          <span>{{ item.title }}</span>
        </template>

        <MenuItem
          v-for="chitem in item.children"
          :key="chitem.path"
          :name="chitem.path"
          class="menu-citem"
        >
          <!-- v-show="!isCollapsed" -->
          <span>{{ chitem.title }}</span>
        </MenuItem>
      </Submenu>
      <MenuItem v-else :key="item.path" :name="item.path" class="menu-item">
        <Icon :type="item.iconClass"></Icon>
        <span>{{ item.title }}</span>
      </MenuItem>
    </template>
  </Menu>
</template>

<script>
  import _ from "lodash"
  export default {
    name: "MenuNav",
    data() {
      return {
        activeName: this.$route.path,
        menuType: "main",
        navItems: [
          {
            iconClass: "ios-globe",
            title: "首页概览",
            path: "/views/home"
          },
          {
            iconClass: "ios-speedometer",
            title: "Echart图表",
            children: [
              {
                title: "通用图表",
                path: "/views/charts/index"
              },
              {
                title: "D3图表",
                path: "/views/charts/d3charts"
              }
            ]
          },
          {
            iconClass: "ios-list-box",
            title: "表单展示",
            path: "/views/forms"
          },
          {
            iconClass: "md-grid",
            title: "表格展示",
            path: "/views/tables"
          },
          {
            iconClass: "md-photos",
            title: "图片展示",
            path: "/views/pictures"
          },
          {
            iconClass: "md-people",
            title: "用户管理",
            path: "/views/users"
          },
          {
            iconClass: "ios-settings",
            title: "设置",
            path: "/views/settings"
          }
        ],
        backUrl: ""
      }
    },
    props: { // ["isFold"]
      isFold: Boolean
    },
    computed: {
      menuitemClasses: function() {
        return ["menu-item", this.isFold ? "collapsed-menu" : null]
      }
    },
    mounted() {
      this.refreshMenu(this.$route)
      //      this.$router.afterEach((to, from) => {
      //        this.refreshMenu(to)
      //      })
    },
    methods: {
      onSelect(name) {
        this.$router.push({ path: name })
      },
      onOpenChange(name) {
        console.log("href-path:", name)
        this.$router.push({ path: name })
      },
      refreshMenu(route) {
        this.activeName = _.trimEnd(route.path, "/")
        // 设置菜单选中状态
        this.$nextTick(() => {
          // if (this.$refs.detailMenu) this.$refs.detailMenu.updateActiveName()
          if (this.$refs.mainMenu) this.$refs.mainMenu.updateActiveName()
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width 0.2s ease 0.2s;
  }
  .menu-item i {
    transform: translateX(0px);
    transition: font-size 0.2s ease, transform 0.2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu {
    text-align: center;
  }
  .collapsed-menu span,
  .collapsed-menu .menu-citem {
    display: none;
    width: 0px;
    transition: width 0.2s ease;
  }
  .collapsed-menu i {
    transform: translateX(5px);
    transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
    vertical-align: middle;
    font-size: 22px;
  }
</style>
