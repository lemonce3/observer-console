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
        },
        {
          key: 'agents',
          label: $t('message.table.agents'),
          class: 'w-50'
        }]"
    >
      <template slot="agents" slot-scope="data">
        <b-button
          size="sm"
          @click.stop="data.toggleDetails"
          class="mr-2"
          v-if="data.item.agents.length > 1"
        >{{ data.detailsShowing ? $t('message.btn.hide') : $t('message.btn.show')}}</b-button>
        <template v-else>{{ data.item.agents[0] }}</template>
      </template>
      <template slot="row-details" slot-scope="data">
        <b-card no-body>
          <b-list-group class="d-block" flush>
            <b-list-group-item
              v-for="item in data.item.agents"
              :key="item.id"
              class="w-50 p-2 float-left"
            >{{ item }}</b-list-group-item>
          </b-list-group>
        </b-card>
      </template>
    </b-table>
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
