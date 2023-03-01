<template lang="pug">
#radios
  .col
    nb-radio(v-model="value", :options="options", label="One radio", :rules="rules")
    .mb-4
    nb-radio(horizontal, v-model="value", :options="options", label="Another one", :rules="rules")
</template>

<script lang="ts">
import { TRadioOption, TRadioRule, TRadioValue } from "@/models/Radio";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Radios extends Vue {
  value: TRadioValue | null = null;

  options: TRadioOption[] = [
    { value: 1, label: "Option 1" },
    { value: "Value 2", label: "Option 2" },
    { value: "Value 3", label: "Option 3", disabled: true },
    { value: true, label: "Option 4", hint: "Hint" },
    { value: false, label: "Option 5" },
  ];

  rules: TRadioRule[] = [(v) => v === true || "Try Option 4, please"];
}
</script>
