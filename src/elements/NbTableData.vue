<template lang="pug">
td.nb-td(:class="classes", @click="onClick($event)")
  .nb-td__content
    slot
    ion-icon.nb-td__icon(v-if="invalid", name="alert-circle")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NbTD extends Vue {
  @Prop({ type: Boolean, default: false }) readonly invalid!: boolean;
  @Prop({ type: Boolean, default: false }) readonly actions!: boolean;

  onClick(e: MouseEvent) {
    if (this.actions) {
      e.stopPropagation();
    }
    this.$emit("click");
  }

  get classes() {
    return {
      "nb-td--invalid": this.invalid,
      "nb-td--compact": this.actions,
    };
  }

  get isHint() {
    return this.$slots.default[0];
  }
}
</script>

<style lang="sass">
.nb-td
  margin: 0
  padding: 18px 30px
  border-bottom: 1px solid #dce5f2
  white-space: pre-wrap

  &__content
    position: relative

  &__icon
    position: absolute
    top: 3px
    left: -24px
    font-size: 17px

  &--invalid
    color: #e85658

  &--compact
    padding: 0 12px
</style>
