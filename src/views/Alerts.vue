<template lang="pug">
#alerts
  nb-alert(type="success", title="Success", message="Success message")
  .mb-2
  nb-alert(type="info", title="Info", message="Info message")
  .mb-2
  nb-alert(type="warning", title="Warning", message="Warning message")
  .mb-2
  nb-alert(type="error", title="Error", message="Error message")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Alerts extends Vue {}
</script>
