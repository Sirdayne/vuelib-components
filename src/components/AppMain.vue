<template lang="pug">
main
  transition(name="fade", mode="out-in", appear)
    #content(:key="$route.path")
      h1 {{ $route.name }}
      router-view
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AppMain extends Vue {}
</script>

<style lang="sass" scoped>
main
  flex: 1
  padding: 24px
  background: #f3f7fd
  overflow-y: auto

#content
  padding: 24px
  border: solid 1px #e6ecf5
  border-radius: 8px
  background: #ffffff

  h1
    margin-bottom: 12px
</style>
