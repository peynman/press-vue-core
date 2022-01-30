import { createCrudRelations, createAuthorAutoLoader, createCrudRelationDictionaryEntry } from '../../utils/crudRelation'

export default ($component, autoloads, depth) => createCrudRelations(
  $component,
  {
    author: createAuthorAutoLoader(autoloads),
    ...createCrudRelationDictionaryEntry('room', () => import('../ChatRoom'), false, autoloads),
  },
  depth,
  false,
)
