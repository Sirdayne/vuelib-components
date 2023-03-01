<template lang="pug">
#colours
  table
    tbody
      tr(v-for="item in tableData", :key="item.key")
        td
          .uppercase {{ item.name }}
        td
          .square(:class="item.class")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Colours extends Vue {
  colors = [];

  get tableData() {
    return this.colors.map((color, i) => ({
      key: i + ":" + color,
      name: color,
      class: "bg-" + color,
    }));
  }
}
</script>

<style lang="sass" scoped>
.square
  +square(48px)

table
  border-collapse: collapse

  td
    +pa(1)
</style>
