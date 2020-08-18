<template>
  <div class="container fix-margin-collapse" v-if="anyone">
    <div class="columns mt-4 has-background-white">
      <div class="column">
        <div class="level">
          <div class="level-item">
            <figure class="image is-128x128">
              <img class="is-rounded" :src="anyone.Logo" />
            </figure>
          </div>
        </div>
        <div class="content has-text-centered">
          <span class="title">{{ anyone.Name }}</span>
          <br />
          <small>
            第 {{ anyone.ID }} 名注册会员，注册于 {{ anyone.Created }}
          </small>
        </div>
      </div>
    </div>
    <div class="columns mt-4">
      <div class="column">
        <div class="card">
          <div class="card-header">
            <div class="card-header-title">近期主题</div>
          </div>
          <div class="card-content"></div>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <div class="card-header">
            <div class="card-header-title">近期评论</div>
          </div>
          <div class="card-content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "UserDetail",
  props: {
    name: String,
  },
  data() {
    return {
      anyone: undefined,
    };
  },
  created() {
    this.FetchUserDetail(this.name).then((data) => {
      this.anyone = data;
    });
  },
  methods: {
    ...mapActions(["FetchUserDetail"]),
  },
};
</script>