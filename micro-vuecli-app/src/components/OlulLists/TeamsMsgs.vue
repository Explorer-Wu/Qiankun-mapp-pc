<template>
  <dl class="mdl-box">
    <dt>
      <h3>{{ propTeams.title }}</h3>
    </dt>
    <dd>
      <list>
        <ListItem v-for="(item, index) in propTeams.data" :key="index">
          <ListItemMeta>
            <template slot="avatar">
              <Avatar
                :style="{ backgroundColor: bgArr[Math.floor(Math.random() * 10) + 1] }"
                :icon="IconArrs[Math.floor(Math.random() * 19) + 1]"
              />
            </template>
            <template slot="title">
              <div>
                <strong>{{ item.name }}</strong>
                <p>{{ item.title }}</p>
              </div>
            </template>
            <template slot="description">
              <p>{{ item.context }}</p>
            </template>
          </ListItemMeta>
          <template slot="extra">
            <div class="time-pad">{{ item.agotime }}h</div>
          </template>
        </ListItem>
      </list>
    </dd>
  </dl>
</template>
<script>
  export default {
    name: "TeamsMsgList",
    data() {
      return {
        IconArrs: [
          "logo-android",
          "logo-angular",
          "md-aperture",
          "logo-apple",
          "ios-appstore",
          "ios-bonfire",
          "ios-bowtie",
          "ios-bug",
          "ios-bulb",
          "md-cafe",
          "ios-car",
          "logo-codepen",
          "logo-css3",
          "logo-facebook",
          "logo-googleplus",
          "ios-leaf",
          "md-ionitron",
          "logo-python",
          "ios-paper-plane",
          "logo-html5"
        ],
        bgArr: [
          "#368ae5",
          "#1f50cd",
          "#6610f2",
          "#765df6",
          "#d13d98",
          "#c03e20",
          "#ff8318",
          "#fabf30",
          "#1faf18",
          "#20c997",
          "#17a2b8",
          "#05586d"
        ]
      }
    },
    props: {
      propTeams: Object
    }
    // created() {
    //   console.log("Teams:", this.propTeams)
    // },
    // computed: {
    //   getIcon: () => this.IconArrs[Math.floor(Math.random() * 20) + 1]
    // },
    // method: {
    // }
  }
</script>
