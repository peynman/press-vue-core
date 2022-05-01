import { createCrudRelations, createCrudRelationDictionaryEntry, createAuthorAutoLoader } from '../../utils/crudRelation'

export default ($component, autoloads, depth) => createCrudRelations(
  $component,
  {
    author: createAuthorAutoLoader($component, autoloads),
    ...createCrudRelationDictionaryEntry('sms_gateway', () => import('../SmsGateway'), '*', autoloads, {
      author: false,
    }),
  },
  depth,
  false,
)
