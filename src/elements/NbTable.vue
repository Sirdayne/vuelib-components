<template lang="pug">
.nb-table__container
  table.nb-table
    slot
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NbTable extends Vue {}
</script>

<style lang="sass">
.nb-table__container
  overflow-x: auto
  border: 1px solid #e6ecf5
  border-radius: 8px

  .nb-table
    width: 100%
    padding: 0
    border-collapse: collapse
    white-space: nowrap
</style>
