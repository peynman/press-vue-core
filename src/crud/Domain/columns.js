import { timestampColumn, userProfileColumn } from '../../utils/crudColumn'

export default function ($component) {
  return [{
      name: 'id',
      title: $component.$t('components.admin.crud.columns.id'),
      sortable: true,
    },
    {
      name: 'domain',
      title: $component.$t('components.admin.crud.columns.domain'),
      sortable: true,
    },
    userProfileColumn($component, 'author', $component.$t('components.admin.crud.columns.author'), 'item.author'),
    timestampColumn('created_at', $component.$t('components.admin.crud.columns.created_at'), 'created_at'),
    timestampColumn('updated_at', $component.$t('components.admin.crud.columns.updated_at'), 'updated_at'),
    timestampColumn('deleted_at', $component.$t('components.admin.crud.columns.deleted_at'), 'deleted_at'),
  ]
}
