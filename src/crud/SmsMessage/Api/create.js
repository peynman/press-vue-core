import { bindingRepo, getCreateFormBindings, getFormSubmitAction, getFormValidationsAlert, timestampFilter } from '../../../utils/crudForm'
import Flags from '../flags'
import Status from '../status'

export default function ($component) {
  return {
    method: 'POST',
    to: '/admin/sms-messages/create',
    permission: 'sms-messages.store',
    bindings: [
      {
        name: 'data',
        type: 'default',
        default: {},
      },
      ...getCreateFormBindings([
        bindingRepo(
          'smsGatewaysRepo',
          'isSmsGatewaysLoading',
          'repos/fetchSmsGateways',
          'repos/isSmsGatewaysLoading',
          item => ({
            text: item.name,
            value: item.id,
          })
        ),
      ]),
    ],
    autoValidate: true,
    form: [
      getFormValidationsAlert($component),
      {
        key: 'sms_gateway_id',
        rules: [
          $component.getRequiredRule(),
        ],
        component: {
          tag: 'VSelect',
          props: {
            label: $component.$t('components.admin.crud.labels.gateway'),
            items: '$(bindings.smsGatewaysRepo)',
            loading: '$(bindings.isSmsGatewaysLoading)',
          },
        },
      },
      {
        key: 'from',
        rules: [
          $component.getRequiredRule(),
        ],
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.from'),
          },
        },
      },
      {
        key: 'to',
        rules: [
          $component.getRequiredRule(),
        ],
        component: {
          tag: 'VTextField',
          props: {
            type: 'number',
            label: $component.$t('components.admin.crud.labels.to'),
          },
        },
      },
      {
        key: 'message',
        rules: [
          $component.getRequiredRule(),
        ],
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.message'),
          },
        },
      },
      {
        key: 'status',
        rules: [
          $component.getRequiredRule(),
        ],
        component: {
          tag: 'VSelect',
          props: {
            label: $component.$t('components.admin.crud.labels.status'),
            items: Status($component),
          },
        },
      },
      timestampFilter('send_at', $component.$t('components.admin.crud.labels.sendAt'), false),
      timestampFilter('sent_at', $component.$t('components.admin.crud.labels.sentAt'), false),
      timestampFilter('received_at', $component.$t('components.admin.crud.labels.receivedAt'), false),
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
          url: '/api/sms-messages',
          body: {
          },
        })
      }),
    ],
  }
}
