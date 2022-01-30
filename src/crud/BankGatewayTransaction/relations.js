import { createCrudRelations, createAuthorAutoLoader } from '../../utils/crudRelation'

export default ($component, autoloads, depth) => createCrudRelations(
  $component,
  {
    customer: createAuthorAutoLoader(autoloads, 'customer'),
  },
  depth,
  false,
)
