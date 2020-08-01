<template>
  <div class="modal-card" style="width: auto;">
    <header class="modal-card-head">
      <p class="modal-card-title">Write Post</p>
    </header>
    <section class="modal-card-body">
      <b-field label="Title">
        <b-input
          type="text"
          v-model="formData.title"
          placeholder="Post title"
          required
        >
        </b-input>
      </b-field>

      <b-field label="Content">
        <b-input
          type="textarea"
          rows="8"
          v-model="formData.content"
          placeholder="Write something here..."
          required
        >
        </b-input>
      </b-field>

      <b-field label="Tags">
        <b-taginput
          type="is-info"
          v-model="formData.tags"
          ellipsis
          maxlength="30"
          maxtags="3"
          icon="label"
          placeholder="Add a tag"
        >
        </b-taginput>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">
        Close
      </button>
      <button class="button is-primary" @click="onPublish">Publish</button>
    </footer>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "PostModal",
  data() {
    return {
      formData: {
        title: "",
        content: "",
        tags: [],
      },
    };
  },
  methods: {
    ...mapActions(["Publish"]),
    onPublish() {
      this.Publish(this.formData)
        .then(() => this.$parent.close())
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
