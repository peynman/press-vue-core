import { cartDetailsColumn, timestampColumn, userProfileColumn } from '../../utils/crudColumn'

export default function ($component) {
  return [
    {
      name: 'id',
      title: $component.$t('components.admin.crud.columns.id'),
      sortable: true,
    },
    {
      name: 'periodStart',
      title: $component.$t('components.admin.crud.columns.purchased_at'),
      sortable: true,
      hideInTable: true,
      artificial: true,
    },
    userProfileColumn($component, 'customer', $component.$t('components.admin.crud.columns.user'), 'item.customer'),
    cartDetailsColumn($component, 'cart', $component.$t('components.admin.crud.columns.details'), 'item'),
    timestampColumn('created_at', $component.$t('components.admin.crud.columns.created_at'), 'created_at'),
    timestampColumn('updated_at', $component.$t('components.admin.crud.columns.updated_at'), 'updated_at'),
    timestampColumn('deleted_at', $component.$t('components.admin.crud.columns.deleted_at'), 'deleted_at'),
  ]
}
