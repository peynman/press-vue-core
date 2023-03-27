export function timestampFilter (key, label, range = true) {
  return {
    key,
    component: {
      tag: 'VTimestampInput',
      props: {
        range,
        displayOptions: {
          calendar: 'persian',
          numberingSystem: 'arab',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          timeZone: 'Asia/Tehran',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        },
        label,
        clearable: true,
      },
    },
  }
}

export function bindingRepo (bindingName, bindingLoadingName, fetchAction, loadingGetter, mapFunction) {
  return {
    name: bindingName,
    loading: bindingLoadingName,
    action: fetchAction,
    getter: loadingGetter,
    map: mapFunction,
  }
}

export function getEditFormBindings (repos = []) {
  return [
    {
      name: 'id',
      type: 'default',
      default: 0,
    },
    ...getCreateFormBindings(repos),
  ]
}

export function getBindingsFromRepos (repos = []) {
  return [
    ...repos.map(repo => {
      return {
        name: repo.name,
        type: 'promise',
        default: renderer => {
          return renderer.$store.dispatch(repo.action).then(items => {
            return Promise.resolve(items.map(repo.map))
          })
        },
      }
    }),
    ...repos.filter(repo => repo.loading).map(repo => {
      return {
        name: repo.loading,
        type: 'function',
        default: renderer => {
          return renderer.$store.getters[repo.getter]
        },
      }
    }),
  ]
}

export function getCreateFormBindings (repos = []) {
  return [{
      name: 'alertMessage',
      type: 'default',
      default: null,
    },
    {
      name: 'alertType',
      type: 'default',
      default: '',
    },
    {
      name: 'submitType',
      type: 'default',
      default: 'primary',
    },
    {
      name: 'alertErrors',
      type: 'default',
      default: null,
    },
    {
      name: 'submiting',
      type: 'default',
      default: false,
    },
    ...getBindingsFromRepos(repos),
  ]
}

export function getFormValidationsAlert ($component) {
  return {
    key: 'alerts',
    component: {
      tag: 'ValidationsAlert',
      factory: () => ({
        component: $component.$press?.importAsyncComponent('ValidationsAlert'),
      }),
      props: {
        type: '$(bindings.alertType)',
        message: '$(bindings.alertMessage)',
        errors: '$(bindings.alertErrors)',
      },
    },
  }
}

export function getFormAction (title, props, onActionClicked) {
  return {
    tag: 'VBtn',
    props: {
      ...props,
      loading: '$(bindings.submiting)',
    },
    children: title,
    on: {
      click: onActionClicked,
    },
  }
}

export function getFormSimpleAction (title, props, onSubmit) {
  return getFormAction(
    title,
    props,
    renderer => {
      renderer.setBindingValue('submiting', true)
      const values = renderer.getBindingValues()
      onSubmit(values, renderer)
        .then(json => {
          return Promise.resolve(json)
        })
        .catch(error => {
          renderer.setBindingValue('alertMessage', error.message)
          renderer.setBindingValue('alertErrors', Object.keys(error.validations ?? []).reduce((err, key) => {
            if (Array.isArray(error.validations[key])) {
              err.push(...error.validations[key])
              return err
            }
          }, []))
          if (error.validations) {
            renderer.setBindingValue('alertType', 'warning')
          } else {
            renderer.setBindingValue('alertType', 'error')
          }
          return Promise.reject(error)
        })
        .finally(() => {
          renderer.setBindingValue('submiting', false)
        })
    }
  )
}

export function getFormValidatableAction (title, props, onSubmit) {
  return getFormAction(
    title,
    props,
    renderer => {
      const valid = renderer.$refs.form.validate()
      if (valid) {
        renderer.setBindingValue('submiting', true)
        const values = renderer.getBindingValues()
        console.log(values)
        renderer.setBindingValue('submitType', 'primary')
        renderer.setBindingValue('alertMessage', null)
        renderer.setBindingValue('alertErrors', null)
        onSubmit(values, renderer)
          .then(json => {
            renderer.setBindingValue('alertMessage', json.message)
            renderer.setBindingValue('alertType', 'success')
            renderer.setBindingValue('submitType', 'success')
            renderer.setBindingValue('alertErrors', null)
            return Promise.resolve(json)
          })
          .catch(error => {
            renderer.setBindingValue('alertMessage', error.message)
            renderer.setBindingValue('alertErrors', Object.keys(error.validations ?? []).reduce((err, key) => {
              if (Array.isArray(error.validations[key])) {
                err.push(...error.validations[key])
                return err
              }
            }, []))
            if (error.validations) {
              renderer.setBindingValue('alertType', 'warning')
              renderer.setBindingValue('submitType', 'warning')
            } else {
              renderer.setBindingValue('alertType', 'error')
              renderer.setBindingValue('submitType', 'error')
            }
            return Promise.reject(error)
          })
          .finally(() => {
            renderer.setBindingValue('submiting', false)
          })
      }
    }
  )
}

export function getFormSubmitAction ($component, onSubmit) {
  return getFormValidatableAction(
    $component.$t('components.admin.crud.labels.submit'),
    {
      color: '$(bindings.submitType)',
    },
    onSubmit
  )
}

export function getFormSpacerAction () {
  return {
    tag: 'VSpacer',
  }
}

export function getFormResetAction ($component) {
  return {
    tag: 'VBtn',
    props: {
      color: 'warning',
      text: true,
    },
    children: $component.$t('components.admin.crud.labels.reset'),
    on: {
      click (renderer) {
        renderer.resetBindingValues()
      },
    },
  }
}

export function getEditFormNextObjectAction () {
  return {
    tag: 'VBtn',
    props: {
      icon: true,
      disabled: '$(bindings.submiting)',
    },
    children: [
      {
        tag: 'VIcon',
        children: 'mdi-chevron-left',
      },
    ],
    on: {
      click (renderer) {
        renderer.$router.push({
          path: `/admin/${renderer.$route.params.crud}/${parseInt(renderer.$route.params.id) + 1}`,
        })
      },
    },
  }
}

export function getEditFormPrevObjectAction () {
  return {
    tag: 'VBtn',
    props: {
      icon: true,
      disabled: '$(bindings.submiting)',
    },
    children: [
      {
        tag: 'VIcon',
        children: 'mdi-chevron-right',
      },
    ],
    on: {
      click (renderer) {
        renderer.$router.push({
          path: `/admin/${renderer.$route.params.crud}/${parseInt(renderer.$route.params.id) - 1}`,
        })
      },
    },
  }
}

export function getSeparatedDateRanges (values, ranges = ['createdTimestamp', 'deletedTimestamp', 'updatedTimestamp']) {
  const separated = {}
  ranges.forEach(r => {
    if (values[r] && Array.isArray(values[r]) && values[r].length === 2) {
      const l = r.indexOf('Timestamp')
      separated[r.substr(0, l) + '_' + 'from'] = values[r][0].toISOString()
      separated[r.substr(0, l) + '_' + 'to'] = values[r][1].toISOString()
    }
  })

  return separated
}

export function getCrudJsonViewAction (title, name = 'ShowDetails') {
  return {
    name,
    title,
    icon: 'mdi-eye',
    batched: false,
    api: {
      form: [
        {
          key: 'details',
          component: {
            tag: 'VJsonEditor',
            'v-model': '$(bindings.item)',
            props: {
              readonly: true,
              label: title,
            },
          },
        },
      ],
    },
  }
}
