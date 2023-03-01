<template lang="pug">
#error-404
  h1.text-center Page not found!
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Error404 extends Vue {}
</script>
