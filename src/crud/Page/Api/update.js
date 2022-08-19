import { getEditFormBindings, getFormValidationsAlert, getFormSubmitAction } from '../../../utils/crudForm'
import getCustomCodesElements from './FormTabs/customCodes'
import getMainElements from './FormTabs/main'
import getOptionsElements from './FormTabs/options'
import getReportsElements from './FormTabs/reports'
import getSitemapElements from './FormTabs/sitemap'

export default function ($component) {
  return {
    method: 'POST',
    to: '/admin/pages/{id}',
    permission: 'pages.update',
    bindings: [
      {
        name: 'body',
        type: 'default',
        default: {},
      },
      {
        name: 'options',
        type: 'default',
        default: {},
      },
      ...getEditFormBindings(),
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
      {
        value: 'reports',
        text: $component.$t('components.admin.crud.tabs.reports'),
      },
      {
        value: 'sitemap',
        text: $component.$t('components.admin.crud.tabs.sitemap'),
      },
      {
        value: 'customCodes',
        text: $component.$t('components.admin.crud.tabs.customCodes'),
      },
    ],
    form: [
      getFormValidationsAlert($component),
      ...getMainElements($component),
      ...getOptionsElements($component),
      ...getReportsElements($component),
      ...getSitemapElements($component),
      ...getCustomCodesElements($component),
    ],
    actions: [
      getFormSubmitAction($component, values => {
        return $component.$store.dispatch('apiCall', {
          method: 'PUT',
          url: `/api/pages/${values.id}`,
          body: {
            body: values.body,
            options: values.options,
            slug: values.slug,
            name: values.name,
            publish_at: values.publish_at,
            unpublish_at: values.unpublish_at,
            zorder: values.zorder,
          },
        })
      }),
    ],
  }
}
