<template>
  <div class="container">
    <div class="card is-shadowless gap-mt-1">
      <div class="card-header">
        <div class="card-header-title">消息</div>
      </div>
      <div class="card-content">
        <div class="notifications">
          <div
            class="notification"
            v-for="no in notifications"
            :key="no.ID"
            :class="{ 'is-info': !no.HasRead }"
          >
            <button
              v-if="!no.HasRead"
              @click="onDeleteUnread(no)"
              class="delete"
            ></button>
            <div class="is-text-right is-size-7">—— {{ no.Created }} ——</div>
            <div>{{ no.Content }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Notification",
  data() {
    return {
      notifications: [],
      rowCount: 0,
      cursor: 1,
      pageSize: 20,
    };
  },
  created() {
    this.onChangePage(this.cursor);
  },
  methods: {
    ...mapActions(["FetchNotification", "MarkNotificationRead"]),
    onChangePage(value) {
      this.FetchNotification({
        page: value,
        size: this.pageSize,
      })
        .then((data) => {
          this.cursor = value;
          this.rowCount = data.RowCount;
          this.notifications = data.Data;
        })
        .catch((e) =>
          this.$buefy.toast.open({
            type: "is-danger",
            message: e,
          })
        );
    },
    onDeleteUnread(no) {
      this.MarkNotificationRead(no.ID)
        .then(() => {
          this.onChangePage(this.cursor);
        })
        .catch((e) => {
          this.$buefy.toast.open({
            type: "is-danger",
            message: e,
          });
        });
    },
  },
};
</script>