import { getCreateFormBindings, getFormValidationsAlert } from '../../../utils/crudForm'

export default function ($component) {
  return {
    method: 'POST',
    to: '/admin/file-upload/create',
    permission: 'file-upload.upload',
    title: $component.$t('components.admin.crud.fileUpload.sendTitle'),
    bindings: [
      {
        name: 'data',
        type: 'default',
        default: {},
      },
      ...getCreateFormBindings(),
    ],
    autoValidate: true,
    form: [
      getFormValidationsAlert($component),
      {
        key: 'file',
        rules: [
          $component.getRequiredRule(),
          $component.getEmailRule(),
        ],
        component: {
          tag: 'FileUploadInput',
          props: {
            label: $component.$t('components.admin.crud.labels.file'),
          },
          factory: () => $component.$press?.importAsyncComponent('FileUploadInput'),
        },
      },
    ],
    actions: [
    ],
  }
}
