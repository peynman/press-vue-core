import {
  bindingRepo,
  getCreateFormBindings,
  getFormResetAction,
  getFormSpacerAction,
  getFormSubmitAction,
  getFormValidationsAlert,
} from '../../../utils/crudForm'

export default function ($component) {
  return {
    method: 'POST',
    url: '/api/roles',
    permission: 'roles.store',
    bindings: [
      ...getCreateFormBindings([
        bindingRepo(
          'permissionsRepo',
          'isPermissionsLoading',
          'repos/fetchPermissions',
          'repos/isPermissionsLoading',
          perm => ({
            text: perm.name + ' -> ' + perm.verb,
            value: perm.id,
          })
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
            label: $component.$t('components.admin.crud.labels.name'),
            hint: $component.$t('components.admin.crud.hints.name'),
          },
        },
      },
      {
        key: 'title',
        rules: [
          $component.getRequiredRule(),
        ],
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.title'),
          },
        },
      },
      {
        key: 'priority',
        rules: [
          $component.getRequiredRule(),
        ],
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.priority'),
          },
        },
      },
      {
        key: 'permissions',
        component: {
          tag: 'AutocompleteInput',
          props: {
            label: $component.$t('components.admin.crud.labels.permissions'),
            multiple: true,
            chips: true,
            'small-chips': true,
            'deletable-chips': true,
            items: '$(bindings.permissionsRepo)',
            loading: '$(bindings.isPermissionsLoading)',
          },
          factory: () => ({
            component: $component.$press?.importAsyncComponent('AutocompleteInput'),
          }),
        },
      },
    ],
    actions: [
      getFormSubmitAction($component, values => {
        return $component.$store.dispatch('apiCall', {
          method: 'POST',
          url: '/api/roles',
          body: {
            name: values.name,
            title: values.title,
            priority: values.priority,
            permissions: values.permissions,
          },
        })
      }),
      getFormSpacerAction(),
      getFormResetAction($component),
    ],
  }
}
