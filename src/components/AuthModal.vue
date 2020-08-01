<template>
  <div class="modal-card" style="width: auto;">
    <header class="modal-card-head">
      <p class="modal-card-title">Join Us</p>
    </header>
    <section class="modal-card-body">
      <b-field label="Name">
        <b-input
          type="text"
          v-model="formData.username"
          placeholder="Your nickname"
          required
        >
        </b-input>
      </b-field>

      <b-field label="Password">
        <b-input
          type="password"
          v-model="formData.password"
          password-reveal
          placeholder="Your password"
          required
        >
        </b-input>
      </b-field>

      <b-field label="Confirm Password" v-if="form === 1">
        <b-input
          type="password"
          v-model="formData.confirm"
          password-reveal
          placeholder="Confirm password"
          required
        >
        </b-input>
      </b-field>

      <b-checkbox v-if="form === 0">Remember me</b-checkbox>
    </section>
    <footer class="modal-card-foot" v-if="form === 0">
      <button class="button is-primary" @click="onLogin">Login</button>
      <button class="button is-default" @click="onSwitchTo(1)">Register</button>
    </footer>
    <footer class="modal-card-foot" v-else>
      <button class="button is-primary" @click="onRegister">Register</button>
      <button class="button is-default" @click="onSwitchTo(0)">Login</button>
    </footer>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AuthModal",
  data() {
    return {
      form: 0,
      formData: {
        username: "",
        password: "",
        confirm: "",
      },
    };
  },
  methods: {
    ...mapActions(["Login", "Register"]),
    onLogin() {
      this.Login(this.formData)
        .then(() => this.$parent.close())
        .catch((e) => {
          this.$buefy.toast.open({
            type: "is-danger",
            message: e,
          });
        });
    },
    onRegister() {
      this.Register(this.formData)
        .then(() => this.$parent.close())
        .catch((e) => {
          this.$buefy.toast.open({
            type: "is-danger",
            message: e,
          });
        });
    },
    onSwitchTo(form) {
      this.form = form;
    },
  },
};
</script>