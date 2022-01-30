
export function createAutoLoader (name, self, autoloads, def) {
  return {
    self: autoloads[name] !== undefined ? autoloads[name] : self,
    ...def,
  }
}

export function createAuthorAutoLoader ($component, autoloads, name = 'author', self = '*', def = {}) {
  return {
    crud: () => $component.$press?.loadCrudWithName('User'),
    autoloads: createAutoLoader(name, self, autoloads, {
      wallet_balance: false,
      domains: false,
      phones: false,
      emails: false,
      groups: false,
      ...def,
    }),
  }
}

export function createCrudRelationDictionaryEntry (name, crud, self, autoloads, def) {
  return {
    [name]: {
      crud,
      autoloads: createAutoLoader(name, autoloads[name] !== undefined ? autoloads[name] : self, autoloads, {
        ...def,
        ...autoloads[name],
      }),
    },
  }
}

export function createCrudRelations ($component, relationsDictionary, depth, api) {
  const relations = []

  if (depth > 1) {
    Object.keys(relationsDictionary).forEach(k => {
      const def = relationsDictionary[k]
      if (def.crud) {
        // console.log(k, def)
        def.crud().then(module => {
          relations.push(module.default($component, k, def.autoloads ?? {}, depth - 1, api))
        })
      } else {
        relations.push({
          name: k,
          columns: [],
          relations: [],
          autoloads: def.autoloads?.self,
        })
      }
    })
  }

  return relations
}
