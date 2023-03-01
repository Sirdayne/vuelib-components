<template lang="pug">
#document-cards
  nb-document-card(description="CoS", success)
  nb-document-card(description="Employment agreement")
  nb-document-card(description="Evidence of the amount and frequency of all salary payments")
  nb-document-card(description="Evidence of appropriate skill level", disabled, locked)
  nb-document-card(description="Org Chart", warning)
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class DocumentCards extends Vue {}
</script>

<style lang="sass" scoped>
#document-cards
  display: flex
  justify-content: flex-start
  flex-wrap: wrap

  & > *
    margin: 0 12px 12px 0
</style>
