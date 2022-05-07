import { createCrudRelations, createAuthorAutoLoader, createCrudRelationDictionaryEntry } from '../../utils/crudRelation'

export default ($component, autoloads, depth) => createCrudRelations(
  $component,
  {
    // User
    user: createAuthorAutoLoader($component, autoloads, 'user'),

    // Form
    ...createCrudRelationDictionaryEntry('form', () => import('../Form'), '*', autoloads, {
      author: false,
    }),
  },
  depth,
  false,
)
