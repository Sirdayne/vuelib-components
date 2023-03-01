<template lang="pug">
transition(name="fade")
  .nb-table__menu(v-if="isOpen", :style="elStyle", v-click-outside="close")
    slot
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class NbTableMenu extends Vue {
  @Prop({ type: Boolean, required: true }) readonly value!: boolean;

  get isOpen() {
    return this.value;
  }
  set isOpen(v) {
    this.$emit("input", v);
  }

  @Watch("isOpen", { immediate: true })
  isOpenChanged() {
    if (this.isOpen) {
      this.setElStyle();
    }
  }

  close() {
    this.isOpen = false;
  }

  offsetTop = 0;
  offsetRight = 0;

  get elStyle() {
    return {
      top: `${this.offsetTop}px`,
      right: `${this.offsetRight}px`,
    };
  }

  setElStyle() {
    this.$nextTick(() => {
      const { parentElement } = this.$el;
      if (parentElement) {
        const { top, right, height } = parentElement.getBoundingClientRect();
        const { clientWidth } = document.documentElement;
        this.offsetTop = top + height;
        this.offsetRight = clientWidth - right;
      }
    });
  }

  addWheelListener() {
    window.addEventListener("wheel", () => {
      if (this.isOpen) {
        this.isOpen = false;
      }
    });
  }

  mounted() {
    this.addWheelListener();
  }
}
</script>

<style lang="sass">
.nb-table__menu
  position: fixed
  z-index: 100
  width: fit-content
  margin: 0
  box-shadow: 0 2px 4px 0 #0c2a5d0a, 0 8px 24px 0 #5572a41f
  border: solid 1px #dfe0eb
  border-radius: 4px
  background: #ffffff
  font-size: 16px
</style>
