import { getEditFormBindings, getFormSubmitAction, getFormValidationsAlert } from '../../../utils/crudForm'
import Flags from '../flags'
import Gateways from '../Gateways'

export default function ($component) {
  const AvailableGateways = Gateways($component)
  return {
    method: 'POST',
    to: '/admin/bank-gateways/{id}',
    permission: 'bank-gateways.update',
    bindings: [
      {
        name: 'data',
        type: 'default',
        default: {},
      },
      ...getEditFormBindings(),
    ],
    autoValidate: true,
    form: [
      getFormValidationsAlert($component),
      {
        key: 'name',
        rules: [
          $component.getRequiredRule(),
        ],
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.name'),
          },
        },
      },
      {
        key: 'type',
        rules: [
          $component.getRequiredRule(),
        ],
        component: {
          tag: 'VSelect',
          props: {
            label: $component.$t('components.admin.crud.labels.type'),
            items: AvailableGateways,
            returnObject: true,
          },
        },
      },
      {
        key: 'data',
        component: {
          tag: 'SchemaFormInput',
          props: {
            label: $component.$t('components.admin.crud.labels.typeSettings'),
            formSource: '$(bindings.type)',
          },
          factory: () => ({
            component: $component.$press?.importAsyncComponent('SchemaFormInput'),
          }),
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
          method: 'PUT',
          url: `/api/bank-gateways/${values.id}`,
          body: {
            name: values.name,
            type: values.type?.value,
            data: values.data,
            flags: values.flags ?? 0,
          },
        })
      }),
    ],
  }
}
