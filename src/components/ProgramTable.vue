<template>
  <div>
    <b-table
      striped
      hover
      responsive
      :items="tableData"
      :per-page="perPage"
      :current-page="currentPage"
      :fields="[
        {
          key: 'id',
          label: $t('message.table.id'),
          class: 'table-width'
        },
        {
          key: 'name',
          label: $t('message.table.name'),
          class: 'table-width'
        }, 
        {
          key: 'args',
          label: $t('message.table.args'),
          class: 'table-width'
        }, 
        {
          key: 'details',
          label: $t('message.table.details'),
          class: 'table-width'
        },
      ]"
    >
      <template slot="details" slot-scope="data">
        <b-button
          size="sm"
          @click.stop="toggleDetails(data)"
          class="mr-2"
        >{{ data.detailsShowing ? $t('message.btn.hide') : $t('message.btn.show')}}</b-button>
      </template>
      <template slot="row-details" slot-scope="data">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right">
              <b>{{ $t('message.table.returnValue') }}:</b>
            </b-col>
            <b-col>{{ data.item.returnValue }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right">
              <b>{{ $t('message.table.error') }}:</b>
            </b-col>
            <b-col>{{ data.item.error }}</b-col>
          </b-row>
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
      }, 1000),
      keepedCard: []
      // newTableData: []
    };
  },
  methods: {
    handleData() {
      axios
        .get(`/api/console/program?timestamp=${new Date().getTime()}`)
        .then(({ data }) => {
          const dataId = data.map(item => item.id);

          // 新增数据
          data.map(item => {
            if (!this.tableDataId.includes(item.id)) {
              this.tableData.push(item);
            }
          });

          // 删除过期且没有详细展示的数据
          this.tableData.map(item => {
            if (
              !dataId.includes(item.id) &&
              !this.keepedCard.includes(item.id)
            ) {
              this.tableData.splice(this.tableDataId.indexOf(item.id), 1);
            }
          });
        });
    },
    toggleDetails(data) {
      if (data.detailsShowing) {
        this.keepedCard.splice(this.keepedCard.indexOf(data.item.id), 1);
      } else {
        this.keepedCard.push(data.item.id);
      }
      data.toggleDetails();
    }
  },
  mounted() {
    this.handleData();
  },
  destroyed() {
    clearInterval(this.update);
  },
  computed: {
    tableDataId() {
      return this.tableData.map(item => item.id);
    }
  }
};
</script>

<style>
.table-width {
  width: 25%;
}
</style>