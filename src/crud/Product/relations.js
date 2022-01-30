import { createCrudRelations, createAuthorAutoLoader, createCrudRelationDictionaryEntry } from '../../utils/crudRelation'

export default ($component, autoloads, depth) => createCrudRelations(
  $component,
  {
    author: createAuthorAutoLoader(autoloads),
    ...createCrudRelationDictionaryEntry('categories', () => import('../ProductCategory'), '*', autoloads, {
      author: false,
    }),
    ...createCrudRelationDictionaryEntry('types', () => import('../ProductType'), '*', autoloads, {
      author: false,
    }),
  },
  depth,
  false,
)
