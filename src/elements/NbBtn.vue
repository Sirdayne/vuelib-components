<template lang="pug">
button.nb-button(:class="classes", :disabled="disabled", @click="onClick")
  .nb-button__spinner
    .lds-ring
      .lds-ring__el(v-for="i in 4")

  .nb-button__content
    .nb-button__icon-left(v-if="iconLeft")
      ion-icon.ion-icon(:name="iconLeft")

    .nb-button__label
      slot(v-if="hasLabelSlot")
      template(v-else) {{ label }}

    .nb-button__icon-right(v-if="iconRight")
      ion-icon.ion-icon(:name="iconRight")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NbBtn extends Vue {
  @Prop({ type: Boolean, default: false }) readonly small!: boolean;
  @Prop({ type: Boolean, default: false }) readonly long!: boolean;
  @Prop({ type: Boolean, default: false }) readonly flat!: boolean;
  @Prop({ type: Boolean, default: false }) readonly secondary!: boolean;
  @Prop({ type: Boolean, default: false }) readonly outline!: boolean;
  @Prop({ type: Boolean, default: false }) readonly error!: boolean;
  @Prop({ type: String }) readonly label?: string;
  @Prop({ type: String }) readonly iconLeft?: string;
  @Prop({ type: String }) readonly iconRight?: string;
  @Prop({ type: String }) readonly to?: string;
  @Prop({ type: Boolean, default: false }) readonly loading!: boolean;
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;

  get classes() {
    return {
      regular: !this.small && !this.long,
      small: this.small,
      long: this.long,
      primary: !this.flat && !this.secondary && !this.outline && !this.error,
      flat: this.flat,
      secondary: this.secondary,
      outline: this.outline,
      error: this.error,
      loading: this.loading,
      disabled: this.disabled,
    };
  }

  get hasLabelSlot() {
    return !!this.$slots.default || !!this.$scopedSlots.default;
  }

  onClick() {
    if (this.to !== undefined) {
      this.$router.push(this.to);
    }
    this.$emit("click");
  }
}
</script>

<style lang="sass" scoped>
.nb-button
  position: relative
  align-self: center
  box-shadow: 0px 4px 8px #00a69b47
  border-radius: 0 8px 8px 8px
  transition: all .2s

  &__spinner
    transition: opacity .2s
    position: absolute
    z-index: 2
    top: 0
    left: 0
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center
    opacity: 0
    visibility: hidden

  &__content
    position: relative
    z-index: 1
    display: flex
    justify-content: center
    align-items: center
    transition: opacity .2s
    transition-delay: .2s

  &__label
    user-select: none
    font-weight: 600

  .ion-icon
    font-size: 21px

  &__icon-left
    margin-right: 12px

  &__icon-right
    margin-left: 12px

  &.regular, &.long
    padding: 12px

  &.regular
    min-width: 124px

  &.long
    min-width: 196px

  &.small
    min-width: 76px
    padding: 6px
    font-size: 14px

    .ion-icon
      font-size: 19px

    .nb-button

      &__icon-left
        margin-right: 6px

      &__icon-right
        margin-right: 6px

    .lds-ring
      $a: 21px
      width: $a
      height: $a

  &.loading
    pointer-events: none

    .nb-button

      &__spinner
        transition-delay: .2s
        opacity: 1
        visibility: visible

      &__content
        transition-delay: 0s
        opacity: 0
        visibility: hidden

  &.disabled
    cursor: default
    box-shadow: none

  &.primary
    background: #00a69b
    color: #ffffff

    &:hover
      background: #10978e

    &:active
      background: #108b83

    &.disabled
      background: #ccedeb

    .lds-ring__el
      border-color: #ffffff transparent transparent transparent

  &.flat
    min-width: unset
    padding: 0
    box-shadow: none
    color: #7d91b2

    &:hover
      color: #5c78a7

    &:active
      color: #536b94

    &.disabled
      color: #a7b6cf

    .lds-ring__el
      border-color: #5c78a7 transparent transparent transparent

  &.secondary
    box-shadow: none
    background: #f3f7fd
    color: #5c78a7

    &:hover
      background: #dce5f2

    &:active
      background: #c8d3e5
      color: #0c2a5d

    &.disabled
      background: #f3f7fd
      color: #a7b6cf

    .lds-ring__el
      border-color: #5c78a7 transparent transparent transparent

  &.outline
    box-shadow: none
    border: solid 2px #00a69b
    background: #ffffff
    color: #00a69b

    &:hover
      background: #ebf8f7

    &:active
      background: #ccedeb

    &.disabled
      border-color: #a7b6cf
      background: #ffffff
      color: #a7b6cf

    .lds-ring__el
      border-color: #00a69b transparent transparent transparent

  &.error
    background: #e85658
    color: #ffffff
    box-shadow: 0 4px 8px 0 rgba(232, 86, 88, 0.28)

    &:hover
      background: #cf4c4f

    &:active
      background: #b54345

    &.disabled
      background: #fab4b1
      color: #ffffff

    .lds-ring__el
      border-color: #ffffff transparent transparent transparent
</style>

<style lang="sass" scoped>
.lds-ring
  position: relative
  $a: 24px
  width: $a
  height: $a

  &__el
    position: absolute
    box-sizing: border-box
    $a: 100%
    width: $a
    height: $a
    border-radius: 50%
    border: solid 2px #ffffff
    animation: rotate 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite

    @for $i from 1 through 3
      &:nth-of-type(#{$i})
        animation-delay: -#{0.15 * $i}s

@keyframes rotate
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)
</style>
