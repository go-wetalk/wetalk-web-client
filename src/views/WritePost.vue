<template>
  <div class="container">
    <div class="card gap-mt-1">
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
          <b-input
            type="textarea"
            rows="8"
            v-model="formData.content"
            placeholder="写点啥呢……支持Markdown语法哟～"
            required
          >
          </b-input>
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
import { mapActions, mapState } from "vuex";
export default {
  name: "WritePost",
  data() {
    return {
      formData: {
        title: "",
        content: "",
        tags: [],
      },
    };
  },
  computed: {
    ...mapState(["VUE_APP_NAME"]),
  },
  created() {
    document.title = `写作 - ${this.VUE_APP_NAME}`;
  },
  methods: {
    ...mapActions(["Publish"]),
    onPublish() {
      this.Publish(this.formData)
        .then(() => {
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
