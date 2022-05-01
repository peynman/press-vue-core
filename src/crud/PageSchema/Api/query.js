import { getCreateFormBindings, getFormValidatableAction, getFormValidationsAlert, timestampFilter } from '../../../utils/crudForm'

export default function ($component) {
  return {
    method: 'POST',
    url: '/api/page-schemas/query',
    permission: 'page-schemas.query',
    autoValidate: true,
    bindings: [
      ...getCreateFormBindings([
      ]),
    ],
    form: [
      getFormValidationsAlert($component),
      timestampFilter('createdTimestamp', $component.$t('components.admin.crud.filters.createdTimestamp')),
      timestampFilter('deletedTimestamp', $component.$t('components.admin.crud.filters.updatedTimestamp')),
      timestampFilter('updatedTimestamp', $component.$t('components.admin.crud.filters.deletedTimestamp')),
    ],
    actions: [
      getFormValidatableAction(
        $component.$t('components.admin.crud.labels.filter'),
        {
          color: 'primary',
        },
        values => {
          console.log(values)
          return Promise.resolve({})
        }
      ),
    ],
  }
}
