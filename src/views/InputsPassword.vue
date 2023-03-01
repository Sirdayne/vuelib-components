<template lang="pug">
.pl-2
  h2 Password
  .pb-2
  .pl-2
    h3 Rules
    .pb-2
    .pl-2
      template(v-for="rule in rules")
        nb-checkbox(v-model="rule.applied", :label="rule.func(false)")
  .pb-2
  .pl-2
    h3 Result
    .pb-2
    .pl-2
      nb-password(v-model="value", v-bind="props")
  .pb-2
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class InputsPassword extends Vue {
  rules: {
    applied: boolean;
    func: (v: string) => true | string;
    label: string;
  }[] = [
    {
      applied: false,
      func: (v) => v.length >= 8 || "At least 8 characters",
      label: "At least 8 characters",
    },

    {
      applied: false,
      func: (v) => v.length <= 16 || "Max 16 characters",
      label: "Max 16 characters",
    },
  ];

  value = "";

  get props() {
    return {
      rules: this.rules.filter((rule) => rule.applied).map((rule) => rule.func),
    };
  }
}
</script>
