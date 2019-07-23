import "reset-css"
import "./public/style/index.less"

import Vue from "vue"
import axios from "axios"
import router from "./router"
import App from "./page/App.vue"

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: h => h(App)
})

// eslint-disable-next-line
axios.get("/api/user").then(res => console.log(res))
