import { bitwiseFlagsColumn, currencyColumn, decorateColumn, timestampColumn, userProfileColumn } from '../../utils/crudColumn'
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
      name: 'code',
      title: $component.$t('components.admin.crud.columns.giftCode'),
      sortable: true,
    },
    currencyColumn($component, 'amount', $component.$t('components.admin.crud.columns.maxAmount'), 'item.amount'),
    decorateColumn($component, 'percent', $component.$t('components.admin.crud.columns.percent'), {
      percent: 'value',
    }, 'item.data', ':percent%'),
    bitwiseFlagsColumn($component, 'flags', $component.$t('components.admin.crud.columns.flags'), 'item.flags'), Flags($component),
    timestampColumn('created_at', $component.$t('components.admin.crud.columns.created_at'), 'created_at'),
    timestampColumn('updated_at', $component.$t('components.admin.crud.columns.updated_at'), 'updated_at'),
    timestampColumn('deleted_at', $component.$t('components.admin.crud.columns.deleted_at'), 'deleted_at'),
  ]
}
