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
        class: 'w-50'
      },{
        key: 'master',
        label: $t('message.table.master'),
        class: 'w-50'
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
        .get(`/api/console/agent?timestamp=${new Date().getTime()}`)
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