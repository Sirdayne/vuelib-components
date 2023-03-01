<template lang="pug">
router-link.sidebar__link(:class="classes", :to="to")
  ion-icon.ion-icon(:name="icon")
  .sidebar__link__label {{ label }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AppSidebarLink extends Vue {
  @Prop({ type: String, required: true }) readonly to!: string;
  @Prop({ type: String, required: true }) readonly label!: string;
  @Prop({ type: String }) readonly icon?: string;
  @Prop({ type: Boolean, default: false }) readonly labelHidden!: boolean;

  get classes() {
    const { labelHidden } = this;
    return {
      "label-hidden": labelHidden,
    };
  }
}
</script>

<style lang="sass" scoped>
.sidebar__link
  box-sizing: border-box
  padding: 12px 30px
  text-decoration: none
  display: flex
  align-items: center
  transition: all .2s

  .ion-icon, &__label
    color: #536b94

  .ion-icon
    padding: 3px

  &__label
    box-sizing: border-box
    width: 164px
    overflow: hidden
    padding-left: 12px
    white-space: nowrap
    text-overflow: ellipsis
    transition: all .2s

  &.router-link-exact-active, &:hover
    background: #f3f7fd

  &.router-link-exact-active
    .ion-icon, .sidebar__link__label
      color: #0c2a5d

  &.label-hidden

    .sidebar__link__label
      width: 0
      padding-left: 0
      opacity: 0
      visibility: hidden
</style>
