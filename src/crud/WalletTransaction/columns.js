import { bitwiseFlagsColumn, currencyColumn, objectStatusColumn, timestampColumn, userProfileColumn } from '../../utils/crudColumn'
import Flags from './flags'
import Types from './types'

export default function ($component) {
  return [
    {
      name: 'id',
      title: $component.$t('components.admin.crud.columns.id'),
      sortable: true,
    },
    userProfileColumn($component, 'user', $component.$t('components.admin.crud.columns.user'), 'item.user'),
    currencyColumn($component, 'amount', $component.$t('components.admin.crud.columns.amount'), 'item.amount'),
    objectStatusColumn($component, 'type', $component.$t('components.admin.crud.columns.type'), 'item.type', Types($component)),
    bitwiseFlagsColumn($component, 'flags', $component.$t('components.admin.crud.columns.flags'), 'item.flags', Flags($component)),
    timestampColumn('created_at', $component.$t('components.admin.crud.columns.created_at'), 'created_at'),
    timestampColumn('updated_at', $component.$t('components.admin.crud.columns.updated_at'), 'updated_at'),
    timestampColumn('deleted_at', $component.$t('components.admin.crud.columns.deleted_at'), 'deleted_at'),
  ]
}
