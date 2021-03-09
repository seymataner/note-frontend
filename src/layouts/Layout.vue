<template>
  <q-layout view="hHh lpR fFf" class="shadow-2 rounded-borders">
    <q-header>
      <q-toolbar>
        <q-btn flat @click="drawerLeft = !drawerLeft" dense icon="menu" />
        <q-toolbar-title class="absolute-center"></q-toolbar-title>

        <q-space />
        <q-select v-model="lang" map-options :options="langs"/>
        <q-btn flat icon="logout" @click="logOut()" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerLeft" :breakpoint="150" :width="250" bordered>
      <q-img
        class="absolute-top"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQmXlhQeFR8mGVjmZYsQxu-UIQ1d_A4BLFJA&usqp=CAU"
        style="height: 150px"
      >
        <div class="absolute-top bg-transparent">
          <q-avatar size="60px" class="q-mb-sm">
            <img src="https://www.terrainhopperusa.com/wp-content/uploads/2019/01/avatar-woman.png" />
          </q-avatar>
          <div class="text-weight"></div>
          <div>@{{ username }}</div>
        </div>
      </q-img>
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px grey #ddd;
        "
      >
        <q-list>
          <EssentialLink
            v-for="link in getEssentialLinks"
            :key="link.label"
            v-bind="link"
          />
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-footer>
      <q-tabs>
        <q-route-tab
          v-for="link in getEssentialLinks"
          :key="link.label"
          :to="link.to"
          :icon="link.icon"
        />
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import { mapActions } from "vuex";

 

export default {
  name: "MainLayout",
  components: { EssentialLink },
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
      drawerLeft: true,
      leftDrawerOpen: false,
      text: "",
      username: null,
    };
  },
  computed: {
	  /*
    title() {
		console.log("selam")
      let currentPath = this.$route.fullPath;
      if (currentPath == "/") return "Home Page";
      else if (currentPath == "/users") return "Users Page";
      else if (currentPath == "/account") return "Account Page";
      else if (currentPath == "/notes") return "Notes Page";
    },
	*/
	getEssentialLinks() {
      return  [
		{
			label: this.$t('Account'),
			icon: "account_box",
			to: "/account",
		},
		{
			label: this.$t("Users"),
			icon: "group",
			to: "/users",
		},
		{
			label: this.$t("Notes"),
			icon: "list",
			to: "/notes",
		},
		];
    }
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    logOut() {
      this.logout()
        .then(() => {
          this.$router.push("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
};
</script>

<style lang="scss">
@media screen and (min-width: 910px) {
}
.q-btn {
  position: relative;
}
</style>
