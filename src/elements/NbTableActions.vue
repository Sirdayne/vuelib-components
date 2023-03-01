<template lang="pug">
.nb-table__actions
  nb-icon(name="ellipsis-vertical", @click="isOpen = !isOpen")
  nb-table-menu(v-model="isOpen")
    slot
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NbTableActions extends Vue {
  isOpen = false;
}
</script>

<style lang="sass">
.nb-table__actions
  width: max-content

  .nb-table__menu
    padding: 6px 0
</style>
