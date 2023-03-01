<template lang="pug">
nb-backdrop(:open="isOpen", :no-blur="noBlur")
  .nb-dialog(v-click-outside="close")
    nb-icon.nb-dialog__closer(name="close", @click="close")

    .nb-dialog__content
      slot

    .nb-dialog__actions
      slot(name="actions")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NbDialog extends Vue {
  @Prop({ type: Boolean, required: true }) readonly value!: boolean;
  @Prop({ type: Boolean, default: false }) readonly noBlur!: boolean;

  get isOpen() {
    return this.value;
  }
  set isOpen(v) {
    this.$emit("input", v);
  }

  close() {
    this.isOpen = false;
  }
}
</script>

<style lang="sass">
.nb-dialog
  position: relative
  box-sizing: border-box
  padding: 64px 72px 30px
  background: #ffffff

  &__closer
    position: absolute
    top: 18px
    right: 18px

  &__icon
    display: flex
    justify-content: center

    img
      $a: 64px
      width: $a
      height: $a

  &__actions
    margin-top: 42px
    display: flex
    justify-content: flex-end

    & > *

      &:not(:first-child)
        margin-left: 18px
</style>
