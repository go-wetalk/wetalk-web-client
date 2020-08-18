<template>
  <div class="container">
    <section class="section" v-if="logo">
      <div class="subtitle">头像</div>
      <div class="card has-background-white">
        <div class="card-content">
          <b-upload accept="image/png,image/jpeg" @input="onUpdateAvatar">
            <p class="image is-64x64">
              <img :src="logo" class="is-hidden-corner" />
            </p>
          </b-upload>
        </div>
      </div>
      <div class="subtitle mt-6">隐私信息</div>
      <div class="card has-background-white">
        <div class="card-content">
          <b-field label="国家">
            <b-input v-model="address.country"></b-input>
          </b-field>
          <b-field label="省份">
            <b-input v-model="address.province"></b-input>
          </b-field>
          <b-field label="城市">
            <b-input v-model="address.city"></b-input>
          </b-field>
          <b-field label="详细地址">
            <b-input v-model="address.street"></b-input>
          </b-field>
          <b-field>
            <b-button type="is-primary" @click="onUpdateAddress">保存</b-button>
          </b-field>
        </div>
      </div>
      <div class="subtitle mt-6">社交信息</div>
      <div class="card has-background-white">
        <div class="card-content">
          <b-field label="站内签名">
            <b-input type="textarea" v-model="social.sign"></b-input>
          </b-field>
          <b-field>
            <b-button type="is-primary" @click="onUpdateSocial">保存</b-button>
          </b-field>
        </div>
      </div>
      <div class="subtitle mt-6" v-if="false">安全设置</div>
      <div class="card has-background-white" v-if="false">
        <div class="card-content">
          <div class="columns">
            <div class="column">
              <b-field label="手机号">
                <b-input></b-input>
              </b-field>
              <b-field label="验证码">
                <b-field>
                  <b-input></b-input>
                  <p class="control">
                    <button class="button is-primary">获取</button>
                  </p>
                </b-field>
              </b-field>
              <b-field>
                <b-button type="is-danger">确认</b-button>
              </b-field>
            </div>
            <div class="divider is-vertical is-hidden-mobile">AND</div>
            <div class="divider is-hidden-tablet">AND</div>
            <div class="column">
              <b-field label="邮箱">
                <b-input></b-input>
              </b-field>
              <b-field label="验证码">
                <b-field>
                  <b-input></b-input>
                  <p class="control">
                    <button class="button is-primary">获取</button>
                  </p>
                </b-field>
              </b-field>
              <b-field>
                <b-button type="is-danger">确认</b-button>
              </b-field>
            </div>
          </div>
        </div>
      </div>
      <div class="subtitle mt-6">修改密码</div>
      <div class="card has-background-white">
        <div class="card-content">
          <b-field label="原密码">
            <b-input type="password" v-model="password.original"></b-input>
          </b-field>
          <b-field label="新密码">
            <b-input type="password" v-model="password.password"></b-input>
          </b-field>
          <b-field label="确认密码">
            <b-input type="password" v-model="confirmPassword"></b-input>
          </b-field>
          <b-field>
            <b-button type="is-primary" @click="onUpdatePassword"
              >确认</b-button
            >
          </b-field>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Settings",
  data() {
    return {
      logo: "",
      address: {
        country: "",
        province: "",
        city: "",
        street: "",
      },
      social: {
        sign: "",
      },
      password: {
        original: "",
        password: "",
      },
      confirmPassword: "",
    };
  },
  computed: {
    ...mapState(["profile", "VUE_APP_NAME"]),
  },
  created() {
    document.title = `设置 - ${this.VUE_APP_NAME}`;
    this.FetchProfile().then((data) => {
      this.logo = data.Logo;
      this.address.country = data.Country;
      this.address.province = data.Province;
      this.address.city = data.City;
      this.address.street = data.Street;
      this.social.sign = data.Sign;
    });
  },
  methods: {
    ...mapActions([
      "FetchProfile",
      "UpdateProfileLogo",
      "UpdateProfileAddress",
      "UpdateProfileSocial",
      "UpdateProfilePassword",
    ]),
    onUpdateAvatar(f) {
      this.UpdateProfileLogo(f).then(() => {
        this.$buefy.toast.open({
          type: "is-success",
          message: "头像已更新",
        });
      });
    },
    onUpdateAddress() {
      this.UpdateProfileAddress(this.address).then(() => {
        this.$buefy.toast.open({
          type: "is-success",
          message: "地址已更新",
        });
      });
    },
    onUpdateSocial() {
      this.UpdateProfileSocial(this.social).then(() => {
        this.$buefy.toast.open({
          type: "is-success",
          message: "社交资料已更新",
        });
      });
    },
    onUpdatePassword() {
      if (this.confirmPassword !== this.password.password) {
        return this.$buefy.toast.open({
          type: "is-danger",
          message: "新密码输入不一致",
        });
      }
      this.UpdateProfilePassword(this.password).then(() => {
        this.$buefy.toast.open({
          type: "is-success",
          message: "密码已更新",
        });
      });
    },
  },
};
</script>