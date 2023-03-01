<template lang="pug">
nb-dialog(v-model="isOpen")
  .nb-uploader(:class="{ disabled }")
    input(
      ref="input",
      :id="inputID",
      type="file",
      :multiple="multiple",
      :accept="accept",
      :disabled="computedDisabled",
      @change="onChange"
    )

    h1.h1 Drag and drop a file
    h2.h2
      | or
      |
      label(:for="inputID")
        nb-link(label="browse")
      |
      | to choose from your computer

    .nb-uploader__zone(
      @dragover.prevent="onDragOver",
      @dragleave.prevent="onDragLeave",
      @drop.stop.prevent="onDrop"
    )
      transition(name="fade", mode="out-in", appear)
        label.nb-uploader__placeholder(
          v-if="hasNoLocalFiles",
          :for="inputID",
          :class="{ 'dragged-over': isDraggedOver }"
        )
          img(src="@/assets/images/uploader.svg", width="90", height="90")
          .nb-uploader__hint
            slot(v-if="$slots.default")

            template(v-else)
              | You can upload a few PDF files,
              br
              | up to {{ maxFileSize }} MB each

        .nb-uploader__files(v-else)
          .nb-uploader__files__item(v-for="(file, i) in reorganizedFiles", :key="i")
            .nb-uploader__files__item__label
              .nb-uploader__files__item__label__text(:class="{ error: file.message }") {{ file.label }}

              nb-error-message(:value="file.message") {{ file.message }}

            nb-icon.nb-uploader__files__item__remove(
              name="close-circle",
              color="#7d91b2",
              @click="file.remove"
            )

  template(#actions)
    nb-btn(secondary, label="Cancel", @click="onCancel")
    nb-btn(label="Save", :disabled="!isEachFileValid", @click="onSave")
</template>

<script lang="ts">
import { generateUUID } from "@/utils/generateUUID";
import { Component, Prop, PropSync, Vue, Watch } from "vue-property-decorator";

@Component
export default class NbUploader extends Vue {
  @Prop({ type: String }) readonly id?: string;
  @Prop({ type: Array, required: true }) readonly value!: File[];
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
  @Prop({ type: Number, default: 100 }) readonly maxFileSize!: number;
  @Prop({ type: Number, default: 100 }) readonly maxFiles!: number;
  @Prop({ type: String }) readonly accept?: string;
  @Prop({ type: Boolean, default: false }) readonly multiple?: string;

  @PropSync("open", { required: true }) isOpen!: boolean;

  $refs!: {
    input: HTMLInputElement;
  };

  get inputID() {
    return this.id ?? "nb-uploader:" + generateUUID();
  }

  isDraggedOver = false;

  get computedDisabled() {
    const { files, disabled, maxFiles } = this;
    return disabled || files.length === maxFiles;
  }

  get files() {
    return this.value;
  }
  set files(v) {
    this.$emit("input", v);
  }

  localFiles: File[] = [];

  @Watch("isOpen", { immediate: true })
  isOpenChanged() {
    if (this.isOpen) {
      this.localFiles = [...this.files];
    }
  }

  get hasNoLocalFiles() {
    return this.localFiles.length === 0;
  }

  get reorganizedFiles() {
    const { localFiles, maxFileSize } = this;
    return localFiles.map((file, i, files) => {
      let message;
      const isLocalFileAppropriate = file.size <= maxFileSize * 2 ** 20;
      if (!isLocalFileAppropriate) {
        message = "Can’t upload the file, need to be under " + maxFileSize + " MB";
      }
      const previousLocalFiles = files.slice(0, i);
      const isLocalFileUnique = previousLocalFiles.every(({ name }) => name !== file.name);
      if (!isLocalFileUnique) {
        message = "File is uploaded several times";
      }
      return {
        label: file.name,
        message,
        remove: () => {
          this.localFiles.splice(i, 1);
        },
      };
    });
  }

  addLocalFiles(fileList: FileList) {
    const files = Array.from(fileList);
    if (this.multiple) {
      this.localFiles.push(...files);
    } else {
      this.localFiles = files;
    }
    this.$refs.input.value = "";
  }

  onDragOver() {
    this.isDraggedOver = true;
  }

  onDragLeave() {
    this.isDraggedOver = false;
  }

  onDrop(e: DragEvent) {
    const fileList = e.dataTransfer?.files;
    if (fileList) this.addLocalFiles(fileList);
    this.onDragLeave();
  }

  onChange() {
    const fileList = this.$refs.input.files;
    if (fileList) this.addLocalFiles(fileList);
  }

  get isEachFileValid() {
    return this.reorganizedFiles.every(({ message }) => !message);
  }

  close() {
    this.isOpen = false;
  }

  onCancel() {
    this.close();
    this.$emit("cancel");
  }

  onSave() {
    this.files = [...this.localFiles];
    this.close();
    this.$emit("save");
  }
}
</script>

<style lang="sass" scoped>
.nb-uploader
  flex: 1
  width: fit-content
  max-width: 100%
  overflow: hidden
  display: flex
  flex-direction: column
  align-items: center

  input[type="file"]
    display: none

  .h1, .h2
    width: 100%
    overflow: hidden
    text-align: center
    white-space: nowrap
    text-overflow: ellipsis

  &__zone
    min-width: 200px
    width: 100%
    max-width: 400px
    margin-top: 24px

  &__placeholder
    cursor: pointer
    box-sizing: border-box
    width: 100%
    height: 100%
    padding: 102px 0
    border: solid 2px #c8d3e5
    border-radius: 6px
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    transition: all .2s

    &:hover, &.draged-over
      border-color: #a7b6cf

    &:active
      border-color: #7d91b2

  img, &__hint
    pointer-events: none
    user-select: none

  img
    margin-bottom: 24px

  &__hint
    padding: 0 30px
    text-align: center
    white-space: break-spaces

  &__files
    display: flex
    flex-direction: column

    &__item
      padding: 12px 0
      display: flex
      align-items: flex-start

      &:not(:last-of-type)
        border-bottom: solid 1px #c8d3e5

      &__label
        flex: 1
        overflow: hidden
        display: flex
        flex-direction: column
        align-items: flex-start

        &__text
          max-width: 100%
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis

          &.error
            background: #f9e4e6

      &__remove
        cursor: pointer
        margin-left: 12px

        .ion-icon
          color: #7d91b2
</style>
