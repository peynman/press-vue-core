import CrudColumns from './columns'
import CrudRelations from './relations'
import CrudApi from './Api'
import CrudReports from './Reports'

export default function ($component, name = undefined, autoloads = {}, depth = 5, api = true) {
  return {
    name: name || 'carts',
    singular: $component.$t('components.admin.crud.cart.singular'),
    plural: $component.$t('components.admin.crud.cart.plural'),
    primaryKey: 'id',
    autoloads: autoloads.self ?? false,
    columns: CrudColumns($component),
    relations: CrudRelations($component, autoloads, depth),
    api: api ? CrudApi($component) : undefined,
    reports: api ? CrudReports($component) : undefined,
  }
}
