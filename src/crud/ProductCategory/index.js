import CrudColumns from './columns'
import CrudRelations from './relations'
import CrudApi from './Api'

export default function ($component, name = undefined, autoloads = {}, depth = 5, api = true) {
  return {
    name: name || 'product-categories',
    singular: $component.$t('components.admin.crud.productCategory.singular'),
    plural: $component.$t('components.admin.crud.productCategory.plural'),
    primaryKey: 'id',
    autoloads: autoloads.self ?? false,
    columns: CrudColumns($component),
    relations: CrudRelations($component, autoloads, depth),
    api: api ? CrudApi($component) : undefined,
  }
}
