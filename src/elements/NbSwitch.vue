<template lang="pug">
label.nb-switch(:for="attributes.id", :class="classes")
  input(type="checkbox", v-model="turnedOn", v-bind="attributes")
  .nb-switch__toggler
  .nb-switch__label {{ label }}
</template>

<script lang="ts">
import { generateUUID } from "@/utils/generateUUID";
import { Component, Prop, Vue } from "vue-property-decorator";

type TInputAttributes = {
  id: string;
  disabled?: boolean;
};

@Component
export default class NbSwitch extends Vue {
  @Prop({ type: String }) readonly id?: string;
  @Prop({ type: Boolean, required: true }) readonly value!: boolean;
  @Prop({ type: String, required: true }) readonly label!: string;
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;

  get inputID() {
    return this.id ?? "nb-switch" + ":" + generateUUID();
  }

  get turnedOn() {
    return this.value;
  }
  set turnedOn(v) {
    this.$emit("input", v);
  }

  get classes() {
    return {
      "turned-on": this.value,
      "turned-off": !this.value,
      disabled: this.disabled,
    };
  }

  get attributes() {
    const { inputID, disabled } = this;
    const attrs: TInputAttributes = {
      id: inputID,
    };
    if (disabled) {
      attrs.disabled = disabled;
    }
    return attrs;
  }
}
</script>

<style lang="sass" scoped>
.nb-switch
  user-select: none
  cursor: pointer
  width: max-content
  display: flex
  align-items: center

  input[type="checkbox"]
    display: none

  &__toggler
    position: relative
    width: 32px
    height: 18px
    margin-right: 6px
    border-radius: 9px
    transition: all .2s

    &::after
      content: ""
      position: absolute
      top: 2px
      left: 2px
      border-radius: 50%
      $a: 14px
      width: $a
      height: $a
      background: #ffffff
      transition: all .2s

  &.disabled
    pointer-events: none

  &.turned-on

    .nb-switch__toggler
      background: #00a69b

      &::after
        transform: translateX(100%)

    &:hover
      .nb-switch__toggler
        background: #10978e

    &:active
      .nb-switch__toggler
        background: #108b83

    &.disabled
      .nb-switch__toggler
        background: #ccedeb

  &.turned-off

    .nb-switch__toggler
      background: #a7b6cf

    &:hover

      .nb-switch__toggler
        background: #7d91b2

    &:active

      .nb-switch__toggler
        background: #536b94

    &.disabled

      .nb-switch__toggler
        background: #dce5f2
</style>
