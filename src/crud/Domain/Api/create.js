import { getCreateFormBindings, getFormSubmitAction, getFormValidationsAlert } from '../../../utils/crudForm'

export default function ($component) {
  return {
    method: 'POST',
    url: '/admin/domains/create',
    permission: 'domains.store',
    bindings: [
      ...getCreateFormBindings(),
    ],
    autoValidate: true,
    formTabs: [
      {
        value: 'general',
        text: $component.$t('components.admin.crud.tabs.general'),
      },
      {
        value: 'options',
        text: $component.$t('components.admin.crud.tabs.options'),
      },
    ],
    form: [
      getFormValidationsAlert($component),
      {
        key: 'domain',
        rules: [
          $component.getRequiredRule(),
        ],
        tab: 'general',
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
        tab: 'options',
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
        tab: 'options',
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
        tab: 'options',
        component: {
          tag: 'VJsonEditor',
          props: {
            label: $component.$t('components.admin.crud.labels.subdomains'),
            startType: 'array',
            canChangeRootType: false,
            hideDefaultTypes: true,
            extraTypes: [
              {
                value: 'domain',
                text: $component.$t('components.admin.crud.labels.domain'),
                form: [
                  {
                    tag: 'VTextField',
                    'v-model': 'bindings.domain',
                    props: {
                      label: $component.$t('components.admin.crud.labels.domain'),
                    },
                  },
                ],
                genNewItem (values) {
                  return values.domain
                },
              },
            ],
          },
        },
      },
    ],
    actions: [
      getFormSubmitAction($component, values => {
        return $component.$store.dispatch('apiCall', {
          method: 'POST',
          url: '/api/domains',
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
