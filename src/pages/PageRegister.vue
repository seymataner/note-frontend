<template>
  <q-page class="row justify-center items-center" padding>
    <q-card square bordered class="q-pa-lg shadow-1">
      <q-card-section>
        <div class="form-control">
          <alert v-if="err">{{ error }}</alert>
        </div>
        <q-form class="q-gutter-md">
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
            clearable
            v-model="email"
            type="email"
            :label="emailAdress"
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
          :label="registerLabel"
          type="submit"
          @click="onRegister()"
        />
      </q-card-actions>
      <q-card-section class="text-center q-pa-none">
        <p>{{haveAccount}}<a href="/login">{{signIn}}</a></p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      username: null,
      password: null,
      email: null,
      isPwd: true,
      err: false,
      error: null,
    };
  },
  methods: {
    ...mapActions("auth", ["register"]),
    onRegister() {
      const newData = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      if (
        this.username == null ||
        this.password == null ||
        this.email == null
      ) {
        this.err = true;
        this.error = "Fill In The Missing Fields";
      } else if (this.password.length < 6) {
        this.err = true;
        this.error = "Password Must Be At Least 6 Characters";
      } else {
        this.register(newData); // hata geldiğinde catchle error yakalayamadım.
      }
    },
  },
  computed: {
    usernameLabel() {
      return this.$t("Username");
    },
    passwordLabel() {
      return this.$t("Password");
    },
    toggledPassword() {
      return this.$t("toggledPassword");
    },
	emailAdress() {
		return this.$t("emailAddress")
	},
	haveAccount() {
		return this.$t("haveAccount")
	},
	signIn () {
		return this.$t("signIn")
	},
	registerLabel() {
		return this.$t("Register")
	}

  },
};
</script>

<style>
.q-card {
  width: 400px;
}
</style>
