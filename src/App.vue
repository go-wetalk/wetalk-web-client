<template>
  <div id="app" class="has-background-white-ter" v-cloak>
    <b-navbar fixed-top shadow>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          {{ VUE_APP_NAME }}
        </b-navbar-item>
      </template>

      <template slot="end" v-if="profile">
        <b-navbar-item tag="router-link" :to="{ name: 'Notification' }">
          <b-icon icon="notification-3-line"></b-icon>
          <span class="is-hidden-tablet" style="vertical-align: top;"
            >消息</span
          >
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'WritePost' }">
          写点啥
        </b-navbar-item>
        <b-navbar-dropdown :label="profile.Name">
          <b-navbar-item tag="router-link" :to="'/users/' + profile.Name">
            个人中心
          </b-navbar-item>
          <b-navbar-item tag="div" @click="onLogout">注销</b-navbar-item>
        </b-navbar-dropdown>
      </template>
      <template slot="end" v-else>
        <b-navbar-item tag="div">
          <div class="buttons">
            <router-link class="button is-primary" :to="{ name: 'JoinUs' }">
              <strong>加入奋斗</strong>
            </router-link>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>

    <transition>
      <router-view />
    </transition>

    <footer class="footer gap-mt-1">
      <div class="content has-text-centered">
        <strong>奋斗社 devto.icu</strong>
        <br />
        版权所有，盗版必杀你🐎
      </div>
    </footer>

    <b-loading is-full-page :active="loading"></b-loading>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["VUE_APP_NAME", "profile", "loading"]),
    ...mapGetters(["isLoggedIn"]),
  },
  created() {
    if (this.isLoggedIn) {
      this.FetchUserProfile().catch((e) =>
        this.$buefy.toast.open({
          type: "is-danger",
          message: e,
        })
      );
    }
  },
  methods: {
    ...mapActions(["FetchUserProfile", "Logout"]),
    onLogout() {
      this.Logout().then(() => {
        this.$buefy.toast.open({
          type: "is-success",
          message: "已注销登录",
        });
        this.$router.push({ name: "Home" });
      });
    },
  },
};
</script>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors

$colors: (
  "white": (
    $white,
    $black,
  ),
  "black": (
    $black,
    $white,
  ),
  "light": (
    $light,
    $light-invert,
  ),
  "dark": (
    $dark,
    $dark-invert,
  ),
  "primary": (
    $primary,
    $primary-invert,
  ),
  "info": (
    $info,
    $info-invert,
  ),
  "success": (
    $success,
    $success-invert,
  ),
  "warning": (
    $warning,
    $warning-invert,
  ),
  "danger": (
    $danger,
    $danger-invert,
  ),
);

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

[v-cloak] {
  display: none;
}

// Patch markdown css style to fixes text overflow bug.
.wysiwyg code,
.wysiwyg kbd,
.wysiwyg samp {
  word-break: break-all;
}

html {
  overflow-y: auto !important;
}
html,
body {
  height: 100%;
  --webkit-font-smoothing: subpixel-antialiased;
  -moz-osx-font-smoothing: auto;
  font-family: -apple-system, "Noto Sans", "Helvetica Neue", Helvetica,
    "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB",
    "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN",
    "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti",
    SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
}

#app {
  min-height: 100%;
  display: flex;
  flex-direction: column;

  .username {
    margin-left: 1rem;
  }
  .gaparound {
    margin: 1rem;
  }
  .gap-mt-1 {
    margin-top: 1rem;
  }
  .gap-mb-1 {
    margin-bottom: 1rem;
  }
  .container.fix-margin-collapse {
    margin-top: -1px;
    padding-top: 1px;
  }
  & > .container {
    width: 100%;
  }
  .footer {
    padding: 3rem 1.5rem;
  }
}
</style>