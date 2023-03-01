<template lang="pug">
nb-input(ref="input", v-model="search", v-bind="props", @click:append="search = ''")
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { TInputRule, TSelectValue, TSelectOption } from "@/models/Input";
import NbInput from "./NbInput.vue";

@Component
export default class NbAutocomplete extends Vue {
  @Prop({ type: [Number, String, Boolean] }) readonly value?: TSelectValue | null;
  @Prop({ type: Array, required: true }) readonly options!: TSelectOption[];
  @Prop({ type: String, default: "Choose from the list" }) readonly errorMessage!: string;
  @Prop({ type: String }) readonly label?: string;
  @Prop({ type: String }) readonly placeholder?: string;
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;

  $refs!: {
    input: NbInput;
  };

  showError() {
    this.$refs.input?.showError();
  }

  search = "";

  @Watch("value", { immediate: true })
  onValueChange() {
    const label = this.options.find((option) => option.value === this.value)?.label;
    if (label) this.search = label;
  }

  @Watch("search", { immediate: true })
  onSearchChange() {
    const value = this.options.find((option) => option.label === this.search)?.value;
    if (value !== this.value && value !== undefined) this.$emit("input", value);
    this.$emit("search", this.search);
  }

  get props() {
    return {
      label: this.label,
      placeholder: this.placeholder,
      iconPrepend: "search",
      iconAppend: "close-circle",
      iconAppendHidden: ["empty", "unfocused"],
      options: this.options,
      rules: [
        (v) => this.options.map((option) => option.label).includes(v) || this.errorMessage,
      ] as TInputRule[],
      disabled: this.disabled,
    };
  }
}
</script>
