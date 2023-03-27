import SchemaCrud from '../../../PageSchema'
import { crudLoaderFunction } from '../../../../mixins/CrudTable'

export default $component => ([
    {
        key: 'publish_at',
        tab: 'options',
        component: {
          tag: 'VTimestampInput',
          props: {
            label: $component.$t('components.admin.crud.labels.publishAt'),
          },
        },
    },
    {
        key: 'unpublish_at',
        tab: 'options',
        component: {
          tag: 'VTimestampInput',
          props: {
            label: $component.$t('components.admin.crud.labels.expiresAt'),
          },
        },
    },
    {
        key: 'options.author',
        tab: 'options',
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.author'),
            clearable: true,
          },
        },
    },
    {
        key: 'options.description',
        tab: 'options',
        component: {
          tag: 'VTextField',
          props: {
            label: $component.$t('components.admin.crud.labels.description'),
            clearable: true,
          },
        },
    },
    {
        key: 'options.schemaId',
        tab: 'options',
        rules: [
          $component.getNumericRule(),
        ],
        component: {
          tag: 'VCrudObjectPicker',
          props: {
            crud: SchemaCrud($component, 'user', 0),
            crudLoaderFunction: crudLoaderFunction($component),
            decorateLabel: '#:id :title',
            decorateMap: {
              id: 'id',
              title: 'schema.title',
            },
            label: $component.$t('components.admin.crud.labels.pageSchema'),
            hint: $component.$t('components.admin.crud.hints.pageSchema'),
            chips: true,
            smallChips: true,
          },
        },
    },
    {
      key: 'options.modifiers',
      tab: 'options',
      component: {
        tag: 'VAutocomplete',
        props: {
          label: $component.$t('components.admin.crud.labels.pageModifiers'),
          multiple: true,
          chips: true,
          deletableChips: true,
          smallChips: true,
          items: [
            {
              value: '\\Larapress\\Pages\\Services\\Pages\\PageModifiers\\ISearchModifier',
              text: 'SearchModifier',
            },
            {
              value: '\\Larapress\\Pages\\Services\\Pages\\PageModifiers\\IPageTitleModifier',
              text: 'PageTitleModifier',
            },
          ],
        },
      },
    },
    {
        key: 'options.sources',
        tab: 'options',
        component: {
          tag: 'PageSourcesInput',
          props: {
            label: $component.$t('components.admin.crud.labels.pageSources'),
          },
          factory: () => $component.$press?.importAsyncComponent('PageSourcesInput'),
        },
    },
    {
        key: 'options.metas',
        tab: 'options',
        component: {
          tag: 'VJsonEditor',
          props: {
            label: $component.$t('components.admin.crud.labels.metas'),
            startType: 'object',
            canChangeRootType: false,
            hideDefaultTypes: true,
            extraTypes: [
              {
                text: 'String',
                value: 'string',
                genNewItem (vals) {
                  return vals.str || ''
                },
              },
            ],
          },
        },
    },
])
