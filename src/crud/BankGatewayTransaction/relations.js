import { createCrudRelations, createAuthorAutoLoader } from '../../utils/crudRelation'

export default ($component, autoloads, depth) => createCrudRelations(
  $component,
  {
    customer: createAuthorAutoLoader($component, autoloads, 'customer'),
  },
  depth,
  false,
)
