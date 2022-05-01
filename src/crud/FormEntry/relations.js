import { createCrudRelations, createAuthorAutoLoader, createCrudRelationDictionaryEntry } from '../../utils/crudRelation'

export default ($component, autoloads, depth) => createCrudRelations(
  $component,
  {
    user: createAuthorAutoLoader($component, autoloads, 'user'),
    ...createCrudRelationDictionaryEntry('form', () => import('../Form'), '*', autoloads, {
      author: false,
    }),
  },
  depth,
  false,
)
