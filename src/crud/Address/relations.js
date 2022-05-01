import { createCrudRelations, createAuthorAutoLoader } from '../../utils/crudRelation'

export default ($component, autoloads, depth) => createCrudRelations(
  $component,
  {
    user: createAuthorAutoLoader($component, autoloads, 'user'),
  },
  depth,
  false,
)
