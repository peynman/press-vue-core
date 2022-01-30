import { bindingRepo, getCreateFormBindings } from '../../../utils/crudForm'
import { fetchAlternateAwareReports, normalizeMissingDates } from '../../../utils/crudReports'

export default $component => ({
  name: 'ecommerce.carts.windowed',
  icon: 'mdi-cart',
  type: 'bar',
  url: '/api/carts/reports',
  unit: $component.$t('components.admin.crud.cart.reports.sales.unit'),
  title: $component.$t('components.admin.crud.cart.reports.sales.title'),
  bindings: [
    ...getCreateFormBindings(
      [
        bindingRepo(
          'domainsRepo',
          'isDomainsLoading',
          'repos/fetchDomains',
          'repos/isDomainsLoading',
          item => ({
            text: item.domain,
            value: item.id,
          }),
        ),
      ]
    ),
  ],
  form: [
    {
      key: 'domains',
      component: {
        tag: 'VSelect',
        props: {
          multiple: true,
          label: $component.$t('components.admin.charts.labels.domains'),
          items: '$(bindings.domainsRepo)',
          loading: '$(bindings.isDomainsLoading)',
        },
      },
    },
  ],
  cols: {
    xs: 12,
    sm: 6,
    md: 4,
  },
  widget: 'CrudSingleStat',
  fetchReports ($component, api, settings) {
    return fetchAlternateAwareReports(
      $component,
      settings,
      {
        url: api.url,
        filters: {
          status: 'purchased',
        },
        from: settings.from,
        to: settings.to,
        aggregate: settings.aggregate,
        name: api.name,
      },
      {
        url: api.url,
        filters: {
          status: 'purchased',
        },
        from: settings.alternateFrom,
        to: settings.alternateTo,
        aggregate: settings.aggregate,
        name: api.name,
      },
      json => ({
        values: json.map(v => parseFloat(v._value)).reverse(),
        labels: json.map(v => $component.getDateFromatted(new Date(parseFloat(v._time)))).reverse(),
      }),
      normalizeMissingDates(settings.aggregate, settings.from, settings.to),
      normalizeMissingDates(settings.aggregate, settings.alternateFrom, settings.alternateTo),
    )
  },
})
