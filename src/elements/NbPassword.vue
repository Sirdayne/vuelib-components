<template lang="pug">
nb-input(ref="input", v-model="password", v-bind="props", @click:append="toggleInputType")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { TInputRule, TInputType } from "@/models/Input";
import NbInput from "./NbInput.vue";

@Component
export default class NbPassword extends Vue {
  @Prop({ type: String, required: true }) readonly value!: string;
  @Prop({ type: String }) readonly label?: string;
  @Prop({ type: String }) readonly placeholder?: string;
  @Prop({ type: String }) readonly autocomplete?: string;
  @Prop({ type: Array, default: () => [] }) readonly rules!: TInputRule[];
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;

  $refs!: {
    input: NbInput;
  };

  showError() {
    this.$refs.input?.showError();
  }

  get password() {
    return this.value;
  }
  set password(v) {
    this.$emit("input", v);
  }

  type: TInputType = "password";

  get hidden() {
    return this.type === "password";
  }

  toggleInputType() {
    this.type = this.hidden ? "text" : "password";
  }

  get iconAppend() {
    return this.type === "text" ? "eye-off-outline" : "eye-outline";
  }

  get props() {
    return {
      type: this.type,
      iconAppend: this.iconAppend,
      label: this.label,
      placeholder: this.placeholder,
      autocomplete: this.autocomplete,
      rules: this.rules,
      disabled: this.disabled,
    };
  }
}
</script>
