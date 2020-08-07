<template>
  <ul class="ul-box">
    <li v-for="(el, index) in propWeather" :key="index">
      <h5>{{ el.week[1] }}</h5>
      <em>{{ el.weather[1] }}</em>
      <p>{{ el.temperature }}°C</p>
      <p>{{ el.percent }}%</p>
    </li>
  </ul>
</template>
<script>
  export default {
    name: "WeatherList",
    // data() {
    // },
    props: {
      propWeather: Array
    },
    created() {
      console.log("weather:", this.propWeather)
    }
    // computed: {
    //   getWeatherData: function () {
    //     return [
    //       ...this.propWeather
    //     ]
    //   }
    // }
  }
</script>
