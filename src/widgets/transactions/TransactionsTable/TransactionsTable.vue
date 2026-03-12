<script setup lang="ts">
import { useVueTable, getCoreRowModel, FlexRender, createColumnHelper } from '@tanstack/vue-table'
import { computed } from 'vue'

type TransactionDTO = Components.Schemas.TransactionDTO

interface Props {
  data: TransactionDTO[] | undefined
}

const props = defineProps<Props>()
const data = computed(() => props.data ?? [])

const columnHelper = createColumnHelper<Components.Schemas.TransactionDTO>()

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor('createdAt', {
    header: 'Дата',
    cell: (info) => {
      const date = new Date(info.getValue())
      return date.toLocaleDateString('ru-RU')
    },
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor('name', {
    header: 'Название',
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor('description', {
    header: 'Описание',
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor('income', {
    header: 'Доход',
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor('expense', {
    header: 'Расход',
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
]
const table = useVueTable({ data, columns, getCoreRowModel: getCoreRowModel() })
</script>

<template>
  <div>
    <table>
      <thead>
        <tr v-for="hg in table.getHeaderGroups()" :key="hg.id">
          <th v-for="header in hg.headers" :key="header.id">
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

<style scoped></style>
