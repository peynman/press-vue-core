import { createCrudRelations, createAuthorAutoLoader } from '../../utils/crudRelation'

export default ($component, autoloads, depth) => createCrudRelations(
  $component,
  {
    uploader: createAuthorAutoLoader($component, autoloads, 'uploader'),
  },
  depth,
  false,
)
