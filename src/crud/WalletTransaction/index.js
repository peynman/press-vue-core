import CrudColumns from './columns'
import CrudRelations from './relations'
import CrudApi from './Api'

export default function ($component, name = undefined, autoloads = {}, depth = 5, api = true) {
  return {
    name: name || 'wallet-transactions',
    singular: $component.$t('components.admin.crud.walletTransaction.singular'),
    plural: $component.$t('components.admin.crud.walletTransaction.plural'),
    primaryKey: 'id',
    autoloads: autoloads.self ?? false,
    columns: CrudColumns($component),
    relations: CrudRelations($component, autoloads, depth),
    api: api ? CrudApi($component) : undefined,
  }
}
