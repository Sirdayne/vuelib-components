<template lang="pug">
a.nb-link(:target="target", @click="go")
  b {{ label }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NbLink extends Vue {
  @Prop({ type: String, required: true }) readonly label!: string;
  @Prop({ type: String }) readonly to?: string;
  @Prop({ type: Boolean }) readonly blank?: boolean;

  get target() {
    return this.blank ? "_blank" : "_self";
  }

  go() {
    if (this.to) {
      if (this.blank) {
        window.open(this.to);
      } else {
        const { path, fullPath } = this.$route;
        if (this.to !== path && this.to !== fullPath) {
          this.$router.push(this.to);
        }
      }
    } else {
      this.$emit("click");
    }
  }
}
</script>

<style lang="sass" scoped>
.nb-link
  color: #00a69b
  transition: all .2s

  &:hover
    color: #10978e

  &:active
    color: #0a7871

  &:disabled
    color: #7d91b2
</style>
