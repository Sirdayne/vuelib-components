<template lang="pug">
th.nb-th(:class="classes")
  .nb-th__content
    span.nb-th__text
      slot
    nb-table-filters(v-if="hasFilters", :items="filters")
    ion-icon(v-if="hasHint", name="information-circle-outline", v-tooltip.top="hint")
</template>

<script lang="ts">
import { TTableFilter } from "@/models/Table";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NbTH extends Vue {
  @Prop({ type: Array }) readonly filters?: TTableFilter[];
  @Prop({ type: String }) readonly hint?: string;

  get hasFilters() {
    return !!this.filters;
  }

  get hasHint() {
    return !!this.hint;
  }

  get hasText() {
    return !!this.$slots.default;
  }

  get classes() {
    return {
      "nb-th--compact": !this.hasText,
    };
  }
}
</script>

<style lang="sass">
.nb-th
  margin: 0
  padding: 24px 30px 18px
  border-bottom: 1px solid #dce5f2
  color: #536b94
  font-size: 16px
  font-weight: normal
  text-align: left

  &__content
    display: flex
    align-items: center

  &__text

    & + *
      margin-left: 6px

  &--compact
    padding: 0 12px

.tooltip-content
  text-align: center
  font-size: 12px
</style>
