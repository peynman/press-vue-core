import { getSeparatedDateRanges, timestampFilter } from '../../../utils/crudForm'
import Status from '../status'
import Flags from '../flags'
import ProductCrud from '../../Product'
import { crudLoaderFunction } from '../../../mixins/CrudTable'

export default function ($component) {
  return {
    method: 'POST',
    url: '/api/carts/query',
    permission: 'carts.query',
    form: [
      timestampFilter('purchasedTimestamp', $component.$t('components.admin.crud.filters.purchasedTimestamp')),
      timestampFilter('createdTimestamp', $component.$t('components.admin.crud.filters.createdTimestamp')),
      timestampFilter('deletedTimestamp', $component.$t('components.admin.crud.filters.updatedTimestamp')),
      timestampFilter('updatedTimestamp', $component.$t('components.admin.crud.filters.deletedTimestamp')),
      {
        key: 'status',
        component: {
          tag: 'VSelect',
          props: {
            label: $component.$t('components.admin.crud.labels.status'),
            items: Status($component),
            clearable: true,
          },
        },
      },
      {
        key: 'products',
        component: {
          tag: 'VCrudObjectPicker',
          props: {
            crud: ProductCrud($component, 'product', 0),
            crudLoaderFunction: crudLoaderFunction($component),
            decorateLabel: '#:id :name',
            decorateMap: {
              id: 'id',
              name: 'name',
            },
            label: $component.$t('components.admin.crud.labels.cartProducts'),
            hint: $component.$t('components.admin.crud.hints.cartProducts'),
            multiple: true,
            chips: true,
            deletableChips: true,
            smallChips: true,
          },
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
    getProcessedFilters (filters) {
      return {
        ...filters,
        ...getSeparatedDateRanges(filters, [
          'createdTimestamp', 'deletedTimestamp', 'updatedTimestamp', 'purchasedTimestamp',
        ]),
      }
    },
  }
}
