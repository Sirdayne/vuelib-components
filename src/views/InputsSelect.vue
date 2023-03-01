<template lang="pug">
.pl-2
  h2 Select
  .pb-2
  .pl-2
    h3 Props
    .pb-2
    .pl-2
      nb-text-field(v-model="label", label="The label of the field")
      .pb-2
      nb-text-field(v-model="placeholder", label="The placeholder of the field")
      .pb-2
      nb-text-field(v-model="errorMessage", label="The error message of the field")
      .pb-2
      nb-checkbox(v-model="disabled", label="The field is disabled")
      .pb-2
      nb-checkbox(v-model="searchable", label="The field is searchable")
  .pb-2
  .pl-2
    h3 Result
    .pb-2
    .pl-2
      nb-select(v-model="value", v-bind="props")
  .pb-2
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TInputRule, TSelectOption, TSelectValue } from "@/models/Input";

@Component
export default class InputsSelect extends Vue {
  value: TSelectValue = true;

  label = "Label";
  placeholder = "Placeholder";
  errorMessage = "Choose another item";
  disabled = false;
  searchable = false;
  options = [] as TSelectOption[];

  get rules(): TInputRule[] {
    return [(v) => !v.includes("1") || this.errorMessage];
  }

  get props() {
    const { label, placeholder, disabled, options, rules, searchable } = this;
    return { label, placeholder, disabled, options, rules, searchable };
  }

  fillOptions() {
    const { options } = this;
    options.push({ value: 1, label: "Item 1" });
    options.push({ value: 2, label: "Item 2" });
    options.push({ value: "Value 3", label: "Item 3" });
    options.push({ value: "Value 4", label: "Item 4" });
    options.push({ value: true, label: "Item 5" });
    options.push({ value: false, label: "Item 6" });
  }

  created() {
    this.fillOptions();
  }
}
</script>
