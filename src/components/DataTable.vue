<template>
  <div class="table-wrapper p-4">
    <h2 class="text-xl font-bold mb-4">{{ tableLabel }}</h2>
    <DataTable
      v-if="rowsData.length > 0"
      :value="rowsData"
      :paginator="true"
      :rows="metadata.perPage"
      :totalRecords="metadata.totalItems"
      :first="metadata.totalPages - 1"
      :lazy="true"
      @page="onPageChangeHandler"
      class="min-w-full border border-gray-200 shadow-sm"
    >
      <Column
        v-for="(label, index) in headLabels"
        :key="index"
        :field="label.field"
        :header="label.header"
      >
        <template #body="slotProps">
          <slot :name="label.field" :data="slotProps.data">
            {{ slotProps.data[label.field] }}
          </slot>
        </template>
      </Column>
    </DataTable>

    <div v-else class="text-center py-4 text-gray-500">
      {{ noRecordsMessage }}
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default {
  name: "SharedDataTable",
  components: { DataTable, Column },
  props: {
    tableLabel: {
      type: String,
      required: true,
    },
    headLabels: {
      type: Array,
      required: true,
    },
    rowsData: {
      type: Array,
      required: true,
    },
    metadata: {
      type: Object,
      required: true,
    },
    onPageChange: {
      type: Function,
      required: true,
    },
    noRecordsMessage: {
      type: String,
      default: "No records available",
    },
  },
  methods: {
    onPageChangeHandler(event) {
      const newPage = event.page + 1;
      this.onPageChange(newPage);
    },
  },
};
</script>

<style scoped>
.table-wrapper {
  @apply bg-white shadow rounded-lg;
}
</style>
