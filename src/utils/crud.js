export function getCrudResourceFolderFromName (crudName) {
  function spliceSlice (str, index, count, add) {
    // We cannot pass negative indexes directly to the 2nd slicing operation.
    if (index < 0) {
      index = str.length + index
      if (index < 0) {
        index = 0
      }
    }

    return str.slice(0, index) + (add || '') + str.slice(index + count)
  }
  let name = crudName.charAt(0).toUpperCase() + crudName.slice(1)

  const esEndingNames = [
    'Messages',
    'Roles',
    'Devices',
    'Files',
    'Pages',
    'Sms-messages',
    'Chat-messages',
    'Product-types',
    'Gift-codes',
  ]
  if (name.endsWith('ies')) {
    name = name.slice(0, name.length - 3) + 'y'
  } else if (name.endsWith('es') && !esEndingNames.includes(name)) {
    name = name.slice(0, name.length - 2)
  } else if (name.endsWith('s')) {
    name = name.slice(0, name.length - 1)
  }

  let dashIndex = name.indexOf('-')
  while (dashIndex >= 0) {
    name = spliceSlice(name, dashIndex, 2, name.charAt(dashIndex + 1).toUpperCase())
    dashIndex = name.indexOf('-')
  }

  return name
}

export function recursiveCrudDefaultRelations (c) {
  const loadRelations = {}
  const recursiveRelations = (crud, path) => {
    crud.relations.forEach(r => {
      if (r.autoloads) {
        loadRelations[[...path, r.name].join('.')] = r.autoloads
        if (r.relations && r.relations.length > 0) {
          recursiveRelations(r, [...path, r.name])
        }
      }
    })
  }
  recursiveRelations(c, [])
  return loadRelations
}
