<template lang="pug">
.nb-text-area
  textarea(v-model="text", v-bind="attributes")
  .nb-text-area__message {{ remainingCharactersCount }} characters remaining
</template>

<script lang="ts">
import { generateUUID } from "@/utils/generateUUID";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NbTextArea extends Vue {
  @Prop({ type: String }) readonly id?: string;
  @Prop({ type: String, required: true }) readonly value!: string;
  @Prop({ type: String }) readonly placeholder?: string;
  @Prop({ type: Boolean }) readonly spellcheck?: string;
  @Prop({ type: Number }) readonly rows?: number;
  @Prop({
    type: Number,
    default: 2000,
    validator: (v) => {
      if (typeof v !== "number") return false;
      if (!Number.isInteger(v)) return false;
      if (v <= 0 || v > 2000) return false;
      return true;
    },
  })
  readonly maxlength!: number;

  get textareaID() {
    return this.id ?? "nb-textarea:" + generateUUID();
  }

  get attributes() {
    return {
      textareaID: this.textareaID,
      placeholder: this.placeholder,
      spellcheck: this.spellcheck,
      maxlength: this.maxlength,
      rows: this.rows,
    };
  }

  get remainingCharactersCount() {
    return this.maxlength - this.text.length;
  }

  get text() {
    return this.value;
  }
  set text(v) {
    this.$emit("input", v);
  }
}
</script>

<style lang="sass" scoped>
.nb-text-area
  display: flex
  flex-direction: column

  textarea
    resize: vertical
    max-width: 100%
    min-height: #{4 * 1.5}em
    max-height: #{24 * 1.5}em
    padding: 12px 15px
    border: solid 1px #c8d3e5
    border-radius: 3px
    transition: all .2s(border-color)

    &::placeholder
      color: #a7b6cf

    &:hover, &:active
      border-color: #a7b6cf

    &:focus
      border-color: #7d91b2

  &__message
    color: #7d91b2
    font-size: 12px
    text-align: right
</style>
