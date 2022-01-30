import { getSeparatedDateRanges, timestampFilter } from '../../../utils/crudForm'

export default function ($component) {
  return {
    method: 'POST',
    url: '/api/filters/query',
    permission: 'filters.query',
    autoValidate: true,
    form: [
      timestampFilter('createdTimestamp', $component.$t('components.admin.crud.filters.createdTimestamp')),
      timestampFilter('deletedTimestamp', $component.$t('components.admin.crud.filters.updatedTimestamp')),
      timestampFilter('updatedTimestamp', $component.$t('components.admin.crud.filters.deletedTimestamp')),
      {
        key: 'type',
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.type'),
          },
        },
      },
    ],
    getProcessedFilters (filters) {
      return {
        ...filters,
        ...getSeparatedDateRanges(filters),
      }
    },
  }
}
