<template>
  <div>
    <b-table
      striped
      hover
      responsive
      :items="tableData"
      :per-page="perPage"
      :current-page="currentPage"
      :fields="[{
        key: 'id',
        label: $t('message.table.id'),
        class: 'table-width'
        },
        {
          key: 'agents',
          label: $t('message.table.agent'),
          class: 'table-width'
        }]"
    />
    <b-pagination
      size="sm"
      :total-rows="tableData.length"
      v-model="currentPage"
      :per-page="perPage"
      class="pull-right m-0"
      align="right"
    />
  </div>
</template>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      currentPage: 1,
      tableData: [],
      perPage: 10,
      update: setInterval(() => {
      this.handleData();
    }, 1000)
    };
  },
  methods: {
    handleData() {
      axios
        .get(`/api/console/master?timestamp=${new Date().getTime()}`)
        .then(({ data }) => (this.tableData = data));
    }
  },
  mounted() {
    this.handleData();
  },
  destroyed() {
    clearInterval(this.update);
  }
};
</script>

<style>
.table-width {
  width: 50%
}
</style>
