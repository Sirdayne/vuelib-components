<template lang="pug">
#typography
  .col
    h1 Heading 1
    h2 Heading 2
    h3 Heading 3

    .mb-10

    .row
      span Regular
      .mr-6
      .text-label Label
      .mr-6
      .text-placeholder Placeholder

    .mb-10

    .col.font-smaller
      .text-caption Caption

      .mb-3

      a Link

      .mb-3

      .text-error Error
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Typography extends Vue {}
</script>
