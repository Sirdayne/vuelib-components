<template lang="pug">
#inputs
  .col(style="max-width: 480px")
    InputsTextField
    .pb-2
    InputsPassword
    .pb-2
    InputsAutocomplete
    .pb-2
    InputsSelect
    .pb-32
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InputsTextField from "./InputsTextField.vue";
import InputsPassword from "./InputsPassword.vue";
import InputsAutocomplete from "./InputsAutocomplete.vue";
import InputsSelect from "./InputsSelect.vue";

@Component({
  components: {
    InputsTextField,
    InputsPassword,
    InputsAutocomplete,
    InputsSelect,
  },
})
export default class Inputs extends Vue {}
</script>
