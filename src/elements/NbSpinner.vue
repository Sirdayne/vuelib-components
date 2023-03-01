<template lang="pug">
.nb-spinner
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class NbSpinner extends Vue {}
</script>

<style lang="sass" scoped>
.nb-spinner
  position: relative
  box-sizing: border-box
  $a: 60px
  width: $a
  height: $a
  border: solid 4px #00a69b
  border-radius: 0 50% 50% 50%
  background-size: 200% 200%
  background-image: linear-gradient(to top, #00a69b 50%, transparent 50%)
  animation: bg-fill 4s infinite ease-in

@keyframes bg-fill
  0%
    transform: rotate(0deg)
  25%
    background-position: 0 100%
    transform: rotate(0deg)
  50%
    background-position: 0 100%
    transform: rotate(180deg)
  75%
    background-position: 0 0
    transform: rotate(180deg)
  100%
    transform: rotate(360deg)
</style>
