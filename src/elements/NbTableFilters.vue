<template lang="pug">
.nb-table__filters
  ion-icon.ion-icon(name="filter-outline", @click="isOpen = true")
  nb-table-menu(v-model="isOpen")
    .nb-table__filter(v-for="(item, i) in items", :key="i")
      nb-checkbox(v-model="item.value", :label="item.label")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { TTableFilter } from "@/models/Table";

@Component
export default class NbTableFilters extends Vue {
  @Prop({ type: Array, required: true }) readonly items!: TTableFilter[];

  isOpen = false;

  close() {
    this.isOpen = false;
  }
}
</script>

<style lang="sass" scoped>
.nb-table

  &__filters
    position: relative

    .ion-icon
      cursor: pointer
      font-size: 20px

  &__filter
    padding: 6px 36px 6px 18px

    &:first-of-type
      margin-top: 12px

    &:last-of-type
      margin-bottom: 6px
</style>
