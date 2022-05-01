import { getCreateFormBindings, getFormSubmitAction, getFormValidationsAlert } from '../../../utils/crudForm'
import Flags from '../flags'
import UserCrud from '../../User'
import { crudLoaderFunction } from '../../../mixins/CrudTable'

export default function ($component) {
  return {
    method: 'POST',
    to: '/admin/chat-rooms/create',
    permission: 'chat-rooms.store',
    bindings: [
      {
        name: 'amount',
        type: 'default',
        default: {},
      },
      {
        name: 'data',
        type: 'default',
        default: {},
      },
      ...getCreateFormBindings(),
    ],
    autoValidate: true,
    form: [
      getFormValidationsAlert($component),
      {
        key: 'user_id',
        rules: [
          $component.getRequiredRule(),
          $component.getNumericRule(),
        ],
        component: {
          tag: 'VCrudObjectPicker',
          props: {
            crud: UserCrud($component, 'user', 0),
            crudLoaderFunction: crudLoaderFunction($component),
            decorateLabel: '#:id :name',
            decorateMap: {
              id: 'id',
              name: 'name',
            },
            label: $component.$t('components.admin.crud.labels.targetUserId'),
            hint: $component.$t('components.admin.crud.hints.targetUserId'),
            chips: true,
            smallChips: true,
            multiple: true,
          },
        },
      },
      {
        key: 'flags',
        component: {
          tag: 'BitwiseFlagsInput',
          props: {
            label: $component.$t('components.admin.crud.labels.flags'),
            items: Flags($component),
          },
          factory: () => ({
            component: $component.$press?.importAsyncComponent('BitwiseFlagsInput'),
          }),
        },
      },
    ],
    actions: [
      getFormSubmitAction($component, values => {
        return $component.$store.dispatch('apiCall', {
          method: 'POST',
          url: '/api/chat-rooms',
          body: {
            flags: values.flags,
          },
        })
      }),
    ],
  }
}
