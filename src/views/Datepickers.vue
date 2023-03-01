<template lang="pug">
#datepickers
  p Start Date with Restrictions

  div(style="max-width: 180px")
    nb-datepicker(
      v-model="date",
      label="Start Date",
      :minDate="minDate",
      :maxDate="maxDate",
      :rules="rules"
    )
    nb-datepicker(
      v-model="endDate",
      tillPresent
    )

  p {{ date }} - {{ endDate }}
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Popups extends Vue {
  date = "14/06/2021";
  endDate = "";
  minDate = new Date(2021, 3, 5);
  maxDate = new Date(2021, 5, 15);

  rules = [
    (date: string) => {
      const parts = date.split("/").map((part) => parseInt(part));
      if (parts[2] && parts[1] && parts[0]) {
        const ourDate = new Date(parts[2], parts[1] - 1, parts[0]);
        return (this.minDate < ourDate && this.maxDate > ourDate) || "Not Allowed Date";
      }
      return "Not Allowed Format";
    },
  ];
}
</script>
