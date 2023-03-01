<template lang="pug">
nb-backdrop(:open="isOpen", :no-blur="noBlur")
  .nb-popup(v-click-outside="close")
    nb-icon.nb-popup__closer(name="close", @click="close")

    .nb-popup__icon(v-if="icon")
      img(v-bind="icon")

    .nb-popup__title {{ title }}

    .nb-popup__description
      slot

    .nb-popup__actions
      slot(name="actions")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

const popupTypes = ["welcome", "attention", "success", "ask", "warning"] as const;
type TPopupType = typeof popupTypes[number];

@Component
export default class NbPopup extends Vue {
  @Prop({ type: Boolean, required: true }) readonly value!: boolean;
  @Prop({
    type: String,
    required: true,
    validator: (v) => popupTypes.includes(v),
  })
  readonly type!: TPopupType;
  @Prop({ type: String, required: true }) readonly title!: string;
  @Prop({ type: Boolean, default: false }) readonly noBlur!: boolean;

  get icon(): { src: unknown; alt: string } | null {
    if (popupTypes.includes(this.type)) {
      return {
        src: require(`@/assets/icons/${this.type}.svg`),
        alt: this.type,
      };
    }
    return null;
  }

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
.nb-popup
  position: relative
  box-sizing: border-box
  width: 540px
  padding: 84px 64px 60px
  background: #ffffff

  &::before, &::after
    content: ""
    position: absolute
    opacity: 0.5

  &::before
    top: 0
    left: 0
    width: 96px
    height: 156px
    border-radius: 0 14px 0 0
    background: #ffd2d4

  &::after
    bottom: 0
    right: 0
    width: 66px
    height: 96px
    background: #c8efd9

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

  &__title
    margin-top: 24px
    font-size: 32px
    font-weight: 600
    text-align: center

  &__description
    margin-top: 4px
    font-size: 16px
    text-align: center

  &__actions
    margin-top: 54px
    display: flex
    justify-content: center

    & > *

      &:not(:first-child)
        margin-left: 18px
</style>
