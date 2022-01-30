import { createCrudRelations, createAuthorAutoLoader, createCrudRelationDictionaryEntry } from '../../utils/crudRelation'

export default ($component, autoloads, depth) => createCrudRelations(
  $component,
  {
    author: createAuthorAutoLoader(autoloads),
    ...createCrudRelationDictionaryEntry('unseen_messages_count', null, '*', autoloads, {}),
    ...createCrudRelationDictionaryEntry('messages_count', null, '*', autoloads, {}),
    ...createCrudRelationDictionaryEntry('participants_count', null, '*', autoloads, {}),
  },
  depth,
  false,
)
