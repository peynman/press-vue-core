import { getCreateFormBindings, getFormSubmitAction, getFormValidationsAlert } from '../../../utils/crudForm'
import Flags from '../flags'
import Status from '../status'
import UserCrud from '../../User'
import ProductCrud from '../../Product'
import { crudLoaderFunction } from '../../../mixins/CrudTable'

export default function ($component) {
  return {
    method: 'POST',
    to: '/admin/carts/create',
    permission: 'carts.store',
    bindings: [
      {
        name: 'amount',
        type: 'default',
        default: {},
      },
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
        key: 'customer_id',
        rules: [
          $component.getRequiredRule(),
          $component.getNumericRule(),
        ],
        component: {
          tag: 'VCrudObjectPicker',
          props: {
            crud: UserCrud($component, 'user', 0),
            crudLoaderFunction: crudLoaderFunction($component),
            decorateLabel: '#:id :name',
            decorateMap: {
              id: 'id',
              name: 'name',
            },
            label: $component.$t('components.admin.crud.labels.targetUserId'),
            hint: $component.$t('components.admin.crud.hints.targetUserId'),
            chips: true,
            smallChips: true,
          },
        },
      },
      {
        key: 'amount',
        rules: [
          $component.getRequiredRule(),
        ],
        component: {
          tag: 'ObjectAmountInput',
          props: {
            label: $component.$t('components.admin.crud.labels.amount'),
          },
          factory: () => ({
            component: $component.$press?.importAsyncComponent('ObjectAmountInput'),
          }),
        },
      },
      {
        key: 'status',
        rules: [
          $component.getRequiredRule(),
        ],
        component: {
          tag: 'VSelect',
          props: {
            label: $component.$t('components.admin.crud.labels.status'),
            items: Status($component),
          },
        },
      },
      {
        key: 'products',
        rules: [
          $component.getRequiredRule(),
        ],
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
    actions: [
      getFormSubmitAction($component, values => {
        return $component.$store.dispatch('apiCall', {
          method: 'POST',
          url: '/api/carts',
          body: {
            flags: values.flags,
          },
        })
      }),
    ],
  }
}
