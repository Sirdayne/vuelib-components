<template lang="pug">
.text-center
  h1.h1 {{ message }}
  p
    | For a guide and recipes
    | on how to configure / customize this project,
    br
    | check out the
    |
    nb-link(label="vue-cli documentation", to="https://cli.vuejs.org", blank)
    | .
  template(v-for="linkBlock in linkBlocks")
    h3.h3 {{ linkBlock.title }}
    ul
      li(v-for="(link, i) in linkBlock.links", :key="i")
        nb-link(:label="link.label", :to="link.href", blank) 
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

type TLinkBlock = {
  title: string;
  links: {
    href: string;
    label: string;
  }[];
};

@Component
export default class HomeDefault extends Vue {
  @Prop({ type: String, required: true }) readonly message!: string;

  readonly linkBlocks: TLinkBlock[] = [
    {
      title: "Installed CLI Plugins",
      links: [
        {
          href: "https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-babel",
          label: "babel",
        },

        {
          href: "https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-pwa",
          label: "pwa",
        },

        {
          href: "https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-router",
          label: "router",
        },

        {
          href: "https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-vuex",
          label: "vuex",
        },

        {
          href: "https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-eslint",
          label: "eslint",
        },

        {
          href: "https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-unit-jest",
          label: "unit-jest",
        },

        {
          href: "https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-e2e-cypress",
          label: "e2e-cypress",
        },

        {
          href: "https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-typescript",
          label: "typescript",
        },
      ],
    },

    {
      title: "Essential Links",
      links: [
        {
          href: "https://vuejs.org",
          label: "Core Docs",
        },

        {
          href: "https://forum.vuejs.org",
          label: "Forum",
        },

        {
          href: "https://chat.vuejs.org",
          label: "Community Chat",
        },

        {
          href: "https://twitter.com/vuejs",
          label: "Twitter",
        },

        {
          href: "https://news.vuejs.org",
          label: "News",
        },
      ],
    },

    {
      title: "Ecosystem",
      links: [
        {
          href: "https://router.vuejs.org",
          label: "vue-router",
        },

        {
          href: "https://vuex.vuejs.org",
          label: "vuex",
        },

        {
          href: "https://github.com/vuejs/vue-devtools#vue-devtools",
          label: "vue-devtools",
        },

        {
          href: "https://vue-loader.vuejs.org",
          label: "vue-loader",
        },

        {
          href: "https://github.com/vuejs/awesome-vue",
          label: "awesome-vue",
        },
      ],
    },
  ];
}
</script>

<style scoped lang="sass">
h3
  margin-top: 36px

li
  display: inline-block

  &:not(:first-of-type)
    margin-left: 6px

  &:not(:last-of-type)
    margin-right: 6px
</style>
