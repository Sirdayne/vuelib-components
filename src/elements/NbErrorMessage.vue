<template lang="pug">
transition-expand
  .nb-error-message(v-if="isOpen")
    ion-icon.ion-icon(name="alert-circle")

    .nb-error-message__text
      slot
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NbErrorMessage extends Vue {
  @Prop({ type: [Boolean, String] }) readonly value?: boolean;

  get isOpen() {
    return !!this.value;
  }
}
</script>

<style lang="sass" scoped>
.nb-error-message
  user-select: none
  box-sizing: border-box
  margin-top: 6px
  color: #e85658
  font-size: 12px
  text-align: left
  display: flex
  align-items: center
  transition: all .2s

  .ion-icon
    min-width: 18px
    margin-right: 6px
    font-size: 18px

  &__text
    flex: 1
    font-size: 12px
</style>
