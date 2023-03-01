<template lang="pug">
.sidebar__head(:class="{ collapsed: isCollapsed }")
  nb-icon(effects, name="menu-outline", @click="isCollapsed = !isCollapsed")
  router-link(to="/")
    img(src="@/assets/nb-logo.svg")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AppSidebarHead extends Vue {
  @Prop({ type: Boolean, default: false }) readonly value!: boolean;

  get isCollapsed() {
    return this.value;
  }
  set isCollapsed(v) {
    this.$emit("input", v);
  }
}
</script>

<style lang="sass" scoped>
.sidebar__head
  margin-bottom: 24px
  padding: 0 30px
  display: flex
  align-items: center

  a
    width: 152px
    height: 64px
    overflow: hidden
    margin-left: 12px
    display: flex
    align-items: center
    transition: all .2s

  img
    width: 100%
    transition: all .2s

  &.collapsed

    a
      width: 0
      margin-left: 0
</style>
