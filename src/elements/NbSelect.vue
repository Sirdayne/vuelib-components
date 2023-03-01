<template lang="pug">
nb-input(ref="input", v-model="text", v-bind="props")
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { TInputRule, TSelectValue, TSelectOption } from "@/models/Input";
import NbInput from "./NbInput.vue";

@Component
export default class NbSelect extends Vue {
  @Prop({ type: [Number, String, Boolean] }) readonly value?: TSelectValue;
  @Prop({ type: Array, required: true }) readonly options!: TSelectOption[];
  @Prop({ type: Array, default: () => [] }) readonly rules!: TInputRule[];
  @Prop({ type: String }) readonly label?: string;
  @Prop({ type: String }) readonly placeholder?: string;
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
  @Prop({ type: Boolean, default: false }) readonly searchable!: boolean;
  @Prop({ type: String }) readonly iconPrepend?: string;

  $refs!: {
    input: NbInput;
  };

  showError() {
    this.$refs.input?.showError();
  }

  text = "";

  @Watch("text", { immediate: true })
  onTextChange() {
    if (this.text === "" && this.value !== null) {
      const text = this.options.find((option) => option.value === this.value)?.label;
      if (text && !this.searchable) {
        this.text = text;
      }
    }
    const value = this.options.find((option) => option.label === this.text)?.value;
    if (value !== this.value && value !== undefined) this.$emit("input", value);
  }

  get props() {
    return {
      options: this.options,
      rules: this.rules,
      label: this.label,
      placeholder: this.placeholder,
      iconPrepend: this.iconPrepend,
      iconAppend: "caret-down-outline",
      nonFilterable: !this.searchable,
      disabled: this.disabled,
      searchable: this.searchable,
    };
  }
}
</script>
