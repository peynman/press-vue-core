import { createCrudRelations, createAuthorAutoLoader, createCrudRelationDictionaryEntry } from '../../utils/crudRelation'

export default ($component, autoloads, depth) => createCrudRelations(
  $component,
  {
    // Author
    author: createAuthorAutoLoader($component, autoloads),

    // Categories
    ...createCrudRelationDictionaryEntry('categories', () => import('../ProductCategory'), '*', autoloads, {
      author: false,
    }),

    // Types
    ...createCrudRelationDictionaryEntry('types', () => import('../ProductType'), '*', autoloads, {
      author: false,
    }),
  },
  depth,
  false,
)
