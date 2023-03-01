<template lang="pug">
.nb-alert(:class="classes")
  .nb-alert__line

  .nb-alert__icon
    ion-icon.ion-icon(:name="icon")

  .nb-alert__text
    h3 {{ title }}
    .nb-alert__text__message {{ message }}

  nb-icon.nb-alert__closer(small, name="close-outline", @click="close")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

const alertTypes = ["success", "info", "warning", "error"] as const;
type TAlertType = typeof alertTypes[number];

@Component
export default class NbAlert extends Vue {
  @Prop({
    type: String,
    required: true,
    validator: (v) => alertTypes.includes(v),
  })
  readonly type!: TAlertType;
  @Prop({ type: String, required: true }) readonly title!: string;
  @Prop({ type: String, required: true }) readonly message!: string;

  get classes() {
    return this.type;
  }

  get icon() {
    const { type } = this;
    const map = new Map<TAlertType, string>();
    map.set("success", "checkmark");
    map.set("info", "information-outline");
    map.set("warning", "alert");
    map.set("error", "alert");
    return map.get(type);
  }

  close() {
    this.$emit("close");
  }
}
</script>

<style lang="sass" scoped>
.nb-alert
  position: relative
  box-sizing: border-box
  width: 400px
  height: 80px
  overflow: hidden
  box-shadow: 0px 8px 24px #5572a41f
  border-radius: 4px 0 0 4px
  background: #ffffff
  display: flex
  align-items: center

  &__line
    width: 6px
    height: 100%

  &__icon
    margin: 0 18px
    padding: 3px
    border-radius: 50%
    font-size: 12px

    .ion-icon
      color: #ffffff

  &__text
    cursor: default
    flex: 1
    overflow: hidden
    display: flex
    flex-direction: column

    h3, &__message
      width: 100%
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis

    &__message
      color: #536b94
      font-size: 12px

  &__closer
    margin: 0 12px

  &.success

    .nb-alert

      &__line, &__icon
        background: #00a69b

  &.info

    .nb-alert

      &__line, &__icon
        background: #285ec8

  &.warning

    .nb-alert

      &__line, &__icon
        background: #f9d587

  &.error

    .nb-alert

      &__line, &__icon
        background: #e85658
</style>
