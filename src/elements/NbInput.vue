<template lang="pug">
.nb-input(:class="classes", v-click-outside="closeMenu")
  template(v-if="hasOptions")
    transition(name="fade")
      aside.nb-input__menu(v-if="isMenuOpened")
        ul.nb-input__menu__list
          li.nb-input__menu__list__item.inactive(v-if="reorganizedOptions.length === 0")
            | No result

          li.nb-input__menu__list__item(
            v-for="option in reorganizedOptions",
            :key="option.key",
            @click="option.action"
          )
            b {{ option.label.bold }}
            span {{ option.label.regular }}

  label(:for="attributes.id", @click="toggleOptions")
    fieldset.nb-input__wrapper(@mouseenter="mouseenter = true", @mouseleave="mouseenter = false")
      legend.nb-input__gap(v-if="label", :data-label="label")

      .nb-input__inner
        .nb-input__icon-prepend(v-if="iconPrepend")
          ion-icon.ion-icon(:name="iconPrepend")

        .nb-input__content
          .nb-input__label(v-if="label") {{ label }}
          .nb-input__placeholder(v-if="placeholder") {{ placeholder }}
          input(ref="input", v-model="text", v-bind="attributes", v-on="listeners", v-mask="mask")

        .nb-input__icon-append(v-if="disabled || iconAppend", :class="iconAppendClasses")
          ion-icon.ion-icon(v-if="disabled", name="lock-closed-outline")
          ion-icon.ion-icon(
            v-else-if="iconAppend",
            :name="iconAppend",
            @click="$emit('click:append')"
          )

  nb-error-message(:value="errorMessageShown") {{ message }}
</template>

<script lang="ts">
import { generateUUID } from "@/utils/generateUUID";
import { Component, Vue, Prop } from "vue-property-decorator";
import {
  TInputType,
  TIconAppendHiddenCase,
  inputTypes,
  iconAppendHiddenCases,
  TInputRule,
  TSelectOption,
} from "@/models/Input";

type TInputAttributes = {
  id: string;
  type: TInputType;
  autocomplete: string;
  spellcheck: boolean;
  autofocus?: boolean;
  disabled?: boolean;
};

@Component
export default class NbInput extends Vue {
  @Prop({ type: String, required: true }) readonly value!: string;
  @Prop({ type: String }) readonly id?: string;
  @Prop({
    type: String,
    default: "text",
    validator: (v) => inputTypes.includes(v),
  })
  readonly type!: TInputType;
  @Prop({ type: Boolean, default: false }) readonly nonFilterable!: boolean;
  @Prop({ type: Array, default: () => [] }) readonly options!: TSelectOption[];
  @Prop({ type: String }) readonly label?: string;
  @Prop({ type: String }) readonly placeholder?: string;
  @Prop({ type: String }) readonly mask?: string;
  @Prop({ type: String, default: "new-password" }) readonly autocomplete!: string;
  @Prop({ type: Boolean, default: false }) readonly spellcheck!: boolean;
  @Prop({ type: Boolean, default: false }) readonly autofocus!: boolean;
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
  @Prop({ type: String }) readonly iconPrepend?: string;
  @Prop({ type: String }) readonly iconAppend?: string;
  @Prop({
    type: Array,
    default: () => [],
    validator: (v) => {
      if (!Array.isArray(v)) return false;
      if (!v.every((el) => iconAppendHiddenCases.includes(el))) return false;
      return true;
    },
  })
  readonly iconAppendHidden!: TIconAppendHiddenCase[];
  @Prop({ type: Array, default: () => [] }) readonly rules!: TInputRule[];

  $refs!: {
    input: HTMLInputElement;
  };

  get inputID() {
    return this.id ?? "nb-input:" + generateUUID();
  }

  get attributes() {
    const attrs: TInputAttributes = {
      id: this.inputID,
      type: this.type,
      autocomplete: this.autocomplete,
      spellcheck: this.spellcheck,
      autofocus: this.autofocus,
      disabled: this.nonFilterable || this.disabled,
    };
    return attrs;
  }

  get text() {
    return this.value;
  }
  set text(v) {
    this.$emit("input", v);
  }

  focused = this.autofocus && !document.activeElement;

  focus() {
    this.$refs.input?.focus();
  }

  blur() {
    this.$refs.input?.blur();
  }

  get iconAppendClasses() {
    return {
      hidden:
        !this.disabled &&
        ((this.iconAppendHidden.includes("empty") && !this.text) ||
          (this.iconAppendHidden.includes("unfocused") && !this.focused)),
    };
  }

  errorShown = false;

  showError() {
    this.errorShown = true;
  }

  hideError() {
    this.errorShown = false;
  }

  get hasRules() {
    return this.rules.length > 0;
  }

  get message() {
    return this.rules.map((rule) => rule(this.text)).find((item): item is string => item !== true);
  }

  get messageShown() {
    return !this.focused && this.message !== undefined && this.errorShown;
  }

  get errorMessageShown() {
    return !!(this.classes.error && this.message);
  }

  get hasOptions() {
    return this.options.length > 0;
  }

  isMenuOpened = false;

  closeMenu() {
    this.isMenuOpened = false;
    if (this.nonFilterable) this.errorShown = true;
  }

  toggleOptions() {
    if (this.nonFilterable) {
      if (!this.isMenuOpened) {
        this.isMenuOpened = true;
        this.errorShown = false;
      } else {
        this.isMenuOpened = false;
        this.errorShown = true;
      }
    }
  }

  get reorganizedOptions() {
    return this.options
      .filter((option) => {
        if (this.nonFilterable) return true;
        const labelLow = option.label.toLowerCase();
        const textLow = this.text.toLowerCase();
        return labelLow.startsWith(textLow);
      })
      .map((option, i) => {
        const key = "option:" + i;
        let bold = "";
        let regular = option.label;
        if (this.text.length < option.label.length || this.text === option.label) {
          bold = option.label.slice(0, this.text.length);
          regular = regular.slice(this.text.length);
        }
        const text = option.label;
        const label = { bold, regular, text };
        const action = () => {
          this.text = option.label;
          this.isMenuOpened = false;
          if (this.nonFilterable) this.errorShown = true;
        };
        return { key, label, action };
      });
  }

  get classes() {
    return {
      disabled: this.disabled,
      "label-up":
        !!this.label && (!!this.placeholder || this.focused || !!this.value) && !this.disabled,
      "label-hidden": !!this.label && !!this.value && this.disabled,
      "icon-prepend": !!this.iconPrepend,
      rules: this.hasRules,
      error: this.messageShown && !this.disabled,
      "placeholder-only": !!this.placeholder && !this.label,
      "placeholder-hidden": !!this.value || (this.disabled && !!this.label),
    };
  }

  get listeners() {
    return {
      focus: () => {
        this.focused = true;
        this.isMenuOpened = true;
        this.$emit("focus");
      },
      blur: () => {
        if (this.mouseenter && this.mousedown) {
          this.focus();
        } else {
          this.focused = false;
          this.errorShown = true;
          this.$emit("blur");
        }
      },
    };
  }

  mouseenter = false;
  mousedown = false;

  addWindowListeners() {
    window.addEventListener("mousedown", () => (this.mousedown = true));
    window.addEventListener("mouseup", () => (this.mousedown = false));
  }

  mounted() {
    this.addWindowListeners();
  }
}
</script>

<style lang="sass" scoped>
$padding-wrapper: 12px
$padding-gap: 6px
$scale-label: 0.75
$a: 24px

.nb-input
  position: relative
  min-width: 192px
  margin-top: $padding-wrapper
  display: flex
  flex-direction: column

  label
    position: relative

    &:hover

      .nb-input

        &__wrapper
          border-color: #a7b6cf

        &__icon-prepend, &__icon-append

          .ion-icon
            color: #a7b6cf

    &:focus-within

      .nb-input

        &__wrapper
          cursor: text
          border-color: #00a69b

        &__label
          color: #00a69b

        &__icon-prepend, &__icon-append

          .ion-icon
            color: #00a69b

  &__menu
    position: absolute
    top: calc(100% + 2px)
    z-index: 1000
    box-sizing: border-box
    width: 100%
    max-height: calc(8 * 36px + 2 * 1px)
    overflow-y: auto
    box-shadow: 0 2px 4px 0 #0c2a5d0a, 0 8px 24px 0 #5572a41e
    border: solid 1px #c8d3e5
    border-radius: 4px
    background: #ffffff

    &__list

      &__item
        cursor: pointer
        padding: 6px 12px
        transition: all .2s

        &:hover
          background: #f3f7fd

        &.inactive
          pointer-events: none
          color: #a7b6cf

  &__wrapper
    cursor: pointer
    position: relative
    min-width: 100%
    box-sizing: border-box
    padding: $padding-wrapper calc(#{$padding-wrapper} - #{$padding-gap})
    margin: 0
    border: solid 1px #c8d3e6
    border-radius: 4px
    background: none
    transition: all .2s

  &__gap
    max-width: 0
    height: 0
    overflow: hidden
    padding: 0
    transition: all .2s

    &::before
      content: attr(data-label)
      font-size: #{$scale-label}rem

  &__inner
    position: relative
    display: flex

  &__content
    position: relative
    flex: 1
    margin-left: $padding-gap

  &__label
    user-select: none
    cursor: default
    max-width: calc(100% - 2 * #{$padding-wrapper})
    color: #536b94
    position: absolute
    z-index: 2
    top: 0
    left: 0
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis
    transition: all .2s

  &__placeholder
    user-select: none
    z-index: 1
    position: absolute
    width: 100%
    height: 100%
    overflow: hidden
    color: #a7b6cf
    white-space: nowrap
    text-overflow: ellipsis
    transition: all .2s

  input
    position: relative
    z-index: 2
    width: 100%
    height: $a
    transition: all .2s

  &__icon-prepend, &__icon-append
    width: $a
    height: $a
    display: flex
    justify-content: center
    align-items: center
    transition: all .2s

    .ion-icon
      color: #c8d3e6
      font-size: 18px
      transition: all .2s

  &__icon-append
    margin-left: $padding-gap

    .ion-icon
      cursor: pointer

  &.label-up

    .nb-input

      &__gap
        max-width: 100%
        padding: 0 $padding-gap

      &__label
        top: calc(-2 * #{$padding-wrapper})
        transform: scale($scale-label)
        transform-origin: left center

    &.icon-prepend

      .nb-input

        &__label
          left: -$a

  &.label-hidden

    .nb-input

      &__label
        opacity: 0
        visibility: hidden

  &.placeholder-hidden

    .nb-input

      &__placeholder
        opacity: 0
        visibility: hidden

  &.error

    .nb-input

      &__wrapper, &__wrapper:hover, &__wrapper:focus-within
        border-color: #e85658

        .nb-input__label
          color: #e85658

  &.disabled
    pointer-events: none

    input
      color: #a7b6cf

    .nb-input

      &__wrapper
        background: #f3f7fd

      &__label
        color: #a7b6cf

      &__icon-append

        .ion-icon
          color: #c8d3e6
          opacity: 0
          visibility: visible
</style>
