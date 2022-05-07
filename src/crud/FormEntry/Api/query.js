import { bindingRepo, getCreateFormBindings, getFormValidationsAlert, getSeparatedDateRanges, timestampFilter } from '../../../utils/crudForm'

export default function ($component) {
  return {
    method: 'POST',
    url: '/api/form-entries/query',
    permission: 'form-entries.query',
    autoValidate: true,
    bindings: [
      ...getCreateFormBindings([
        bindingRepo(
          'formsRepo',
          'isFormsLoading',
          'repos/fetchForms',
          'repos/isFormsLoading',
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
        key: 'form_id',
        component: {
          tag: 'AutocompleteInput',
          props: {
            label: $component.$t('components.admin.crud.filters.form_id'),
            items: '$(bindings.formsRepo)',
            loading: '$(bindings.isFormsLoading)',
            multiple: false,
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
        form_id: filters.form_id ?? [],
        ...getSeparatedDateRanges(filters),
      }
    },
  }
}
