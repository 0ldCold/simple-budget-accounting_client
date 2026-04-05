<script setup lang="ts">
import {
  useVueTable,
  getCoreRowModel,
  FlexRender,
  createColumnHelper,
  type ColumnDefTemplate,
  type CellContext,
} from '@tanstack/vue-table'
import { type Component, computed, h } from 'vue'
import EditIcon from '@/shared/icons/EditIcon.vue'
import DeleteIcon from '@/shared/icons/DeleteIcon.vue'
import { replaceUrlInString } from '@/shared/helpers/checkIsLink.ts'
import { isStringNotEmpty } from '@/shared/helpers/isStringEmpty.ts'

type TransactionDto = Components.Schemas.TransactionDto

const props = defineProps<{
  data: TransactionDto[] | undefined
  onEditRow?: (row: TransactionDto) => void
  onDeleteRow?: (row: TransactionDto) => void
}>()
const data = computed(() => props.data ?? [])

const handleEditRow = (row: TransactionDto) => {
  props.onEditRow?.(row)
}
const handleDeleteRow = (row: TransactionDto) => {
  props.onDeleteRow?.(row)
}

const getActions = (
  row: TransactionDto,
): { component: Component; action: () => void; title: string }[] => {
  return [
    {
      component: EditIcon,
      action: () => handleEditRow(row),
      title: 'Редактировать запись',
    },
    {
      component: DeleteIcon,
      action: () => handleDeleteRow(row),
      title: 'Удалить запись',
    },
  ]
}

const numberFormat = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' })
const getMoneyCell =
  (
    type: 'income' | 'expense',
  ): ColumnDefTemplate<CellContext<Components.Schemas.TransactionDto, number>> =>
  (info) => {
    const value = info.getValue()
    if (value === 0) return null
    return h(
      'span',
      {
        class: [
          {
            'text-green': value > 0 && type === 'income',
            'text-red': value > 0 && type === 'expense',
          },
        ],
      },
      numberFormat.format(value),
    )
  }

const columnHelper = createColumnHelper<Components.Schemas.TransactionDto>()

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
  columnHelper.accessor('expense', {
    header: 'Расход',
    cell: getMoneyCell('expense'),
    size: 100,
  }),
  columnHelper.accessor('income', {
    header: 'Доход',
    cell: getMoneyCell('income'),
    size: 100,
  }),
  columnHelper.accessor('createdAt', {
    header: 'Дата',
    cell: (info) => {
      const date = new Date(info.getValue())
      return h(
        'span',
        {
          title: date.toLocaleString('ru-RU'),
        },
        date.toLocaleDateString('ru-RU'),
      )
    },
    size: 70,
  }),
  columnHelper.accessor('description', {
    header: 'Контакт',
    cell: (info) => {
      const text = info.getValue()
      if (!isStringNotEmpty(text)) return null

      const textWithChangedLink = replaceUrlInString(
        text,
        (link) => `<a href="${link}" target="_blank">${link}</a>`,
      )
      return h('span', {
        innerHTML: textWithChangedLink,
      })
    },
    size: 300,
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Действия',
    cell: (row) =>
      h(
        'div',
        { class: 'actions' },
        getActions(row.row.original).map((action) =>
          h('div', { onClick: action.action, title: action.title }, h(action.component)),
        ),
      ),
    size: 60,
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
.actions {
  display: flex;
  gap: 5px;
  justify-content: flex-end;
  & > * {
    cursor: pointer;
    width: 20px;
    height: 20px;
    color: var(--color-text);
  }
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
