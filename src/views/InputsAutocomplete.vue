<template lang="pug">
.pl-2
  h2 Autocomplete
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
  .pl-2
    h3 Result
    .pb-2
    .pl-2
      nb-autocomplete(v-model="value", v-bind="props")
  .pb-2
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class InputsAutocomplete extends Vue {
  value = null;
  label = "Label";
  placeholder = "Placeholder";
  errorMessage = "Error message";
  disabled = false;

  get props() {
    const { label, placeholder, errorMessage, disabled } = this;
    return {
      label,
      placeholder,
      options: [
        { value: 1, label: "Google Academy UK Ltd" },
        { value: "Value 2", label: "Google Commerce Ltd" },
        { value: "Value 3", label: "Google Payment Limited" },
        { value: true, label: "Google Search Ltd" },
        { value: false, label: "Google Smth Ltd" },
      ],
      errorMessage,
      disabled: disabled || !errorMessage,
    };
  }
}
</script>
