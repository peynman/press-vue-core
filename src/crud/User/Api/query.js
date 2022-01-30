import { getSeparatedDateRanges, timestampFilter } from '../../../utils/crudForm'

export default function ($component) {
  return {
    method: 'POST',
    url: '/api/users/query',
    permission: 'users.query',
    autoValidate: true,
    form: [
      timestampFilter('createdTimestamp', $component.$t('components.admin.crud.filters.createdTimestamp')),
      timestampFilter('deletedTimestamp', $component.$t('components.admin.crud.filters.updatedTimestamp')),
      timestampFilter('updatedTimestamp', $component.$t('components.admin.crud.filters.deletedTimestamp')),
    ],
    getProcessedFilters (filters) {
      return {
        ...filters,
        ...getSeparatedDateRanges(filters),
      }
    },
  }
}
