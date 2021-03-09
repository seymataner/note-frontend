<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center"> </q-toolbar-title>
        <q-space />
        <q-select v-model="lang" map-options :options="langs"/>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// This is where your Javascript goes
// to define your Vue component, which
// can be a Layout, a Page or your own
// component used throughout the app.

export default {
  data() {
    return {
      langs: [
        {
          label: "TR",
          value: "tr",
        },
        {
          label: "ENG",
          value: "en-us",
        },
      ],
	 lang: localStorage.selectedLanguage,
      selectedLanguage: null,
    };
  },
  computed: {
	  /*
    title() {
      let currentPath = this.$route.fullPath;
      if (currentPath == "/login") return "Login Form";
      else if (currentPath == "/register") return "Register Form";
    },
	*/
  },
	created() {
    this.username = localStorage.getItem("user-name");
    if (!localStorage.selectedLanguage) {
      this.selectedLanguage = "en-us";
    }
  },
  watch: {
    lang(lang) {
      this.$i18n.locale = lang.value;
      localStorage.selectedLanguage = lang.value;
      this.selectedLanguage = lang.value;
    },
  },
  //
};
</script>

<style>
/* This is where your CSS goes */
</style>
