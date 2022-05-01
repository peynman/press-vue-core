import { getEditFormBindings, getFormSubmitAction, getFormValidationsAlert } from '../../../utils/crudForm'

export default function ($component) {
  return {
    method: 'POST',
    url: '/admin/domains/{id}',
    permission: 'domains.update',
    bindings: [
      ...getEditFormBindings(),
    ],
    autoValidate: true,
    form: [
      getFormValidationsAlert($component),
      {
        key: 'domain',
        rules: [
          $component.getRequiredRule(),
        ],
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.domain'),
            hint: $component.$t('components.admin.crud.hints.domain'),
          },
        },
      },
      {
        key: 'ips',
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.ips'),
            hint: $component.$t('components.admin.crud.hints.ips'),
          },
        },
      },
      {
        key: 'nameservers',
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.nameservers'),
            hint: $component.$t('components.admin.crud.hints.nameservers'),
          },
        },
      },
      {
        key: 'subdomains',
        component: {
          tag: 'VJsonEditor',
          props: {
            label: $component.$t('components.admin.crud.labels.subdomains'),
            startType: 'array',
            canChangeRootType: false,
          },
        },
      },
    ],
    actions: [
      getFormSubmitAction($component, values => {
        return $component.$store.dispatch('apiCall', {
          method: 'PUT',
          url: `/api/domains/${values.id}`,
          body: {
            domain: values.domain,
            subdomains: values.subdomains,
            ips: values.ips,
            targetUserId: values.targetUserId,
            nameservers: values.nameservers,
          },
        })
      }),
    ],
  }
}
