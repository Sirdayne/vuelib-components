<template lang="pug">
nb-input(ref="input", v-model="text", v-bind="props")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { TInputRule } from "@/models/Input";
import NbInput from "./NbInput.vue";

@Component
export default class NbTextField extends Vue {
  @Prop({ type: String, required: true }) readonly value!: string;
  @Prop({ type: String }) readonly id?: string;
  @Prop({ type: String }) readonly label?: string;
  @Prop({ type: String }) readonly placeholder?: string;
  @Prop({ type: String }) readonly mask?: string;
  @Prop({ type: String }) readonly autocomplete?: string;
  @Prop({ type: Boolean }) readonly spellcheck?: boolean;
  @Prop({ type: Boolean }) readonly autofocus?: boolean;
  @Prop({ type: Boolean }) readonly disabled?: boolean;
  @Prop({ type: Array }) readonly rules?: TInputRule[];

  $refs!: {
    input: NbInput;
  };

  showError() {
    this.$refs.input?.showError();
  }

  get text() {
    return this.value;
  }
  set text(v) {
    this.$emit("input", v);
  }

  get props() {
    return {
      id: this.id,
      label: this.label,
      placeholder: this.placeholder,
      mask: this.mask,
      autocomplete: this.autocomplete,
      spellcheck: this.spellcheck,
      autofocus: this.autofocus,
      disabled: this.disabled,
      rules: this.rules,
    };
  }
}
</script>
