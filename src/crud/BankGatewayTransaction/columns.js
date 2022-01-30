import { currencyColumn, objectStatusColumn, timestampColumn, userProfileColumn } from '../../utils/crudColumn'
import Status from './status'

export default function ($component) {
  return [
    {
      name: 'id',
      title: $component.$t('components.admin.crud.columns.id'),
      sortable: true,
    },
    userProfileColumn('customer', $component.$t('components.admin.crud.columns.user'), 'item.customer'),
    currencyColumn('amount', $component.$t('components.admin.crud.columns.amount'), 'item.amount'),
    objectStatusColumn('status', $component.$t('components.admin.crud.columns.status'), 'item.status', Status($component)),
    timestampColumn('created_at', $component.$t('components.admin.crud.columns.created_at'), 'created_at'),
    timestampColumn('updated_at', $component.$t('components.admin.crud.columns.updated_at'), 'updated_at'),
    timestampColumn('deleted_at', $component.$t('components.admin.crud.columns.deleted_at'), 'deleted_at'),
  ]
}
