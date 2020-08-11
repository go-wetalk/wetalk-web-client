<template>
  <div class="container fix-margin-collapse">
    <div class="card has-media-stack gap-mt-1" v-if="topicPageData.length > 0">
      <div class="card-header">
        <div class="card-header-title">主题列表</div>
      </div>
      <div class="card-content">
        <div
          class="media has-background-white"
          v-for="topic in topicPageData"
          :key="topic.ID"
        >
          <figure class="media-left is-hidden-mobile">
            <p class="image is-48x48">
              <img :src="topic.User.Logo" />
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <router-link
                :to="{ name: 'JoinTopic', params: { topicId: topic.ID } }"
              >
                {{ topic.Title }}
              </router-link>
            </div>
            <div class="level is-mobile">
              <div class="level-left">
                <div class="level-item">
                  <sub>
                    <router-link
                      :to="{
                        name: 'UserDetail',
                        params: { name: topic.User.Name },
                      }"
                    >
                      {{ topic.User.Name }}
                    </router-link>
                  </sub>
                </div>
                <div class="level-item" v-if="topic.LastComment">
                  <sub>最后由</sub>
                </div>
                <div class="level-item" v-if="topic.LastComment">
                  <sub>
                    <router-link
                      :to="{
                        name: 'UserDetail',
                        params: { name: topic.LastComment.User.Name },
                      }"
                    >
                      {{ topic.LastComment.User.Name }}
                    </router-link>
                  </sub>
                </div>
                <div class="level-item" v-if="topic.LastComment">
                  <sub>回复于 {{ topic.LastComment.Created }}</sub>
                </div>
                <div class="level-item" v-else>
                  <sub>发布于 {{ topic.Created }}</sub>
                </div>
              </div>
              <div class="level-right is-hidden-mobile" v-if="topic.Tags">
                <div class="level-item">
                  <b-taglist>
                    <b-tag
                      type="is-primary"
                      v-for="tag in topic.Tags"
                      :key="tag"
                    >
                      {{ tag }}
                    </b-tag>
                  </b-taglist>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="section has-text-centered" v-else>
      <strong>还没有主题，等你抢第一哟</strong>
    </section>
    <div class="section" v-if="rowCount > pageSize">
      <b-pagination
        :total="rowCount"
        :per-page="pageSize"
        :current="currentPageNumber"
        @change="onChangePage"
        icon-prev="arrow-left-s-line"
        icon-next="arrow-right-s-line"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      pageSize: 20,
      rowCount: 0,
      currentPageNumber: 1,
      topicPageData: [],
    };
  },
  computed: {
    ...mapState(["VUE_APP_NAME"]),
  },
  created() {
    document.title = `${this.VUE_APP_NAME}`;

    this.onChangePage(this.currentPageNumber);
  },
  methods: {
    ...mapActions(["FetchTopicPage"]),
    onChangePage(value) {
      this.FetchTopicPage({
        page: value,
        size: this.pageSize,
      })
        .then((data) => {
          this.currentPageNumber = value;
          this.topicPageData = data.Data;
          this.rowCount = data.RowCount;
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

<style lang="scss" scoped>
.section + .section {
  padding-top: 0;
}
.media {
  padding: 1rem;

  .media-content {
    display: flex;
    flex-flow: column wrap;
    align-self: stretch;
    justify-content: space-between;
  }

  .content {
    margin-bottom: 0;
  }
  .level-left {
    align-items: baseline;
  }
}
.media + .media {
  margin-top: 0;
}
.columns {
  margin: 0 !important;
}
.tags .tag {
  margin-bottom: 0;
  font-size: 0.5em;
  height: fit-content;
}
.card.has-media-stack {
  .card-content {
    padding: 0.5rem 0 0;
  }
  .media {
    margin: 0;
  }
}
</style>