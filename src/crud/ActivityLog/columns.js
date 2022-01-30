import { nameTitleColumn, objectStatusColumn, timestampColumn, userProfileColumn } from '../../utils/crudColumn'
import Types from './types'

export default function ($component) {
  return [{
      name: 'id',
      title: $component.$t('components.admin.crud.columns.id'),
      sortable: true,
    },
    userProfileColumn('user', $component.$t('components.admin.crud.columns.author'), 'item.user'),
    nameTitleColumn('subject', $component.$t('components.admin.crud.columns.subject'), 'item', ':desc', ':subject', {
      subject: 'subject',
      desc: 'description',
    }),
    objectStatusColumn('type', $component.$t('components.admin.crud.columns.type'), 'item.type', Types($component)),
    timestampColumn('created_at', $component.$t('components.admin.crud.columns.created_at'), 'created_at'),
  ]
}
