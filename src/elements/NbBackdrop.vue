<template lang="pug">
transition(name="fade")
  .nb-backdrop(v-if="open", :class="{ blur: !noBlur }")
    .nb-backdrop__content
      slot
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NbBackdrop extends Vue {
  @Prop({ type: Boolean, required: true }) readonly open!: boolean;
  @Prop({ type: Boolean, default: false }) readonly noBlur!: boolean;

  mounted() {
    this.$root.$el.append(this.$el);
  }

  destroyed() {
    this.$el.parentNode?.removeChild(this.$el);
  }
}
</script>

<style lang="sass">
.nb-backdrop
  position: fixed
  z-index: 1000
  top: 0
  bottom: 0
  left: 0
  right: 0
  overflow-y: auto
  background: #0c2a5d99

  &.blur
    backdrop-filter: blur(10px)

  &__content
    position: relative
    z-index: 2
    box-sizing: border-box
    min-height: 100%
    max-width: 90vw
    margin: 0 auto
    padding: 30px 42px
    display: flex
    justify-content: center
    align-items: center
</style>
