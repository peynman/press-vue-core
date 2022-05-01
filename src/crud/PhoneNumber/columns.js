import { bitwiseFlagsColumn, timestampColumn, userProfileColumn } from '../../utils/crudColumn'
import PhoneFlags from './flags'

export default function ($component) {
  return [{
      name: 'id',
      title: $component.$t('components.admin.crud.columns.id'),
      sortable: true,
    },
    {
      name: 'number',
      title: $component.$t('components.admin.crud.columns.phone'),
      sortable: true,
    },
    userProfileColumn($component, 'user', $component.$t('components.admin.crud.columns.user'), 'item.user'),
    bitwiseFlagsColumn($component, 'flags', $component.$t('components.admin.crud.columns.flags'), 'item.flags', PhoneFlags($component)),
    timestampColumn('created_at', $component.$t('components.admin.crud.columns.created_at'), 'created_at'),
    timestampColumn('updated_at', $component.$t('components.admin.crud.columns.updated_at'), 'updated_at'),
    timestampColumn('deleted_at', $component.$t('components.admin.crud.columns.deleted_at'), 'deleted_at'),
  ]
}
