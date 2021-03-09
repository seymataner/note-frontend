<template>
  <q-page class="row justify-center items-center" padding>
    <q-card class="q-pa-lg shadow-2">
      <q-card-section>
        <q-form class="q-gutter-md" @keyup.enter ="onLogin">
          <div class="form-control">
            <alert v-if="err">{{ error }}</alert>
          </div>
          <q-input
            square
            filled
            clearable
            v-model="username"
            type="text"
            :label="usernameLabel"
          />
          <q-input
            square
            filled
            v-model="password"
            :type="isPwd ? 'password' : 'text'"
            :hint="toggledPassword"
            :label="passwordLabel"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </q-form>
      </q-card-section>
      <q-card-actions class="q-px-md">
        <q-btn 
          unelevated
          color="secondary"
          size="lg"
          class="full-width"
          :label="loginLabel"
          type="submit"
          @click="onLogin()"
        />
      </q-card-actions>
      <q-card-section class="text-center q-pa-none">
        <p>{{notRegistered}} <a href="/register">{{createAccount}}</a></p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username: null,
      password: null,
      err: false,
      error: null,
      isPwd: true,
    }
  },
  methods: {
    ...mapActions("auth", ["login"]),
    onLogin() {
      const userData = {
        username: this.username,
        password: this.password,
      };
      if (this.username == null || this.password == null) {
        this.err = true;
        this.error = "Fill In The Missing Fields";
      } else {
        this.login(userData) // hata geldiğinde catchle error yakalayamadım.
      }
    },
  },
  computed : {
	  notRegistered () {
		  return this.$t("notRegistered")
	  },
	  createAccount() {
		  return this. $t("createAccount")
	  },
	  usernameLabel() {
		  return  this.$t("Username")
	  },
	  passwordLabel() {
		  return this.$t("Password")
	  },
	  toggledPassword () {
		  return this.$t("toggledPassword")
	  },
	  loginLabel () {
		  return this.$t("Login")
	  }
  }
};
</script>

<style>
.q-card {
  width: 400px;
}
</style>
