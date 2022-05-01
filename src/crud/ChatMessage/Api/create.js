import { getCreateFormBindings, getFormSubmitAction, getFormValidationsAlert } from '../../../utils/crudForm'
import ChatRoomCrud from '../../ChatRoom'
import { crudLoaderFunction } from '../../../mixins/CrudTable'

export default function ($component) {
  return {
    method: 'POST',
    to: '/admin/chat-messages/create',
    permission: 'chat-messages.store',
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
        key: 'room_id',
        rules: [
          $component.getRequiredRule(),
          $component.getNumericRule(),
        ],
        component: {
          tag: 'VCrudObjectPicker',
          props: {
            crud: ChatRoomCrud($component, 'room', {
              author: '*',
              most_recent: false,
            }, 2),
            crudLoaderFunction: crudLoaderFunction($component),
            valueSettings: {
              perPage: 10,
              loadRelations: {
                author: '*',
                most_recent: false,
              },
            },
            decorateLabel: '#:id :author (#:authorId)',
            decorateMap: {
              id: 'id',
              author: 'author.name',
              authorId: 'author.id',
            },
            label: $component.$t('components.admin.crud.labels.targetRoomId'),
            hint: $component.$t('components.admin.crud.hints.targetRoomId'),
            chips: true,
            smallChips: true,
          },
        },
      },
      {
        key: 'message',
        rules: [
          $component.getRequiredRule(),
        ],
        component: {
          tag: 'VTextarea',
          props: {
            label: $component.$t('components.admin.crud.labels.message'),
          },
        },
      },
    ],
    actions: [
      getFormSubmitAction($component, values => {
        return $component.$store.dispatch('apiCall', {
          method: 'POST',
          url: '/api/chat-messages',
          body: {
          },
        })
      }),
    ],
  }
}
