import { createCrudRelations, createCrudRelationDictionaryEntry } from '../../utils/crudRelation'

export default ($component, autoloads, depth) => createCrudRelations(
  $component,
  {
    ...createCrudRelationDictionaryEntry('roles', () => import('../Role'), '*', autoloads, {
      author: false,
    }),
    ...createCrudRelationDictionaryEntry('domains', () => import('../Domain'), '*', autoloads, {
      author: false,
    }),
    ...createCrudRelationDictionaryEntry('groups', () => import('../Group'), '*', autoloads, {
      author: false,
    }),
    ...createCrudRelationDictionaryEntry('emails', () => import('../Email'), false, autoloads, {
      user: false,
    }),
    ...createCrudRelationDictionaryEntry('phones', () => import('../PhoneNumber'), false, autoloads, {
      user: false,
    }),
    ...createCrudRelationDictionaryEntry('addresses', () => import('../Address'), false, autoloads, {
      user: false,
    }),
    ...createCrudRelationDictionaryEntry('form_entries', () => import('../FormEntry'), false, autoloads, {
      user: false,
    }),
    ...createCrudRelationDictionaryEntry('form_profile_default', () => import('../FormEntry'), '*', autoloads, {
      user: false,
      form: false,
    }),
    ...createCrudRelationDictionaryEntry('wallet_balance', () => import('../WalletTransaction'), '*', autoloads, {
      customer: false,
    }),
  },
  depth,
  false,
)
