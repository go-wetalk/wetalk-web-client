<template>
  <div class="container">
    <template v-for="item in rows">
      <slot name="item" :key="item.ID"></slot>
    </template>
    <div class="section" v-if="rowCount > pageSize">
      <b-pagination
        :total="rowCount"
        :per-page="pageSize"
        :current="cursor"
        @change="onChangePage"
        icon-prev="arrow-left-s-line"
        icon-next="arrow-right-s-line"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Paginated",
  props: {
    pageSize: {
      type: Number,
      default: 20,
    },
    fetchFunc: Function,
  },
  data() {
    return {
      rowCount: 0,
      cursor: 1,
      rows: [],
    };
  },
  methods: {
    onChangePage(value) {
      this.fetchFunc(value).then((data) => {
        this.rowCount = data.RowCount;
        this.rows = data.Data;
      });
    },
  },
};
</script>