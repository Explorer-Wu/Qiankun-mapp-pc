<template>
  <div>
  <Row :gutter="16" v-if="!_.isEmpty(globalData)">
    <Col
      v-for="(el, index) in globalData"
      :key="index"
      :xs="24"
      :sm="12"
      :md="12"
      :lg="6"
      :xl="6"
      :xxl="6"
    >
      <div :class="corArrs[index][0]" class="box-top">
        <figure :class="corArrs[index][1]"><Icon :type="iconsType[index]" /></figure>
        <section>
          <h5>{{ el.value }} <span v-if="index === 0">个</span></h5>
          <p>{{ el.cname }}</p>
        </section>
      </div>
    </Col>
  </Row>
  <Row :gutter="16">
    <Col v-if="!_.isEmpty(weatherData)" :xs="24" :sm="12" :md="14" :lg="16" :xl="18" :xxl="18">
      <WeatherList :propWeather="weatherData"/>
      <TeamsMsgList :propTeams="teamsData"/>
    </Col>
    <Col :xs="24" :sm="12" :md="10" :lg="8" :xl="6" :xxl="6">
      <ActiveApps :propActives="activitiesData"/>
    </Col>
  </Row>
  </div>
</template>
<script>
  // @ is an alias to /src
  import WeatherList from '@/components/OlulLists/WeatherLi.vue'
  import TeamsMsgList from '@/components/OlulLists/TeamsMsgs.vue'
  import ActiveApps from '@/components/OlulLists/ActiveApps.vue'

  export default {
    name: "Home",
    components: { WeatherList, TeamsMsgList, ActiveApps },
    data() {
      return {
        iconsType: ["md-jet", "ios-grid", "md-planet", "md-star-outline"],
        corArrs: [
          ["bg-blue-light", "bg-blue-dark"],
          ["bg-purple-light", "bg-purple-dark"],
          ["bg-cyan-light", "bg-cyan-dark"],
          ["bg-white", "bg-green-dark"]
        ],
        VisitorsOptions: {
          title: "访问量统计",
          field: "visitors",
          defaultPeriod: 1 * 24 * 60 * 60
        },
        CapacityOptions: {
          title: "源码容量占比",
          field: "capacity"
        },
        globalData: [],
        weatherData: [],
        teamsData: {
          title: "社区评论",
          data: []
        },
        activitiesData: {
          title: "活跃应用",
          data: []
        }
      }
    },
    created: function() {
      this.loadDataFn()
    },
    methods: {
      async loadDataFn() {
        const globalRes = await this.$Api.getGlobals()
        this.globalData = globalRes.data
        const weatherRes = await this.$Api.getWeathers()
        this.weatherData = weatherRes.data
        // const errorCode = globalRes.statusCode > 200 ? globalRes.statusCode : false
        // await this.$nextTick(function () {
        //   // DOM 现在更新了
        //   // `this` 绑定到当前实例
        // })
        const teamsRes = await this.$Api.getTeamsMsg()
        this.teamsData.data = teamsRes.data
        console.log("teams0:", this.teamsData.data)
        const activitiesRes = await this.$Api.getActivities()
        this.activitiesData.data = activitiesRes.data
      }
    }
  }
</script>
