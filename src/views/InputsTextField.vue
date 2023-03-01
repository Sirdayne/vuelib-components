<template lang="pug">
.pl-2
  h2 Text Field
  .pb-2
  .pl-2
    h3 Props
    .pb-2
    .pl-2
      nb-text-field(v-model="label", label="The label of the field")
      .pb-2
      nb-text-field(v-model="placeholder", label="The placeholder of the field")
      .pb-2
      nb-text-field(v-model="mask", label="The mask of the field")
      .pb-2
      nb-checkbox(v-model="spellcheck", label="The spellcheck of the field is enabled")
      .pb-2
      nb-checkbox(v-model="disabled", label="The field is disabled")
      .pb-2
  .pb-2
  .pl-2
    h3 Result
    .pb-2
    .pl-2
      nb-text-field(v-model="value", v-bind="props", autofocus)
  .pb-2
</template>

<script lang="ts">
import { TInputRule } from "@/models/Input";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class InputsTextField extends Vue {
  value = "";

  label = "Label";
  placeholder = "Placeholder";
  mask = "";
  spellcheck = false;
  disabled = false;

  rules: TInputRule[] = [
    (v) =>
      v.length > 0 ||
      "Lorem ipsum dolor sit amet," +
        " consectetur adipiscing elit," +
        " sed do eiusmod tempor incididunt" +
        " ut labore et dolore magna aliqua." +
        " Ut enim ad minim veniam," +
        " quis nostrud exercitation ullamco laboris nisi" +
        " ut aliquip ex ea commodo consequat." +
        " Duis aute irure dolor in reprehenderit" +
        " in voluptate velit esse cillum dolore" +
        " eu fugiat nulla pariatur." +
        " Excepteur sint occaecat cupidatat non proident," +
        " sunt in culpa qui officia deserunt mollit anim id est laborum.",
    (v) => v !== "Lorem" || "It is Lorem!",
  ];

  get props() {
    const { label, placeholder, mask, spellcheck, disabled, rules } = this;
    return { label, placeholder, mask, spellcheck, disabled, rules };
  }
}
</script>
