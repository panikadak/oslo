<template>
  <q-layout view="lHh Lpr fff">
    <!-- <q-header class="bg-black ">
      <q-toolbar class="q-px-xl q-py-md content-center justify-between">

        <q-toolbar-title class="flex items-center ">
          <img src="~assets/logo.png" class="hlogo" alt="outer space labour office logo full-width" />
        </q-toolbar-title>

        <div>

        </div>
      </q-toolbar>
      <div class="bg-white flex q-pa-sm justify-center q-gutter-x-xl">
        <q-item tag="a" class="q-pa-none q-mx-md smicon">
          <q-tooltip content-class="bg-purple text-body1 text-bold" anchor="bottom middle" self="center middle">Soon!</q-tooltip>
          <img src="~assets/opensea.svg" class="q-pa-sm" alt="outer space labour office opensea account" />
        </q-item>
        <q-item tag="a" class="q-pa-none q-mx-md smicon">
          <q-tooltip content-class="bg-purple text-body1 text-bold" anchor="bottom middle" self="center middle">Soon!</q-tooltip>
          <img src="~assets/discord.svg" class="q-pa-sm" alt="outer space labour office discord account" />
        </q-item>
        <q-item clickable tag="a" href="https://twitter.com/OLaboroffice" target="_blank" class="q-pa-none q-mx-md smicon">
          <img src="~assets/twitter.svg" class="q-pa-sm" alt="outer space labour office twitter account" />
        </q-item>
      </div>
    </q-header> -->

    <!-- <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>

    


  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue';

const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
];

export default {
  name: 'MainLayout',
  components: {
    EssentialLink,
  },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
    };
  },
};
</script>
