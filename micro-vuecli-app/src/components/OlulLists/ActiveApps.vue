<template>
  <dl class="dl-list">
    <dt>
      <h3>{{propActives.title}}</h3>
    </dt>
    <dd v-for="(el) in propActives.data" :key="el.appid">
      <figure :style="{ backgroundColor: bgArr[Math.floor(Math.random() * 11) + 1] }">
          <Icon :type="IconArrs[(Math.floor(Math.random() * 19) + 1)]" />
      </figure>
      <section>
        <h5>
          <em>{{ el.activities }}</em>
          {{ el.prod }}
        </h5>
        <p>{{ el.info }}</p>
      </section>
      <div class="agotime">{{ el.agotime }}h</div>
    </dd>
  </dl>
</template>

<script>
  export default {
    name: "ActiveApps",
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
      propActives: Object
    }
  }
</script>
