import NbAutocomplete from "@/elements/NbAutocomplete.vue";
import "@/styles/app.sass";
import "@/styles/_variables.css";

export default {
  title: "Autocomplete",
  component: NbAutocomplete,
};

export const Default = (args: unknown[]) => ({
  components: {
    NbAutocomplete,
  },
  template: '<nb-autocomplete v-bind="$props" />',
  props: Object.keys(args),
});

Default.args = {
  label: "Default autocomplete",
  options: [],
};
