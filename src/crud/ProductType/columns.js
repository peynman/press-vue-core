import { nameTitleColumn, timestampColumn, userProfileColumn } from '../../utils/crudColumn'

export default function ($component) {
  return [{
      name: 'id',
      title: $component.$t('components.admin.crud.columns.id'),
      sortable: true,
    },
    nameTitleColumn($component, 'name', $component.$t('components.admin.crud.columns.title'), 'item', ':name', ':title', {
      name: 'name',
      title: 'data.title',
    }),
    userProfileColumn($component, 'author', $component.$t('components.admin.crud.columns.author'), 'item.author'),
    timestampColumn('created_at', $component.$t('components.admin.crud.columns.created_at'), 'created_at'),
    timestampColumn('updated_at', $component.$t('components.admin.crud.columns.updated_at'), 'updated_at'),
    timestampColumn('deleted_at', $component.$t('components.admin.crud.columns.deleted_at'), 'deleted_at'),
  ]
}
