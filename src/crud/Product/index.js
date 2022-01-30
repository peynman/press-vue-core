import CrudColumns from './columns'
import CrudRelations from './relations'
import CrudApi from './Api'
import CrudActions from './Actions'

export default function ($component, name = undefined, autoloads = {}, depth = 5, api = true) {
  return {
    name: name || 'products',
    singular: $component.$t('components.admin.crud.product.singular'),
    plural: $component.$t('components.admin.crud.product.plural'),
    primaryKey: 'id',
    autoloads: autoloads.self ?? false,
    columns: CrudColumns($component),
    relations: CrudRelations($component, autoloads, depth),
    api: api ? CrudApi($component) : undefined,
    actions: api ? CrudActions($component) : undefined,
  }
}
