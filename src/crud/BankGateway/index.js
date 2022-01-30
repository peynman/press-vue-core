import CrudColumns from './columns'
import CrudRelations from './relations'
import CrudApi from './Api'
import Gateways from './Gateways'

export default function ($component, name = undefined, autoloads = {}, depth = 5, api = true) {
  return {
    name: name || 'bank-gateways',
    singular: $component.$t('components.admin.crud.bankGateway.singular'),
    plural: $component.$t('components.admin.crud.bankGateway.plural'),
    primaryKey: 'id',
    autoloads: autoloads.self ?? false,
    columns: CrudColumns($component),
    relations: CrudRelations($component, autoloads, depth),
    api: api ? CrudApi($component) : undefined,
    onBeforeAdminEdit (obj) {
      const types = Gateways($component)
      obj.type = types.find(t => t.value === obj.type)
      return obj
    },
  }
}
