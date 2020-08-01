<template>
  <div class="container">
    <div class="columns">
      <div class="column is-11 is-offset-1">
        <section class="section">
          <div
            class="media has-background-white"
            v-for="topic in topicPageData"
            :key="topic.ID"
          >
            <figure class="media-left">
              <p class="image is-48x48">
                <img :src="topic.User.Logo" />
              </p>
            </figure>
            <div class="media-content">
              <div class="content is-size-6">
                <router-link
                  :to="{ name: 'JoinTopic', params: { topicId: topic.ID } }"
                >
                  {{ topic.Title }}
                </router-link>
              </div>
              <div class="level is-mobile">
                <div class="level-left">
                  <div class="level-item is-size-7">
                    <router-link :to="{ path: '/users/' + topic.User.Name }">
                      {{ topic.User.Name }}
                    </router-link>
                  </div>
                  <div class="level-item is-size-7" v-if="topic.LastComment">
                    最后由
                  </div>
                  <div class="level-item is-size-7" v-if="topic.LastComment">
                    <router-link :to="'/users/' + topic.LastComment.User.Name">
                      {{ topic.LastComment.User.Name }}
                    </router-link>
                  </div>
                  <div class="level-item is-size-7" v-if="topic.LastComment">
                    回复于 {{ topic.LastComment.Created }}
                  </div>
                  <div class="level-item is-size-7" v-else>
                    发布于 {{ topic.Created }}
                  </div>
                  <div class="level-item is-size-7" v-if="topic.Tags">
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
        </section>
        <div class="section">
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
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
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
  created() {
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
.app {
  background: #fff;
  margin: 2rem auto;
  border-radius: 0.4rem;
  box-shadow: 0 0 0.5rem rgba($color: #000000, $alpha: 0.1);
}
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
</style>