<template lang="pug">
.nb-checkbox(:class="classes")
  input(:id="inputID", type="checkbox", v-model="checked", :disabled="disabled")

  .nb-checkbox__content
    label(:for="inputID")
      .nb-checkbox__toggler
        img(src="@/assets/icons/tick.svg")

      .nb-checkbox__label(v-if="label") {{ label }}

    .nb-checkbox__label(v-if="!label")
      slot(:inputID="inputID")

  nb-error-message(:value="errorMessageShown") {{ message }}
</template>

<script lang="ts">
import { TRule } from "@/models/Element";
import { generateUUID } from "@/utils/generateUUID";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class NbCheckbox extends Vue {
  @Prop({ type: String }) readonly id?: string;
  @Prop({ type: Boolean, required: true }) readonly value!: boolean;
  @Prop({ type: String }) readonly label?: string;
  @Prop({ type: Array, default: () => [] }) readonly rules!: TRule<boolean>[];
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
  @Prop({ type: Boolean, default: false }) readonly small!: boolean;

  get hasRules() {
    return this.rules.length > 0;
  }

  get message() {
    return this.rules.map((rule) => rule(this.value)).find((el) => el !== true);
  }

  get errorMessageShown() {
    return this.classes.error;
  }

  get inputID() {
    return this.id ?? "nb-checkbox:" + generateUUID();
  }

  get checked() {
    return this.value;
  }
  set checked(v) {
    this.$emit("input", v);
  }

  get classes() {
    return {
      checked: this.checked,
      unchecked: !this.checked,
      error: !!this.message,
      disabled: this.disabled,
      small: this.small,
    };
  }
}
</script>

<style lang="sass" scoped>
.nb-checkbox
  user-select: none
  cursor: pointer
  width: fit-content
  display: flex
  flex-direction: column

  input[type="checkbox"]
    display: none

  &__content
    display: flex

  label
    width: max-content
    display: flex
    align-items: center

  &__toggler
    box-sizing: border-box
    $a: 18px
    width: $a
    height: $a
    margin-right: 6px
    border: solid 2px transparent
    border-radius: 2px
    display: flex
    justify-content: center
    align-items: center
    transition: all .2s

    img
      opacity: 0
      visibility: hidden
      transition: all .2s

  &__label
    display: flex
    transition: all .2s

  &.error

    .nb-checkbox

      &__label
        background: #f9e4e6

  &.disabled
    pointer-events: none
    cursor: default

  &.unchecked

    label

      &:hover

        .nb-checkbox

          &__toggler
            border-color: #a7b6cf

      &:active

        .nb-checkbox

          &__toggler
            border-color: #7d91b2

    .nb-checkbox

      &__toggler
        border-color: #c8d3e6

      img
        opacity: 0
        visibility: hidden

    &.disabled

      .nb-checkbox

        &__toggler
          background: #f3f7fd

        &__label
          color: #a7b6cf

  &.checked

    label

      &:hover

        .nb-checkbox

          &__toggler
            border-color: #10978e
            background: #10978e

      &:active

        .nb-checkbox

          &__toggler
            border-color: #108b83
            background: #108b83

    .nb-checkbox

      &__toggler
        border-color: #00a69b
        background: #00a69b

        img
          opacity: 1
          visibility: visible

    &.disabled

      .nb-checkbox

        &__toggler
          border-color: #ccedeb
          background: #ccedeb

        &__label
          color: #a7b6cf

  &.small

    .nb-checkbox

      &__toggler
        border-width: 1px

      &__label
        font-size: 12px
</style>
