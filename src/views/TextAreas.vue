<template lang="pug">
#text-areas
  .col(style="max-width: 480px")
    nb-text-area(v-model="value", placeholder="Start typing...", :maxlength="500", :rows="7")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TextAreas extends Vue {
  value = "";
}
</script>
