<template lang="pug">
.nb-table__action(:class="classes", @click="$emit('click')")
  slot
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NbTableAction extends Vue {
  @Prop({ type: String }) readonly type?: "error";

  get classes() {
    return {
      "nb-table__action--error": this.type === "error",
    };
  }
}
</script>

<style lang="sass">
.nb-table__action
  cursor: pointer
  box-sizing: border-box
  min-width: 150px
  padding: 15px 18px
  line-height: 1

  &--error
    color: #e85658
</style>
