import { getFormSubmitAction, getFormValidationsAlert } from '../../../utils/crudForm'
import { makeSelectFromTranslationKeys } from '../../../utils/schemaHelpers'

export default function ($component) {
  return {
    name: 'modify-category',
    title: $component.$t('components.admin.crud.product.actions.modifyCategory.title'),
    batched: true,
    api: {
      method: 'POST',
      permission: 'products.update',
      autoValidate: true,
      title: $component.$t('components.admin.crud.product.actions.modifyCategory.hint'),
      form: [
        getFormValidationsAlert($component),
        {
          key: 'mode',
          rules: [
            $component.getRequiredRule(),
          ],
          component: {
            tag: 'VSelect',
            props: {
              label: $component.$t('components.admin.crud.product.actions.modifyCategory.mode'),
              items: makeSelectFromTranslationKeys($component.$t('components.admin.crud.product.actions.modifyCategory.modes')),
            },
          },
        },
        {
          key: 'categories',
          rules: [
            $component.getRequiredRule(),
          ],
          component: {
            tag: 'ProductCategoriesInput',
            props: {
              label: $component.$t('components.admin.crud.labels.categories'),
            },
            factory: () => ({
              component: $component.$press?.importAsyncComponent('ProductCategoriesInput'),
            }),
          },
        },
      ],
      actions: [
        getFormSubmitAction($component, values => {
          return $component.$store.dispatch('product/modifyCategories', {
            categories: values.categories?.map(c => c.id) ?? [],
            productIds: values.selections?.map(p => p.id) ?? [],
            mode: values.mode,
          })
        }),
      ],
    },
  }
}
