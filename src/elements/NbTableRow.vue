<template lang="pug">
tr.nb-tr(:class="classes", @click="$emit('click')")
  slot
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NbTR extends Vue {
  @Prop({ type: Boolean, default: false }) readonly inactive!: boolean;

  get hasClickListener() {
    return !!this.$listeners.click;
  }

  get classes() {
    return {
      "nb-tr--inactive": this.inactive,
      "nb-tr--clickable": this.hasClickListener,
    };
  }
}
</script>

<style lang="sass">
.nb-tr

  &--inactive
    background: #f9fbfe
    color: #536b94

  &--clickable
    cursor: pointer
</style>
