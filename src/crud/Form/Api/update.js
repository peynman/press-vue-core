import { getFormValidationsAlert, getFormSubmitAction, bindingRepo, getEditFormBindings } from '../../../utils/crudForm'
import { imageUploadProperty } from '../../../utils/schemaHelpers'

export default function ($component) {
  return {
    method: 'POST',
    url: '/api/forms/{id}',
    permission: 'forms.update',
    bindings: [
      {
        name: 'data',
        type: 'default',
        default: {},
      },
      ...getEditFormBindings([
        bindingRepo(
          'rolesRepo',
          'isRolesLoading',
          'repos/fetchRoles',
          'repos/isRolesLoading',
          role => ({
            text: role.title,
            value: role.id,
          })
        ),
      ]),
    ],
    autoValidate: true,
    form: [
      getFormValidationsAlert($component),
      {
        key: 'name',
        rules: [
          $component.getRequiredRule(),
        ],
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.name'),
            hint: $component.$t('components.admin.crud.hints.name'),
          },
        },
      },
      {
        key: 'data.title',
        rules: [
          $component.getRequiredRule(),
        ],
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.title'),
          },
        },
      },
      {
        key: 'data.requiredRoles',
        component: {
          tag: 'VAutocomplete',
          props: {
            label: $component.$t('components.admin.crud.labels.has_role'),
            items: '$(bindings.rolesRepo)',
            loading: '$(bindings.isRolesLoading)',
            multiple: true,
            clearable: true,
            chips: true,
            deletableChips: true,
          },
        },
      },
      {
        key: 'data.forbiddenRoles',
        component: {
          tag: 'VAutocomplete',
          props: {
            label: $component.$t('components.admin.crud.labels.doesnt_have_role'),
            items: '$(bindings.rolesRepo)',
            loading: '$(bindings.isRolesLoading)',
            multiple: true,
            clearable: true,
            chips: true,
            deletableChips: true,
          },
        },
      },
      {
        key: 'data.successMessage',
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.successMessage'),
            items: '$(bindings.rolesRepo)',
            loading: '$(bindings.isRolesLoading)',
            clearable: true,
          },
        },
      },
      {
        key: 'data.content',
        component: {
          tag: 'VSchemaBuilder',
          props: {
            label: $component.$t('components.admin.crud.labels.content'),
            componentsDictionary: $component.$press?.getBuilderComponentsDictionary($component),
            customPropertyResolver: imageUploadProperty,
            rendererPreProcessor: $component.preProcessWidget,
            items: [
              {
                id: 'root',
                tag: 'VSchemaRenderer',
                children: [],
              },
            ],
          },
        },
      },
    ],
    actions: [
      getFormSubmitAction($component, values => {
        return $component.$store.dispatch('apiCall', {
          method: 'PUT',
          url: `/api/forms/${values.id}`,
          body: {
            name: values.name,
            data: values.data,
          },
        })
      }),
    ],
  }
}
