import ViewUI from "view-design"
import _ from "lodash"
import moment from "moment"
import Fetch from "../api/fetch"
import { ApiAuth, Api, ApiChart } from "../api/api"
import BaseURl from "../api/ipconfig"
// import 'font-awesome/css/font-awesome.css'

const GeneralPlugin = {
  install(Vue) {
    //  , options
    // console.log('_axios:', Fetch)
    // Vue.Fetch = Fetch;
    // window.Fetch = Fetch;
    // 全局实例方法
    Vue.prototype.$fetch = Fetch
    Vue.prototype.$moment = moment
    Vue.prototype._ = _

    // 全局的api
    Vue.prototype.$ApiAuth = new ApiAuth(BaseURl.ipAuth)
    Vue.prototype.$Api = new Api(BaseURl.ipCommon)
    Vue.prototype.$ApiChart = new ApiChart(BaseURl.ipCommon)

    // Object.defineProperties(Vue.prototype, {
    // axios: {
    //   get() {
    //     return _axios;
    //   }
    // },
    // $axios: {
    //   get() {
    //     return _axios;
    //   },
    //   set(axios) {
    //     _axios = axios
    //   }
    // },
    // $moment: {
    //   get() {
    //     return moment;
    //   }
    // },
    // _: {
    //   get() {
    //     return _;
    //   }
    // },
    // });
  }
}

export default function UseGeneral(Vue) {
  Vue.use(GeneralPlugin)

  Vue.use(ViewUI)

  Vue.filter("moment", function(value, formatString) {
    formatString = formatString || "YYYY-MM-DD HH:mm:ss"
    return moment(value).format(formatString) // value可以是普通日期 20170723
    // return moment.unix(value).format(formatString); // 这是时间戳转时间
  })
}
