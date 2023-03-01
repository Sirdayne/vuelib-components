<template lang="pug">
#app
  AppSidebar
  AppMain
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppMain from "./components/AppMain.vue";
import AppSidebar from "./components/AppSidebar.vue";

@Component({
  components: {
    AppSidebar,
    AppMain,
  },
})
export default class App extends Vue {}
</script>

<style lang="sass" scoped>
#app
  height: 100%
  display: flex
</style>

<style lang="sass">
html
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  overflow: hidden
  color: #0c2a5d
  font-family: Poppins, sans-serif
  font-size: 16px

body
  height: 100%
  overflow: hidden
</style>
