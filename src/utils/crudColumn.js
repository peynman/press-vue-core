export function timestampColumn (name, title, column) {
  return {
    name,
    title,
    sortable: true,
    component: {
      tag: 'VCrudColumnTimestamp',
      props: {
        locale: 'fa',
        dateOptions: {
          calendar: 'persian',
          numberingSystem: 'arab',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          timeZone: 'Asia/Tehran',
        },
        dateChipProps: {
          dense: true,
          color: 'primary',
          dark: true,
          xSmall: true,
        },
        timeOptions: {
          calendar: 'persian',
          numberingSystem: 'arab',
          timeZone: 'Asia/Tehran',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        },
        timeChipProps: {
          dense: true,
          color: 'secondary',
          outlined: true,
          xSmall: true,
        },
        value: `$(bindings.item.${column})`,
      },
    },
  }
}

export function nameTitleColumn (
  $component,
  name,
  title,
  value,
  nameLabel = ':name',
  titleLabel = ':title',
  decorateMap = { name: 'name', title: 'data.title' }
) {
  return {
    name,
    title,
    sortable: true,
    component: {
      tag: 'ObjectNameTitleColumn',
      props: {
        value: `$(bindings.${value})`,
        titleLabel,
        nameLabel,
        decorateMap,
      },
      factory: () => ({
        component: $component.$press?.importAsyncComponent('ObjectNameTitleColumn'),
      }),
    },
  }
}

export function bitwiseFlagsColumn ($component, name, title, value, items) {
  return {
    name,
    title,
    sortable: true,
    component: {
      tag: 'BitwiseFlagsColumn',
      props: {
        value: `$(bindings.${value})`,
        items,
      },
      factory: () => ({
        component: $component.$press?.importAsyncComponent('BitwiseFlagsColumn'),
      }),
    },
  }
}

export function decimalColumn ($component, name, title, value, sortable = true) {
  return {
    name,
    title,
    sortable,
    component: {
      tag: 'DecimalColumn',
      props: {
        value: `$(bindings.${value})`,
      },
      factory: () => ({
        component: $component.$press?.importAsyncComponent('DecimalColumn'),
      }),
    },
  }
}

export function objectStatusColumn ($component, name, title, value, items) {
  return {
    name,
    title,
    sortable: true,
    component: {
      tag: 'ObjectStatusColumn',
      props: {
        value: `$(bindings.${value})`,
        items,
      },
      factory: () => ({
        component: $component.$press?.importAsyncComponent('ObjectStatusColumn'),
      }),
    },
  }
}

export function currencyColumn ($component, name, title, value) {
  return {
    name,
    title,
    sortable: true,
    component: {
      tag: 'CurrencyColumn',
      props: {
        value: `$(bindings.${value})`,
      },
      factory: () => ({
        component: $component.$press?.importAsyncComponent('CurrencyColumn'),
      }),
    },
  }
}

export function decorateColumn (name, title, decorateMap, value, label) {
  return {
    name,
    title,
    sortable: false,
    component: {
      tag: 'VCrudColumnDecoratable',
      props: {
        label,
        decorateMap,
        value: `$(bindings.${value})`,
      },
    },
  }
}

export function userProfileColumn ($component, name, title, column) {
  return {
    name,
    title,
    sortable: false,
    component: {
      tag: 'UserProfileColumn',
      props: {
        user: `$(bindings.${column})`,
      },
      factory: () => ({
        component: $component.$press?.importAsyncComponent('UserProfileColumn'),
      }),
    },
  }
}

export function cartDetailsColumn ($component, name, title, column) {
  return {
    name,
    title,
    sortable: false,
    component: {
      tag: 'UserProfileColumn',
      props: {
        cart: `$(bindings.${column})`,
      },
      factory: () => ({
        component: $component.$press?.importAsyncComponent('CartDetailsColumn'),
      }),
    },
  }
}
