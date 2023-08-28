<template>
  <n-space vertical :size="12">
    <n-space>
      <!-- <n-select v-model:value="value" :options="options" />
      <n-select v-model:value="value" disabled :options="options" /> -->
      <n-button @click="filterAddress">Filter Address(Use Value 'London')</n-button>
      <n-button @click="unfilterAddress">Clear Address Filters</n-button>
    </n-space>
    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
      @update:filters="handleUpdateFilter"
    />
  </n-space>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'

const data = [
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: 1,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: 3,
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
]

export default defineComponent({
  setup() {
    const value = ref(null)
    const options = [
      {
        label: 'London',
        value: 'song0',
        disabled: true,
      },
      {
        label: 'New York',
        value: 'song1',
      },
    ]
    const addressColumn = reactive({
      title: 'Address',
      key: 'address',
      filterMultiple: true,
      filterOptionValue: null,
      sorter: 'default',
      filterOptions: [
        {
          label: 'Lake Park',
          value: 'Lake Park',
        },
        {
          label: 'New',
          value: 'New',
        },
        {
          label: 'Sidney',
          value: 'Sidney',
        },
      ],
      filter(value, row) {
        console.log('过滤', row.address)
        return !!~row.address.indexOf(value.toString())
      },
    })

    const columns = reactive([
      {
        title: 'Name',
        key: 'name',
        sorter(rowA, rowB) {
          return rowA.name.length - rowB.name.length
        },
      },
      {
        title: 'Age',
        key: 'age',
        sorter(rowA, rowB) {
          return rowA.age - rowB.age
        },
      },
      addressColumn,
    ])
    return {
      value,
      options,
      data,
      columns,
      pagination: { pageSize: 5 },
      filterAddress() {
        addressColumn.filterOptionValue = 'New York'
      },
      unfilterAddress() {
        addressColumn.filterOptionValue = null
      },
      handleUpdateFilter(filters, sourceColumn) {
        addressColumn.filterOptionValue = filters[sourceColumn.key]
      },
    }
  },
})
</script>
