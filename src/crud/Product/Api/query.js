import { bindingRepo, getCreateFormBindings, getFormValidationsAlert, getSeparatedDateRanges, timestampFilter } from '../../../utils/crudForm'

export default function ($component) {
  return {
    method: 'POST',
    url: '/api/products/query',
    permission: 'products.query',
    autoValidate: true,
    bindings: [
      ...getCreateFormBindings([
        bindingRepo(
          'productTypesRepo',
          'isProductTypesLoading',
          'repos/fetchProductTypes',
          'repos/isProductTypesLoading',
          t => ({
            text: `${t.data?.title} (${t.name})`,
            value: t.id,
          })
        ),
      ]),
    ],
    form: [
      getFormValidationsAlert($component),
      timestampFilter('createdTimestamp', $component.$t('components.admin.crud.filters.createdTimestamp')),
      timestampFilter('updatedTimestamp', $component.$t('components.admin.crud.filters.updatedTimestamp')),
      timestampFilter('deletedTimestamp', $component.$t('components.admin.crud.filters.deletedTimestamp')),
      {
        key: 'categories',
        component: {
          tag: 'ProductCategoriesInput',
          props: {
            label: $component.$t('components.admin.crud.filters.productCategories'),
          },
          factory: () => ({
            component: $component.$press?.importAsyncComponent('ProductCategoriesInput'),
          }),
        },
      },
      {
        key: 'types',
        component: {
          tag: 'AutocompleteInput',
          props: {
            label: $component.$t('components.admin.crud.filters.productTypes'),
            items: '$(bindings.productTypesRepo)',
            loading: '$(bindings.isProductTypesLoading)',
            multiple: true,
            chips: true,
            deletableChips: true,
            smallChips: true,
          },
          factory: () => ({
            component: $component.$press?.importAsyncComponent('AutocompleteInput'),
          }),
        },
      },
    ],
    getProcessedFilters (filters) {
      return {
        categories: filters.categories?.map(c => c.id) ?? [],
        types: filters.types ?? [],
        ...getSeparatedDateRanges(filters),
      }
    },
  }
}
