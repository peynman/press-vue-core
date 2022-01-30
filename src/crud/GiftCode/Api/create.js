import { getCreateFormBindings, getFormSubmitAction, getFormValidationsAlert } from '../../../utils/crudForm'
import Flags from '../flags'
import UserCrud from '../../User'
import ProductCrud from '../../Product'
import { crudLoaderFunction } from '../../../mixins/CrudTable'

export default function ($component) {
  return {
    method: 'POST',
    to: '/admin/gift-codes/create',
    permission: 'gift-codes.store',
    bindings: [
      {
        name: 'amount',
        type: 'default',
        default: {},
      },
      {
        name: 'data',
        type: 'default',
        default: {
          gift_same_amount: false,
        },
      },
      ...getCreateFormBindings(),
    ],
    autoValidate: true,
    form: [
      getFormValidationsAlert(),
      {
        key: 'code',
        rules: [
          $component.getRequiredRule(),
          $component.getMinLengthRule(6),
        ],
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.giftCode'),
          },
        },
      },
      {
        key: 'amount',
        rules: [
          $component.getRequiredRule(),
          $component.getMinRule(1),
        ],
        component: {
          tag: 'ObjectAmountInput',
          props: {
            label: $component.$t('components.admin.crud.labels.giftCodeMaxAmount'),
          },
          factory: () => ({
            component: $component.$press?.importAsyncComponent('ObjectAmountInput'),
          }),
        },
      },
      {
        key: 'data.gift_same_amount',
        component: {
          tag: 'VCheckbox',
          props: {
            label: $component.$t('components.admin.crud.labels.giftCodeFixedAmount'),
            hint: $component.$t('components.admin.crud.hints.giftCodeFixedAmount'),
          },
        },
      },
      {
        key: 'data.value',
        rules: [
          $component.getRequiredRule(),
        ],
        component: {
          tag: 'VTextField',
          props: {
            type: 'number',
            label: $component.$t('components.admin.crud.labels.giftCodeValue'),
            disabled: '$(bindings.data.gift_same_amount)',
          },
        },
      },
      {
        key: 'data.min_amount',
        component: {
          tag: 'VTextField',
          props: {
            type: 'number',
            label: $component.$t('components.admin.crud.labels.giftCodeMinAmount'),
          },
        },
      },
      {
        key: 'data.min_items',
        component: {
          tag: 'VTextField',
          props: {
            type: 'number',
            label: $component.$t('components.admin.crud.labels.giftCodeMinItems'),
          },
        },
      },
      {
        key: 'data.products',
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
            label: $component.$t('components.admin.crud.labels.giftCodeProducts'),
            hint: $component.$t('components.admin.crud.hints.giftCodeProducts'),
            multiple: true,
            chips: true,
            deletableChips: true,
            smallChips: true,
          },
        },
      },
      {
        key: 'data.specific_ids',
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
            label: $component.$t('components.admin.crud.labels.giftCodeSpecificUsers'),
            hint: $component.$t('components.admin.crud.hints.giftCodeSpecificUsers'),
            chips: true,
            smallChips: true,
            multiple: true,
          },
        },
      },
      {
        key: 'data.expire_on_use',
        component: {
          tag: 'VCheckbox',
          props: {
            label: $component.$t('components.admin.crud.labels.giftCodeExpireOnUse'),
            hint: $component.$t('components.admin.crud.hints.giftCodeExpireOnUse'),
          },
        },
      },
      {
        key: 'data.multi_time_use',
        component: {
          tag: 'VCheckbox',
          props: {
            label: $component.$t('components.admin.crud.labels.giftCodeMultiTimeUse'),
            hint: $component.$t('components.admin.crud.hints.giftCodeMultiTimeUse'),
          },
        },
      },
      {
        key: 'data.fixed_only',
        component: {
          tag: 'VCheckbox',
          props: {
            label: $component.$t('components.admin.crud.labels.giftCodeFixedOnly'),
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
          url: '/api/gift-codes',
          body: {
            code: values.code,
            amount: values.amount.amount,
            currency: values.amount.currency,
            data: values.data,
            flags: values.flags,
          },
        })
      }),
    ],
  }
}