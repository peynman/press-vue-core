import { bindingRepo, getCreateFormBindings, getFormSubmitAction, getFormValidationsAlert } from '../../../utils/crudForm'

export default function ($component) {
  return {
    method: 'POST',
    url: '/api/users',
    permission: 'users.store',
    bindings: [
      ...getCreateFormBindings([
        bindingRepo(
          'rolesRepo',
          'isRolesLoading',
          'repos/fetchRoles',
          'repos/isRolesLoading',
          item => ({
            text: item.title,
            value: item.id,
          }),
        ),
        bindingRepo(
          'domainsRepo',
          'isDomainsLoading',
          'repos/fetchDomains',
          'repos/isDomainsLoading',
          item => ({
            text: item.domain,
            value: item.id,
          }),
        ),
      ]),
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
            label: $component.$t('components.admin.crud.labels.username'),
          },
        },
      },
      {
        key: 'password',
        rules: [
          $component.getRequiredRule(),
        ],
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.password'),
          },
        },
      },
      {
        key: 'password_confirmation',
        rules: [
          $component.getRequiredRule(),
        ],
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.password_confirmation'),
          },
        },
      },
      {
        key: 'roles',
        rules: [
          $component.getRequiredRule(),
        ],
        component: {
          tag: 'VAutocomplete',
          props: {
            items: '$(bindings.rolesRepo)',
            loading: '$(bindings.isRolesLoading)',
            label: $component.$t('components.admin.crud.labels.roles'),
            multiple: true,
            clearable: true,
            chips: true,
            deletableChips: true,
          },
        },
      },
      {
        key: 'domains',
        rules: [
          $component.getRequiredRule(),
        ],
        component: {
          tag: 'DomainPicker',
          props: {
            domains: '$(bindings.domainsRepo)',
            loading: '$(bindings.isDomainsLoading)',
            label: $component.$t('components.admin.crud.labels.domains'),
          },
          factory: () => ({
            component: $component.$press?.importAsyncComponent('DomainPicker'),
          }),
        },
      },
      {
        key: 'phones',
        rules: [],
        component: {
          tag: 'PhoneNumberInput',
          props: {
            label: $component.$t('components.admin.crud.labels.phones'),
          },
          factory: () => ({
            component: $component.$press?.importAsyncComponent('PhoneNumberInput'),
          }),
        },
      },
      {
        key: 'addresses',
        rules: [],
        component: {
          tag: 'AddressInput',
          props: {
            label: $component.$t('components.admin.crud.labels.addresses'),
          },
          factory: () => ({
            component: $component.$press?.importAsyncComponent('AddressInput'),
          }),
        },
      },
    ],
    actions: [
      getFormSubmitAction($component, values => {
        return $component.$store.dispatch('apiCall', {
          method: 'POST',
          url: '/api/users',
          body: {
            name: values.name,
            password: values.password,
            password_confirmation: values.password_confirmation,
            roles: values.roles,
            phones: values.phones,
            addresses: values.addresses,
            domains: values.domains,
          },
        })
      }),
    ],
  }
}
