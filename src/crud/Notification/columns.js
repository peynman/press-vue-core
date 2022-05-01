import { bitwiseFlagsColumn, objectStatusColumn, timestampColumn, userProfileColumn } from '../../utils/crudColumn'
import Flags from './flags'
import Status from './status'

export default function ($component) {
  return [
    {
      name: 'id',
      title: $component.$t('components.admin.crud.columns.id'),
      sortable: true,
    },
    {
      name: 'title',
      title: $component.$t('components.admin.crud.columns.title'),
      sortable: true,
    },
    {
      name: 'message',
      title: $component.$t('components.admin.crud.columns.message'),
      sortable: true,
    },
    userProfileColumn($component, 'author', $component.$t('components.admin.crud.columns.author'), 'item.author'),
    userProfileColumn($component, 'user', $component.$t('components.admin.crud.columns.user'), 'item.user'),
    objectStatusColumn($component, 'status', $component.$t('components.admin.crud.columns.status'), 'item.status', Status($component)),
    bitwiseFlagsColumn($component, 'flags', $component.$t('components.admin.crud.columns.flags'), 'item.flags', Flags($component)),
    timestampColumn('created_at', $component.$t('components.admin.crud.columns.created_at'), 'created_at'),
    timestampColumn('updated_at', $component.$t('components.admin.crud.columns.updated_at'), 'updated_at'),
    timestampColumn('deleted_at', $component.$t('components.admin.crud.columns.deleted_at'), 'deleted_at'),
  ]
}
