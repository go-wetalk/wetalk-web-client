<template>
  <div class="container fix-margin-collapse" v-if="topic">
    <div v-if="topic" class="card gap-mt-1 has-background-white is-shadowless">
      <div class="card-head">
        <h1 class="title">
          {{ topic.Title }}
        </h1>
        <div class="card-meta">
          <div class="card-meta-author is-size-5">
            <router-link
              :to="{ name: 'UserDetail', params: { name: topic.User.Name } }"
            >
              {{ topic.User.Name }}
            </router-link>
          </div>
          <div class="card-meta-time is-size-7">发布于 {{ topic.Created }}</div>
        </div>
      </div>
      <div class="card-content">
        <div class="content wysiwyg" v-html="topic.Content"></div>
      </div>
      <div class="card-foot">
        标签：
        <b-taglist>
          <b-tag type="is-info" v-for="tag in topic.Tags" :key="tag">
            {{ tag }}
          </b-tag>
        </b-taglist>
      </div>
    </div>
    <div
      v-if="topic"
      class="card gap-mt-1 has-background-white is-shadowless"
      v-can="[topic.User.ID, 'mod']"
    >
      <div class="card-content">
        <div class="buttons">
          <b-button v-can="[topic.User.ID]" type="is-primary is-small"
            >编辑</b-button
          >
          <b-button v-can="['mod']" type="is-danger is-small">删除</b-button>
        </div>
      </div>
    </div>
    <section class="section">
      <div class="subtitle is-uppercase">近期评论</div>
      <section
        class="section has-background-white-bis has-text-centered"
        v-if="comments.length === 0"
      >
        <small>暂无评论</small>
      </section>
      <article
        class="comment media has-background-white"
        style="padding: 1rem;"
        v-for="com in comments"
        :key="com.ID"
      >
        <figure class="media-left is-hidden-mobile">
          <p class="image is-64x64">
            <img :src="com.User.Logo" />
          </p>
        </figure>
        <div class="media-content">
          <div class="level is-mobile has-text-justified">
            <div class="level-left">
              <div class="level-item">
                <router-link
                  :to="{ name: 'UserDetail', params: { name: com.User.Name } }"
                >
                  {{ com.User.Name }}
                </router-link>
              </div>
              <div class="level-item is-size-7">#{{ com.ID }}</div>
              <div class="level-item is-size-7">
                {{ com.Created }}
              </div>
            </div>
            <div class="level-right">
              <a
                class="level-item action-icon"
                title="Reply"
                @click="onReplyTo(com)"
              >
                <b-icon icon="reply-fill" size="is-small"></b-icon>
              </a>
              <a class="level-item action-icon" title="Share">
                <b-icon icon="arrow-go-forward-fill" size="is-small"></b-icon>
              </a>
              <a class="level-item action-icon" title="Favorite">
                <b-icon icon="heart-line" size="is-small"></b-icon>
              </a>
            </div>
          </div>
          <div class="content wysiwyg" v-html="com.Content"></div>
        </div>
      </article>
      <div class="container gap-mt-1" v-if="commentRowCount > commentPageSize">
        <b-pagination
          :total="commentRowCount"
          :per-page="commentPageSize"
          :current="commentPage"
          @change="onChangePage"
        ></b-pagination>
      </div>
    </section>
    <section class="section" v-if="profile">
      <div class="subtitle is-uppercase">发表评论</div>
      <article class="media">
        <figure class="media-left is-hidden-mobile">
          <p class="image is-64x64">
            <img :src="profile.Logo" />
          </p>
          <p class="has-text-centered">
            <router-link
              :to="{ name: 'UserDetail', params: { name: profile.Name } }"
              >{{ profile.Name }}</router-link
            >
          </p>
        </figure>
        <div class="media-content">
          <div class="field">
            <p class="control">
              <b-input
                type="textarea"
                ref="reply"
                placeholder="Add a comment..."
                v-model.trim="formData.content"
              ></b-input>
            </p>
          </div>
          <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <a class="button is-info" @click="onSubmit()">发表</a>
              </div>
            </div>
          </nav>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import "makefuckingjsgreatagain.css";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "Topic",
  props: {
    topicId: [String, Number],
  },
  data() {
    return {
      topic: undefined,
      formData: {
        topicId: 0,
        replyTo: 0,
        content: "",
      },
      commentPage: 1,
      commentPageSize: 10,
      commentRowCount: 0,
      comments: [],
    };
  },
  computed: {
    ...mapState(["profile", "VUE_APP_NAME"]),
    ...mapGetters(["isLoggedIn"]),
  },
  created() {
    const topicId = parseInt(this.topicId);
    this.FetchTopic(topicId).then((data) => {
      this.topic = data;
      this.formData.topicId = topicId;
      this.onChangePage(this.commentPage);
      document.title = `${this.topic.Title} - ${this.VUE_APP_NAME}`;
    });
  },
  methods: {
    ...mapActions(["FetchTopic", "FetchCommentPage", "PublishComment"]),
    onSubmit(commentId = 0) {
      this.formData.replyTo = commentId;
      if (this.formData.content.length === 0) {
        return this.$buefy.toast.open({
          type: "is-danger",
          message: "评论内容不能留空啊",
        });
      }

      this.PublishComment(this.formData)
        .then(() => {
          this.formData.replyTo = 0;
          this.formData.content = "";
          this.$buefy.toast.open({
            type: "is-success",
            message: "发表成功",
          });
        })
        .catch((e) =>
          this.$buefy.toast.open({
            type: "is-danger",
            message: e,
          })
        );
    },
    onChangePage(value) {
      this.FetchCommentPage({
        topicId: this.topic.ID,
        page: value,
        size: this.commentPageSize,
      })
        .then((data) => {
          this.comments = data.Data;
          this.commentRowCount = data.RowCount;
          this.commentPage = value;
        })
        .catch((e) =>
          this.$buefy.toast.open({
            type: "is-danger",
            message: e,
          })
        );
    },
    onReplyTo(comment) {
      this.formData.topicId = this.topic.ID;
      this.formData.replyTo = comment.ID;
      this.formData.content = `@${comment.User.Name} `;
      const reply = this.$refs.reply.$el;
      reply.scrollIntoView && reply.scrollIntoView();
    },
  },
};
</script>

<style lang="scss" scoped>
.section + .section {
  padding-top: 0;
}
.media + .media {
  margin-top: 0;
}
.action-icon {
  padding: 3px;
  border-radius: 3px;
}
.action-icon:hover {
  background: rgba($color: #000000, $alpha: 0.1);
}
.card .card-head {
  padding: 1.5rem;
  border-bottom: 1px solid #efefef;
  background: #f9f9f9;

  .title {
    margin-bottom: 0;
  }
  .card-meta {
    margin-top: 0.5rem;
    display: grid;
    grid-auto-flow: column dense;
    grid-template-columns: max-content;
    align-items: baseline;
    column-gap: 0.5rem;
  }
}
.card .card-foot {
  padding: 1rem 1.5rem;
  border-top: 1px solid #efefef;
  background: #f9f9f9;
  display: flex;
  flex-flow: row nowrap;
}
.comment .media-content {
  align-self: stretch;

  .level {
    margin-bottom: 0.5rem;

    .level-left {
      align-items: baseline;
    }
  }
}
</style>