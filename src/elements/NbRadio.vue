<template lang="pug">
.nb-radio(:class="classes")
  .nb-radio__content
    .nb-radio__label(v-if="label") {{ label }}

    fieldset.nb-radio__options(:id="fieldsetID")
      .nb-radio__options__item(
        v-for="option in reorganizedOptions",
        :key="option.inputID",
        :class="option.classes",
        :style="styles"
      )
        input(type="radio", :id="option.inputID", :value="option.value", v-model="chosen")

        label(:for="option.inputID")
          .nb-radio__options__item__toggler
            .nb-radio__options__item__toggler__circle

          .nb-radio__options__item__label {{ option.label }}

        .nb-radio__options__item__hint(v-if="option.hint", v-tooltip.top="option.hint")
          ion-icon.ion-icon(name="information-circle-outline")

  nb-error-message(:value="errorMessageShown") {{ message }}
</template>

<script lang="ts">
import { generateUUID } from "@/utils/generateUUID";
import { TRadioOption, TRadioRule, TRadioValue } from "@/models/Radio";
import { Component, Prop, Vue } from "vue-property-decorator";

type TReorganizedRadioOption = {
  inputID: string;
  classes: {
    checked?: boolean;
    disabled?: boolean;
    hint?: boolean;
  };
} & TRadioOption;

@Component
export default class NbRadio extends Vue {
  @Prop({ type: String }) readonly id?: string;
  @Prop({ type: [Number, String, Boolean] }) readonly value!: TRadioValue;
  @Prop({ type: Array, required: true }) readonly options!: TRadioOption[];
  @Prop({ type: String }) readonly label?: string;
  @Prop({ type: Array, default: () => [] }) readonly rules!: TRadioRule[];
  @Prop({ type: Boolean, default: false }) readonly horizontal!: boolean;
  @Prop({ type: Number }) readonly marginRight!: boolean;

  get fieldsetID() {
    return this.id ?? "nb-radio:" + generateUUID();
  }

  get chosen() {
    return this.value;
  }
  set chosen(v) {
    this.$emit("input", v);
  }

  get styles() {
    return this.marginRight ? `margin-right: ${this.marginRight}px;` : "";
  }

  get classes() {
    return {
      horizontal: this.horizontal,
      vertical: !this.horizontal,
      message: this.rules.length > 0,
      error: !!this.message,
    };
  }

  get reorganizedOptions() {
    return this.options.map((option, i) => {
      const preparedOption: TReorganizedRadioOption = {
        inputID: this.fieldsetID + ":" + i,
        classes: {},
        label: option.label,
        value: option.value,
      };
      if (option.disabled) preparedOption.classes.disabled = true;
      if (option.value === this.value) preparedOption.classes.checked = true;
      if (option.hint) {
        preparedOption.hint = option.hint;
        preparedOption.classes.hint = true;
      }
      return preparedOption;
    });
  }

  get hasRules() {
    return this.rules.length > 0;
  }

  get message() {
    return this.rules.map((rule) => rule(this.value)).find((item) => item !== true);
  }

  get errorMessageShown() {
    return !!(this.classes.error && this.message);
  }
}
</script>

<style lang="sass" scoped>
.nb-radio
  position: relative
  width: fit-content

  &__content
    align-items: flex-start

  &__label
    white-space: normal
    transition: all .2s

  &__options
    margin: 0
    padding: 0
    border: none
    align-items: flex-start
    flex-wrap: wrap

    &__item
      display: flex
      align-items: center

      input[type="radio"]
        display: none

      label
        cursor: pointer
        display: flex
        align-items: center

      &__toggler
        position: relative
        $a: 18px
        width: $a
        height: $a
        border-radius: 50%
        background: #c8d3e6
        display: flex
        justify-content: center
        align-items: center
        transition: all .2s

        &__circle
          $a: 14px
          width: $a
          height: $a
          border-radius: 50%
          background: #ffffff
          transition: all .2s

      &__label
        user-select: none
        padding-left: 6px
        white-space: normal
        transition: all .2s

      &:hover

        .nb-radio__options__item__toggler
          background: #a7b6cf

      &:active

        .nb-radio__options__item__toggler
          background: #7d91b2

      &.checked

        .nb-radio__options__item__toggler
          background: #00a69b

          &__circle
            transform: scale(calc(4/7))

        &.disabled

          .nb-radio__options__item__toggler
            background: #ccedeb

        &:hover

          .nb-radio__options__item__toggler
            background: #10978e

        &:active

          .nb-radio__options__item__toggler
            background: #108b83

      &.hint

        .nb-radio__options__item__label
          padding-right: 6px

        .ion-icon
          color: #7d91b2

      &.disabled
        pointer-events: none

        .nb-radio__options__item

          &__toggler

            &__circle
              background: #f3f7fd

          &__label
            color: #a7b6cf

  &.vertical

    .nb-radio

      &__label
        margin-bottom: 18px

      &__content
        display: flex
        flex-direction: column

      &__options
        display: flex
        flex-direction: column

        &__item

          &:not(:last-of-type)
            margin-bottom: 6px

  &.horizontal

    .nb-radio

      &__label
        margin-right: 54px

      &__content
        display: flex

      &__options
        display: flex

        &__item

          &:not(:last-of-type)
            margin-right: 12px

  &.message

    .nb-radio

      &__content
        margin-bottom: 6px

  &.error

    .nb-radio

      &__label
        background: #f9e4e6
</style>
