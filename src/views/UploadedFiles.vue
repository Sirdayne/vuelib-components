<template lang="pug">
#uploaded-files
  nb-uploaded-file(@click="addFile")
  nb-uploaded-file(disabled)
  nb-uploaded-file(title="Loading...", loading)
  nb-uploaded-file(
    title="Submission sheet",
    @download="downloadFile",
    @archive="archiveFile",
    @delete="deleteFile",
    @click="viewFile"
  )
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class UploadedFiles extends Vue {
  addFile() {
    console.log("add");
  }

  viewFile() {
    console.log("view");
  }

  downloadFile() {
    console.log("download");
  }

  archiveFile() {
    console.log("archive");
  }

  deleteFile() {
    console.log("delete");
  }
}
</script>

<style lang="sass">
#uploaded-files
  margin-top: 24px
  display: flex
  flex-wrap: wrap

  & > *
    margin: 0 12px 12px 0
</style>
