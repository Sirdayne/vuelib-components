import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: "history",
  routes,
});

router.afterEach((to) => {
  document.title = (to.path === "/" || !to.name ? "" : to.name + " - ") + process.env.VUE_APP_TITLE;
});

export default router;
