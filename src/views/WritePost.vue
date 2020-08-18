<template>
  <div class="container">
    <div class="card mt-4">
      <header class="card-header">
        <p class="card-header-title">咖啡厅·思考·记录</p>
      </header>
      <div class="card-content">
        <b-field label="标题">
          <b-input
            type="text"
            v-model="formData.title"
            placeholder="选个标题呗"
            required
          >
          </b-input>
        </b-field>

        <b-field label="正文">
          <!-- <b-input
            type="textarea"
            rows="8"
            v-model="formData.content"
            placeholder="写点啥呢……支持Markdown语法哟～"
            required
          >
          </b-input> -->
          <div id="vditor"></div>
        </b-field>

        <b-field label="标签">
          <b-taginput
            type="is-info"
            v-model="formData.tags"
            ellipsis
            maxlength="30"
            maxtags="3"
            icon="label"
            placeholder="输入标签并回车"
          >
          </b-taginput>
        </b-field>
        <b-field>
          <button class="button is-primary" @click="onPublish">发表</button>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
import Vditor from "vditor";
import { mapActions, mapState } from "vuex";
export default {
  name: "WritePost",
  data() {
    return {
      formData: {
        title: localStorage.getItem("post_title") || "",
        content: localStorage.getItem("post_content") || "",
        tags: [],
      },
      vditorInstance: "",
    };
  },
  computed: {
    ...mapState(["VUE_APP_NAME"]),
  },
  watch: {
    ["formData.title"](to) {
      localStorage.setItem("post_title", to);
    },
    ["formData.content"](to) {
      localStorage.setItem("post_content", to);
    },
  },
  created() {
    document.title = `写作 - ${this.VUE_APP_NAME}`;
  },
  mounted() {
    this.vditorInstance = new Vditor("vditor", {
      height: window.innerHeight / 2,
      toolbar: [
        "emoji",
        "headings",
        "bold",
        "italic",
        "|",
        "list",
        "ordered-list",
        "check",
        "link",
      ],
      icon: "material",
    });
  },
  methods: {
    ...mapActions(["Publish"]),
    onPublish() {
      this.formData.content = this.vditorInstance.getValue();
      this.Publish(this.formData)
        .then(() => {
          localStorage.removeItem("post_title");
          localStorage.removeItem("post_content");
          this.$router.replace({ name: "Home" });
        })
        .catch((e) =>
          this.$buefy.toast.open({
            type: "is-danger",
            message: e,
          })
        );
    },
  },
};
</script>

<style lang="scss">
@import "~vditor/src/assets/scss/index";
</style>