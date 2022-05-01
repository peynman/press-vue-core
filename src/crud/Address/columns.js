import { timestampColumn, userProfileColumn } from '../../utils/crudColumn'

export default function ($component) {
  return [{
      name: 'id',
      title: $component.$t('components.admin.crud.columns.id'),
      sortable: true,
    },
    userProfileColumn($component, 'user', $component.$t('components.admin.crud.columns.user'), 'item.user'),
    {
      name: 'city_code',
      title: $component.$t('components.admin.crud.columns.city'),
      sortable: true,
    },
    {
      name: 'province_code',
      title: $component.$t('components.admin.crud.columns.province'),
      sortable: true,
    },
    timestampColumn('created_at', $component.$t('components.admin.crud.columns.created_at'), 'created_at'),
    timestampColumn('updated_at', $component.$t('components.admin.crud.columns.updated_at'), 'updated_at'),
    timestampColumn('deleted_at', $component.$t('components.admin.crud.columns.deleted_at'), 'deleted_at'),
  ]
}
