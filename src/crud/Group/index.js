import CrudColumns from './columns'
import CrudRelations from './relations'
import CrudApi from './Api'

export default function ($component, name = undefined, autoloads = {}, depth = 5, api = true) {
  return {
    name: name || 'groups',
    singular: $component.$t('components.admin.crud.group.singular'),
    plural: $component.$t('components.admin.crud.group.plural'),
    primaryKey: 'id',
    autoloads: autoloads.self ?? false,
    columns: CrudColumns($component),
    relations: CrudRelations($component, autoloads, depth),
    api: api ? CrudApi($component) : undefined,
  }
}
