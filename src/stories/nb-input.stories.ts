import NbInput from "@/elements/NbInput.vue";
import "@/styles/app.sass";
import "@/styles/_variables.css";

export default {
  title: "Input",
  component: NbInput,
};

export const Default = (args: unknown[]) => ({
  components: {
    NbInput,
  },
  template: '<nb-Input v-bind="$props" />',
  props: Object.keys(args),
});

Default.args = {
  label: "Default input",
  options: [],
};
