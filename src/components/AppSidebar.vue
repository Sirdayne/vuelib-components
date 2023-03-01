<template lang="pug">
aside.sidebar
  AppSidebarHead(v-model="isCollapsed")
  AppSidebarLink(v-for="link in links", :key="link.to", v-bind="link")
</template>

<script lang="ts">
import { routerLinks } from "@/router/routes";
import { Component, Vue } from "vue-property-decorator";
import AppSidebarHead from "./AppSidebarHead.vue";
import AppSidebarLink from "./AppSidebarLink.vue";

type TNavLink = {
  to: string;
  label: string;
  icon?: string;
  labelHidden?: boolean;
};

@Component({
  components: {
    AppSidebarHead,
    AppSidebarLink,
  },
})
export default class AppSidebar extends Vue {
  isCollapsed = false;

  checkCW() {
    if (document.documentElement.clientWidth < 480 + 254) {
      this.isCollapsed = true;
    }
  }

  addResizeListener() {
    this.checkCW();
    window.addEventListener("resize", () => this.checkCW());
  }

  createLink(item: TNavLink) {
    if (this.isCollapsed) item.labelHidden = true;
    return item;
  }

  get links() {
    return routerLinks.map(({ path, name, icon }) =>
      this.createLink({
        to: path,
        label: name,
        icon,
      })
    );
  }

  created() {
    this.addResizeListener();
  }
}
</script>

<style lang="sass" scoped>
.sidebar
  box-sizing: border-box
  height: 100%
  overflow-y: auto
  padding: 24px 0
  display: flex
  flex-direction: column
</style>
