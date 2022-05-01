import { bitwiseFlagsColumn, decimalColumn, timestampColumn, userProfileColumn } from '../../utils/crudColumn'
import Flags from './flags'

export default function ($component) {
  return [
    {
      name: 'id',
      title: $component.$t('components.admin.crud.columns.id'),
      sortable: true,
    },
    userProfileColumn($component, 'author', $component.$t('components.admin.crud.columns.author'), 'item.author'),
    {
      name: 'title',
      title: $component.$t('components.admin.crud.columns.title'),
      sortable: true,
      component: {
        tag: 'VColumnDecoratable',
        props: {
          label: ':title',
          decorateMap: {
            title: 'data.title',
          },
          value: '$(bindings.item)',
        },
      },
    },
    decimalColumn($component, 'participants_count', $component.$t('components.admin.crud.columns.participantsCount'), 'item.participants_count'),
    decimalColumn($component, 'messages', $component.$t('components.admin.crud.columns.messagesCount'), 'item.messages_count'),
    decimalColumn($component, 'unseen_messages', $component.$t('components.admin.crud.columns.unseenMessagesCount'), 'item.unseen_messages_count'),
    bitwiseFlagsColumn($component, 'flags', $component.$t('components.admin.crud.columns.flags'), 'item.flags', Flags($component)),
    timestampColumn('created_at', $component.$t('components.admin.crud.columns.created_at'), 'created_at'),
    timestampColumn('updated_at', $component.$t('components.admin.crud.columns.updated_at'), 'updated_at'),
    timestampColumn('deleted_at', $component.$t('components.admin.crud.columns.deleted_at'), 'deleted_at'),
  ]
}
