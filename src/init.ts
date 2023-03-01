import Vue from "vue";
import App from "./App.vue";
import NbComponentsPlugin from "./elements";
import "./packages";
import router from "./router";
import store from "./store";
import "./styles/app.sass";
import "./styles/ion-icon.css";
import "./styles/_variables.css";

Vue.use(NbComponentsPlugin);

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/^ion-/];

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
});

app.$mount("#app");
