<template lang="pug">
#home
  .col.align-center
    img(style="width: 25%", src="@/assets/vue-logo.svg", alt="Vue logo")
    HomeDefault(message="Welcome to Your Vue.js + TypeScript App")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HomeDefault from "@/components/HomeDefault.vue";

@Component({
  components: {
    HomeDefault,
  },
})
export default class Home extends Vue {}
</script>
