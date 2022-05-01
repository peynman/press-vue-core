import { createCrudRelations, createAuthorAutoLoader } from '../../utils/crudRelation'

export default ($component, autoloads, depth) => createCrudRelations(
  $component,
  {
    author: createAuthorAutoLoader($component, autoloads),
  },
  depth,
  false,
)
