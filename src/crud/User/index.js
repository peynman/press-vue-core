import CrudColumns from './columns'
import CrudRelations from './relations'
import CrudApi from './Api'
import CrudActions from './Actions'
import CrudReports from './Reports'

export default function ($component, name = undefined, autoloads = {}, depth = 5, api = true) {
  return {
    name: name || 'users',
    singular: $component.$t('components.admin.crud.user.singular'),
    plural: $component.$t('components.admin.crud.user.plural'),
    primaryKey: 'id',
    autoloads: autoloads.self ?? false,
    columns: CrudColumns($component),
    relations: CrudRelations($component, autoloads, depth),
    api: api ? CrudApi($component) : undefined,
    actions: api ? CrudActions($component) : undefined,
    reports: api ? CrudReports($component) : undefined,
  }
}
