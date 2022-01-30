import CrudColumns from './columns'
import CrudApi from './Api'
import CrudRelations from './relations'

export default function ($component, name = undefined, autoloads = {}, depth = 5, api = true) {
  return {
    name: name || 'roles',
    singular: $component.$t('components.admin.crud.role.singular'),
    plural: $component.$t('components.admin.crud.role.plural'),
    primaryKey: 'id',
    columns: CrudColumns($component),
    relations: CrudRelations($component, autoloads, depth),
    autoloads: autoloads.self ?? false,
    api: api ? CrudApi($component) : undefined,
    onBeforeAdminEdit (object) {
      object.permissions = object.permissions?.map(p => p.id)
      return object
    },
  }
}
