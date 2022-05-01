import { bitwiseFlagsColumn, timestampColumn, userProfileColumn } from '../../utils/crudColumn'
import EmailFlags from './flags'

export default function ($component) {
  return [{
      name: 'id',
      title: $component.$t('components.admin.crud.columns.id'),
      sortable: true,
    },
    {
      name: 'email',
      title: $component.$t('components.admin.crud.columns.email'),
      sortable: true,
    },
    userProfileColumn($component, 'user', $component.$t('components.admin.crud.columns.user'), 'item.user'),
    bitwiseFlagsColumn($component, 'flags', $component.$t('components.admin.crud.columns.flags'), 'item.flags', EmailFlags($component)),
    timestampColumn('created_at', $component.$t('components.admin.crud.columns.created_at'), 'created_at'),
    timestampColumn('updated_at', $component.$t('components.admin.crud.columns.updated_at'), 'updated_at'),
    timestampColumn('deleted_at', $component.$t('components.admin.crud.columns.deleted_at'), 'deleted_at'),
  ]
}
