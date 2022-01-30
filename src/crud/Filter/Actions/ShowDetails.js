import { getCrudJsonViewAction } from '../../../utils/crudForm'

export default function ($component) {
  return getCrudJsonViewAction($component.$t('components.admin.crud.actions.showDetails'))
}
