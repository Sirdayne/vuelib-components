<template lang="pug">
#uploaders
  nb-btn(label="Upload file", @click="isOpen = true")

  nb-uploader(:open.sync="isOpen", multiple, v-model="value", :max-file-size="1")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Uploaders extends Vue {
  isOpen = false;

  value: File[] = [];
}
</script>
