<template lang="pug">
#switches
  .col
    nb-switch(v-model="value", label="Label")
    .mb-2
    nb-switch(v-model="value", label="Label", disabled)
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Switches extends Vue {
  value = false;
}
</script>
