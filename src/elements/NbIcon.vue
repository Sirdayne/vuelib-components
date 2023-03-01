<template lang="pug">
button.nb-icon(
  :class="{ small, effects }",
  :style="{ color }",
  :disabled="disabled",
  @click="$emit('click')"
)
  ion-icon.ion-icon(:name="name")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NbIcon extends Vue {
  @Prop({ type: String, required: true }) readonly name!: string;
  @Prop({ type: String }) readonly color?: string;
  @Prop({ type: Boolean, default: false }) readonly small!: boolean;
  @Prop({ type: Boolean, default: false }) readonly effects!: boolean;
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
}
</script>

<style lang="sass" scoped>
.nb-icon
  padding: 3px
  border-radius: 50%
  transition: all .2s

  .ion-icon
    color: #7d91b2
    transition: all .2s

  &.effects

    &:hover
      background: #f3f7fd

      .ion-icon
        color: #536b94

    &:active
      background: none

      .ion-icon
        color: #0c2a5d

  &:disabled
    cursor: default
    background: none

    .ion-icon
      color: #c8d3e5

  &.small
    font-size: 12px
</style>
