import CrudColumns from './columns'
import CrudRelations from './relations'
import CrudApi from './Api'
import CrudActions from './Actions'

export default function ($component, name = undefined, autoloads = {}, depth = 5, api = true) {
  return {
    name: name || 'filters',
    singular: $component.$t('components.admin.crud.filter.singular'),
    plural: $component.$t('components.admin.crud.filter.plural'),
    primaryKey: 'id',
    autoloads: autoloads.self ?? false,
    columns: CrudColumns($component),
    relations: CrudRelations($component, autoloads, depth),
    actions: api ? CrudActions($component) : undefined,
    api: api ? CrudApi($component) : undefined,
  }
}
