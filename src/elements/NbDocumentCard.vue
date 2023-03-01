<template lang="pug">
.document-card
  .document-card__locked(v-if="locked")
    ion-icon.ion-icon(name="lock-closed")

  .document-card__outline(:class="{ 'document-card__outline_filled': filled }")
    ion-icon.ion-icon(:style="{ color }", :name="icon")

  p.document-card__description {{ description }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NbDocumentCard extends Vue {
  @Prop({ type: String, required: true }) readonly description!: string;
  @Prop({ type: Boolean, default: false }) readonly success!: boolean;
  @Prop({ type: Boolean, default: false }) readonly warning!: boolean;
  @Prop({ type: Boolean, default: false }) readonly locked!: boolean;
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;

  color = "#7d91b2";
  icon = "checkmark-circle-outline";
  filled = false;

  initParams() {
    if (this.success) {
      this.color = "#00a69b";
      this.icon = "checkmark-circle-outline";
    } else if (this.warning) {
      this.color = "#e85658";
      this.icon = "warning-outline";
    } else if (this.disabled) {
      this.color = "#7d91b2";
      this.icon = "arrow-up-outline";
      this.filled = true;
    } else {
      this.color = "#175bcf";
      this.icon = "arrow-up-outline";
      this.filled = true;
    }
  }

  created() {
    this.initParams();
  }
}
</script>

<style lang="sass" scoped>
.document-card
  position: relative
  box-sizing: border-box
  width: 172px
  padding: 42px 12px 12px
  border: solid 1px #e6ecf5
  border-radius: 8px
  background: #ffffff
  display: flex
  flex-direction: column
  align-items: center

  .ion-icon
    background: #ffffff
    color: #7d91b2
    font-size: 70px

  &__locked
    position: absolute
    top: 12px
    right: 12px

    .ion-icon
      font-size: 22px

  &__description
    margin: 36px 0 0
    color: #0c2a5d
    font-size: 14px
    font-weight: 600
    line-height: 1.29
    text-align: center

  &__outline
    padding: 12px
    border-radius: 50%

    &_filled
      background-color: #e6ecf5

      .ion-icon
        padding: 12px
        border-radius: 50%
        font-size: 50px
</style>
