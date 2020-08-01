<template>
  <div id="app" class="has-background-white-ter" v-cloak>
    <b-navbar fixed-top>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img src="@/assets/logo.png" alt="DevTo.icu" />
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item href="/">
          Home
        </b-navbar-item>
        <b-navbar-item href="#">
          Tag List
        </b-navbar-item>
        <b-navbar-dropdown label="Info">
          <b-navbar-item href="#">
            About
          </b-navbar-item>
          <b-navbar-item href="#">
            Contact
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>

      <template slot="end">
        <b-navbar-item tag="div" v-if="profile">
          <div class="username">
            <span>Logged as</span>
            <router-link :to="'/users/' + profile.Name">
              {{ profile.Name }}
            </router-link>
          </div>
          <button class="button is-primary" @click="openPostModal">
            Write Post
          </button>
        </b-navbar-item>
        <b-navbar-item tag="div" v-else>
          <div class="buttons">
            <a class="button is-primary" @click="openAuthModal">
              <strong>Getting Started</strong>
            </a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>

    <transition>
      <router-view />
    </transition>

    <b-loading is-full-page :active="loading"></b-loading>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import PostModalVue from "./components/PostModal.vue";
import AuthModalVue from "./components/AuthModal.vue";
export default {
  computed: {
    ...mapState(["profile", "loading"]),
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
    ...mapActions(["FetchUserProfile"]),
    openAuthModal() {
      this.$buefy.modal.open({
        parent: this,
        component: AuthModalVue,
        hasModalCard: true,
        trapFocus: true,
      });
    },
    openPostModal() {
      this.$buefy.modal.open({
        parent: this,
        component: PostModalVue,
        trapFocus: true,
        fullScreen: true,
      });
    },
  },
};
</script>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
// $primary: hsl(171, 100%, 41%);
// $primary-invert: findColorInvert($primary);
// $info: hsl(204, 71%, 53%);
// $info-invert: findColorInvert($info);
// $twitter: #4099ff;
// $twitter-invert: findColorInvert($twitter);
// $link: hsl(217, 71%, 53%);
// $link-invert: findColorInvert($link);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
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
  // "twitter": (
    //   $twitter,
    //   $twitter-invert,
    // ),,,,,,
);

// Links
// $link: $link;
// $link-invert: $link-invert;
// $link-focus-border: $link;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

#app {
  font-family: -apple-system, "Noto Sans", "Helvetica Neue", Helvetica,
    "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB",
    "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN",
    "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti",
    SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
  min-height: 100vh;
  --webkit-font-smoothing: subpixel-antialiased;
  -moz-osx-font-smoothing: auto;

  .username {
    margin-right: 1rem;
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
}
[v-cloak] {
  display: none;
}

// Patch markdown css style to fixes text overflow bug.
.wysiwyg code,
.wysiwyg kbd,
.wysiwyg samp {
  word-break: break-all;
}
</style>