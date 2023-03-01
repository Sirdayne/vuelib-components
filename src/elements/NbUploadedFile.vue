<template lang="pug">
.nb-uploaded-file(:class="{ 'cursor-pointer': !hasTitle }", @click="$emit('click')")
  ion-icon.ion-icon-disabled(v-if="disabled", name="lock-closed")

  .nb-uploaded-file__activator(
      v-if="isActivatorAvailable",
      @click="toggleMenu($event)",
      v-click-outside="closeMenu"
    )
    nb-icon(name="ellipsis-vertical")

  transition(name="fade")
    .nb-uploaded-file__options(v-if="isMenuOpen")
      .nb-uploaded-file__options__item(v-if="hasDownloadListener", @click="emitStopPropagation('download', $event)")
        | Download
      .nb-uploaded-file__options__item(v-if="hasArchiveListener", @click="emitStopPropagation('archive', $event)")
        | Archive
      .nb-uploaded-file__options__item.text-red(v-if="hasDeleteListener", @click="emitStopPropagation('delete', $event)")
        | Delete

  .nb-uploaded-file__img
    NbSpinner(v-if="loading")
    img(v-else, v-bind="image")

  .nb-uploaded-file__title
    | {{ hasTitle ? title : 'Add new' }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NbSpinner from "@/elements/NbSpinner.vue";

@Component({
  components: { NbSpinner },
})
export default class NbUploadedFile extends Vue {
  @Prop({ type: String }) readonly title?: string;
  @Prop({ type: Boolean }) readonly loading?: boolean;
  @Prop({ type: Boolean }) readonly disabled?: boolean;

  get hasTitle() {
    return !!this.title;
  }

  get hasDownloadListener() {
    return !!this.$listeners.download;
  }

  get hasArchiveListener() {
    return !!this.$listeners.archive;
  }

  get hasDeleteListener() {
    return !!this.$listeners.delete;
  }

  get hasAnyListener() {
    return this.hasDownloadListener || this.hasArchiveListener || this.hasDeleteListener;
  }

  get isActivatorAvailable() {
    return this.hasTitle && this.hasAnyListener;
  }

  get image() {
    const name = this.disabled ? "disabled" : this.hasTitle ? "doc" : "add";
    return {
      src: require(`@/assets/images/upload-${name}.svg`),
      alt: name,
    };
  }

  emitStopPropagation(emit: string, e: Event) {
    if (e) {
      e.stopPropagation();
    }
    this.$emit(emit);
  }

  isMenuOpen = false;

  toggleMenu(e: Event) {
    if (e) {
      e.stopPropagation();
    }
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
</script>

<style lang="sass">
.nb-uploaded-file
  position: relative
  box-sizing: border-box
  width: 172px
  padding: 40px 12px 32px
  border: solid 1px #dce5f2
  border-radius: 8px

  &.cursor-pointer
    cursor: pointer

  .ion-icon-disabled
    position: absolute
    top: 12px
    right: 12px
    color: #7d91b2
    font-size: 22px

  &__activator
    cursor: pointer
    position: absolute
    top: 12px
    right: 6px

    .ion-icon
      color: #7d91b2
      font-size: 22px

  &__options
    cursor: pointer
    position: absolute
    top: 36px
    right: 6px
    box-sizing: border-box
    width: 144px
    box-shadow: 0px 2px 4px #0c2a5d0a, 0px 8px 24px #5572a41f
    border: solid 1px #dfe0eb
    border-radius: 4px
    background: #ffffff

    &__item
      box-sizing: border-box
      padding: 12px
      font-size: 16px

      &.text-red
        color: #e85658

  &__img
    display: flex
    justify-content: center
    align-items: center

    img
      width: auto
      height: 84px

    .nb-spinner
      margin-top: 20px

  &__title
    margin-top: 40px
    font-size: 14px
    font-weight: 600
    text-align: center
    word-break: break-word
</style>
