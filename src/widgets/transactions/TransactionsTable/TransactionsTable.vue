<script setup lang="ts">
import {
  useVueTable,
  getCoreRowModel,
  FlexRender,
  createColumnHelper,
  type ColumnDefTemplate,
  type CellContext,
} from '@tanstack/vue-table'
import { computed, h } from 'vue'

type TransactionDTO = Components.Schemas.TransactionDTO

const props = defineProps<{
  data: TransactionDTO[] | undefined
}>()
const data = computed(() => props.data ?? [])

const numberFormat = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' })
const getMoneyCell =
  (
    type: 'income' | 'expense',
  ): ColumnDefTemplate<CellContext<Components.Schemas.TransactionDTO, number>> =>
  (info) => {
    const value = info.getValue()
    if (value === 0) return null
    return h(
      'span',
      {
        class: [
          'centerCell',
          {
            'text-green': value > 0 && type === 'income',
            'text-red': value > 0 && type === 'expense',
          },
        ],
      },
      numberFormat.format(value),
    )
  }

const columnHelper = createColumnHelper<Components.Schemas.TransactionDTO>()

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
    size: 50,
  }),
  columnHelper.accessor('name', {
    header: 'Название',
    cell: (info) => info.getValue(),
    size: 150,
  }),
  columnHelper.accessor('income', {
    header: 'Доход',
    cell: getMoneyCell('income'),
    size: 100,
  }),
  columnHelper.accessor('expense', {
    header: () => h('div', {}, 'Расход'),
    cell: getMoneyCell('expense'),
    size: 100,
  }),
  columnHelper.accessor('createdAt', {
    header: 'Дата',
    cell: (info) => {
      const date = new Date(info.getValue())
      return date.toLocaleDateString('ru-RU')
    },
    size: 100,
  }),
  columnHelper.accessor('description', {
    header: 'Описание',
    cell: (info) => info.getValue(),
    size: 300,
  }),
]
const table = useVueTable({ data, columns, getCoreRowModel: getCoreRowModel() })
</script>

<template>
  <div>
    <table>
      <thead>
        <tr v-for="hg in table.getHeaderGroups()" :key="hg.id">
          <th
            v-for="header in hg.headers"
            :key="header.id"
            :style="{ width: `${header.getSize()}px` }"
            :colspan="header.colSpan"
          >
            <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in table.getRowModel().rows" :key="row.id">
          <td v-for="cell in row.getVisibleCells()" :key="cell.id">
            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
}
.text-green {
  color: green;
}
.text-red {
  color: red;
}
thead {
  border-bottom: 1px solid var(--color-border);
}
td,
th {
  padding: 8px;
}
th {
  padding-top: 0;
  padding-bottom: 0;
}
tr {
  border-bottom: 1px solid var(--color-border);
}
tr:hover {
  background-color: var(--color-background-soft);
  border-color: var(--color-border-hover);
}
td:nth-of-type(1) {
  text-align: center;
}
td:nth-of-type(3),
td:nth-of-type(4),
td:nth-of-type(5) {
  text-align: right;
}
th:nth-of-type(3),
th:nth-of-type(4),
th:nth-of-type(5) {
  text-align: right;
}
</style>
