import { createCrudRelations, createAuthorAutoLoader, createCrudRelationDictionaryEntry } from '../../utils/crudRelation'

export default ($component, autoloads, depth) => createCrudRelations(
  $component,
  {
    customer: createAuthorAutoLoader(autoloads, 'customer', '*', {
      addresses: '*',
    }),
    ...createCrudRelationDictionaryEntry('products', () => import('../Product'), '*', autoloads, {
      author: false,
      categories: false,
      types: false,
    }),
  },
  depth,
  false,
)
