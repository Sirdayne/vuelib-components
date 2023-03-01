<template lang="pug">
#buttons
  .mb-2.row.wrap
    nb-btn.ma-2(small, label="Primary")
      .col
        span Custom
        span label
    nb-btn.ma-2(small, label="Next", icon-right="arrow-forward-outline")
    nb-btn.ma-2(small, label="Primary", loading)
    nb-btn.ma-2(small, label="Primary", disabled)

  .mb-2.row.wrap
    nb-btn.ma-2(label="Primary")
    nb-btn.ma-2(label="Next", icon-right="arrow-forward-outline")
    nb-btn.ma-2(label="Primary", loading)
    nb-btn.ma-2(label="Primary", disabled)

  .mb-2.row.wrap
    nb-btn.ma-2(long, label="Primary")
    nb-btn.ma-2(long, label="Next", icon-right="arrow-forward-outline")
    nb-btn.ma-2(long, label="Primary", loading)
    nb-btn.ma-2(long, label="Primary", disabled)

  .mb-2.row.wrap
    nb-btn.ma-2(small, flat, label="Flat")
    nb-btn.ma-2(small, flat, label="Back", icon-left="arrow-back-outline")
    nb-btn.ma-2(small, flat, label="Flat", loading)
    nb-btn.ma-2(small, flat, label="Flat", disabled)

  .mb-2.row.wrap
    nb-btn.ma-2(flat, label="Flat")
    nb-btn.ma-2(flat, label="Back", icon-left="arrow-back-outline")
    nb-btn.ma-2(flat, label="Flat", loading)
    nb-btn.ma-2(flat, label="Flat", disabled)

  .mb-2.row.wrap
    nb-btn.ma-2(long, flat, label="Flat")
    nb-btn.ma-2(long, flat, label="Back", icon-left="arrow-back-outline")
    nb-btn.ma-2(long, flat, label="Flat", loading)
    nb-btn.ma-2(long, flat, label="Flat", disabled)

  .mb-2.row.wrap
    nb-btn.ma-2(small, secondary, label="Secondary")
    nb-btn.ma-2(small, secondary, label="Back", icon-left="arrow-back-outline")
    nb-btn.ma-2(small, secondary, label="Secondary", loading)
    nb-btn.ma-2(small, secondary, label="Secondary", disabled)

  .mb-2.row.wrap
    nb-btn.ma-2(secondary, label="Secondary")
    nb-btn.ma-2(secondary, label="Back", icon-left="arrow-back-outline")
    nb-btn.ma-2(secondary, label="Secondary", loading)
    nb-btn.ma-2(secondary, label="Secondary", disabled)

  .mb-2.row.wrap
    nb-btn.ma-2(long, secondary, label="Secondary")
    nb-btn.ma-2(long, secondary, label="Back", icon-left="arrow-back-outline")
    nb-btn.ma-2(long, secondary, label="Secondary", loading)
    nb-btn.ma-2(long, secondary, label="Secondary", disabled)

  .mb-2.row.wrap
    nb-btn.ma-2(small, outline, label="Outline")
    nb-btn.ma-2(small, outline, label="Add", icon-left="add-outline")
    nb-btn.ma-2(small, outline, label="Outline", loading)
    nb-btn.ma-2(small, outline, label="Outline", disabled)

  .mb-2.row.wrap
    nb-btn.ma-2(outline, label="Outline")
    nb-btn.ma-2(outline, label="Add", icon-left="add-outline")
    nb-btn.ma-2(outline, label="Outline", loading)
    nb-btn.ma-2(outline, label="Outline", disabled)

  .mb-2.row.wrap
    nb-btn.ma-2(long, outline, label="Error")
    nb-btn.ma-2(long, outline, label="Add", icon-left="add-outline")
    nb-btn.ma-2(long, outline, label="Error", loading)
    nb-btn.ma-2(long, outline, label="Error", disabled)

  .mb-2.row.wrap
    nb-btn.ma-2(small, error, label="Error")
    nb-btn.ma-2(small, error, label="Add", icon-left="add-outline")
    nb-btn.ma-2(small, error, label="Error", loading)
    nb-btn.ma-2(small, error, label="Error", disabled)

  .mb-2.row.wrap
    nb-btn.ma-2(error, label="Error")
    nb-btn.ma-2(error, label="Add", icon-left="add-outline")
    nb-btn.ma-2(error, label="Error", loading)
    nb-btn.ma-2(error, label="Error", disabled)

  .mb-2.row.wrap
    nb-btn.ma-2(long, error, label="Error")
    nb-btn.ma-2(long, error, label="Add", icon-left="add-outline")
    nb-btn.ma-2(long, error, label="Error", loading)
    nb-btn.ma-2(long, error, label="Error", disabled)
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Buttons extends Vue {}
</script>
