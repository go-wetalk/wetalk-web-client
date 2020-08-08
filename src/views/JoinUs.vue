<template>
  <div class="container">
    <div class="columns is-centered gap-mt-1">
      <div class="column is-5" v-if="$route.query.newbie !== 'yes'">
        <div class="card has-backgroud-white">
          <div class="card-header">
            <div class="card-header-title">登录</div>
          </div>
          <div class="card-content">
            <b-field label="名称">
              <b-input
                type="text"
                v-model="formData.username"
                placeholder="请输入您的账号"
                required
              >
              </b-input>
            </b-field>

            <b-field label="密码">
              <b-input
                type="password"
                v-model="formData.password"
                password-reveal
                placeholder="请输入您的密码"
                required
              >
              </b-input>
            </b-field>

            <div class="level">
              <div class="level-left">
                <div class="level-item">
                  <button class="button is-primary" @click="onLogin">
                    立即登录
                  </button>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <router-link
                    :to="{ name: 'JoinUs', query: { newbie: 'yes' } }"
                  >
                    没有帐号？立即注册
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-5" v-else>
        <div class="card has-backgroud-white">
          <div class="card-header">
            <div class="card-header-title">注册</div>
          </div>
          <div class="card-content">
            <b-field label="名称">
              <b-input
                type="text"
                v-model="formData.username"
                placeholder="社区里的称呼，亦是登录时的账号"
                required
              >
              </b-input>
            </b-field>

            <b-field label="密码">
              <b-input
                type="password"
                v-model="formData.password"
                password-reveal
                placeholder="六位以上"
                required
              >
              </b-input>
            </b-field>

            <b-field label="确认密码">
              <b-input
                type="password"
                v-model="formData.confirm"
                password-reveal
                placeholder="重复输入密码以验证记忆"
                required
              >
              </b-input>
            </b-field>

            <b-field v-if="VUE_APP_HCAPTCHA_SITEKEY">
              <vue-hcaptcha
                :sitekey="VUE_APP_HCAPTCHA_SITEKEY"
                @verify="onHCaptchaVerify"
              ></vue-hcaptcha>
            </b-field>

            <b-field>
              <div class="buttons">
                <button class="button is-primary" @click="onSignUp">
                  确定成为奋斗者
                </button>
              </div>
            </b-field>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueHcaptcha from "@hcaptcha/vue-hcaptcha";
import { mapState, mapActions } from "vuex";
export default {
  name: "JoinUs",
  components: { VueHcaptcha },
  data() {
    return {
      formData: {
        username: "",
        password: "",
        confirm: "",
      },
      hCaptchaVerified: false,
    };
  },
  computed: {
    ...mapState(["VUE_APP_HCAPTCHA_SITEKEY", "VUE_APP_NAME"]),
  },
  created() {
    document.title = `加入我们 - ${this.VUE_APP_NAME}`;
  },
  methods: {
    ...mapActions(["Login", "Register"]),
    onLogin() {
      this.Login(this.formData)
        .then(() => {
          this.$router.replace({ name: "Home" });
        })
        .catch((e) => {
          this.$buefy.toast.open({
            type: "is-danger",
            message: e,
          });
        });
    },
    onSignUp() {
      if (this.VUE_APP_HCAPTCHA_SITEKEY && !this.formData.captcha) {
        return this.$buefy.toast.open({
          type: "is-danger",
          message: "请完成hCaptcha人机检测，如无相关界面请联系客服",
        });
      }
      this.Register(this.formData)
        .then(() => {
          this.$router.replace({ name: "Home" });
        })
        .catch((e) => {
          this.$buefy.toast.open({
            type: "is-danger",
            message: e,
          });
        });
    },
    onHCaptchaVerify(response) {
      this.hCaptchaVerified = true;
      this.formData.captcha = response;
    },
  },
};
</script>