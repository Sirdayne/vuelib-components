<template lang="pug">
#checkboxes
  .col
    nb-checkbox(v-model="value1", label="Default")
    .mb-2
    nb-checkbox(v-model="value2", label="With error", :rules="rules")
    .mb-2
    nb-checkbox(v-model="value3", label="Disabled", disabled)
    .mb-2
    nb-checkbox(v-model="value4", label="Disabled checked", disabled)
    .mb-2
    nb-checkbox(small, v-model="value1", label="Default (small)")
    .mb-2
    nb-checkbox(small, v-model="value2", label="With error (small)", :rules="rules")
    .mb-2
    nb-checkbox(small, v-model="value3", label="Disabled (small)", disabled)
    .mb-2
    nb-checkbox(small, v-model="value4", label="Disabled checked (small)", disabled)
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Checkboxes extends Vue {
  value1 = false;
  value2 = false;
  value3 = false;
  value4 = true;

  rules = [(v: boolean) => !v || "Try to uncheck"];
}
</script>
