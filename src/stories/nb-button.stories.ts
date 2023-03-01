import NbButton from "@/elements/NbBtn.vue";
import "@/styles/app.sass";
import "@/styles/_variables.css";

export default {
  title: "Button",
  component: NbButton,
};

export const ButtonWithProps = (args: unknown[]) => ({
  components: {
    NbButton,
  },
  template: '<nb-button v-bind="$props" />',
  props: Object.keys(args),
});

ButtonWithProps.args = {
  label: "Default button",
  secondary: false,
};
