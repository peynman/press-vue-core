import { timestampColumn, userProfileColumn, nameTitleColumn } from '../../utils/crudColumn'

export default function ($component) {
  return [{
      name: 'id',
      title: $component.$t('components.admin.crud.columns.id'),
      sortable: true,
    },
    nameTitleColumn('name', $component.$t('components.admin.crud.columns.title'), 'item', ':type', ':name', {
      name: 'name',
      type: 'type',
    }),
    userProfileColumn('author', $component.$t('components.admin.crud.columns.author'), 'item.author'),
    timestampColumn('created_at', $component.$t('components.admin.crud.columns.created_at'), 'created_at'),
    timestampColumn('updated_at', $component.$t('components.admin.crud.columns.updated_at'), 'updated_at'),
    timestampColumn('deleted_at', $component.$t('components.admin.crud.columns.deleted_at'), 'deleted_at'),
  ]
}
