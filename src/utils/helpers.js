export function makeRandomId (len = 6) {
  const chars = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
  const rnd = []
  for (let i = 0; i < len; i++) {
    rnd.push(chars[Math.floor(Math.random() * chars.length) + 1])
  }
  return rnd.join('')
}

export function redirectToUrl (url, data = {}) {
  const form = document.createElement('form')
  form.action = url
  form.method = 'POST'
  form.id = makeRandomId(10)
  form.name = makeRandomId(10)

  Object.keys(data).forEach(key => {
    const input = document.createElement('input')
    input.name = key
    input.value = data[key]
    input.type = 'hidden'
    form.appendChild(input)
  })

  document.body.appendChild(form)
  setTimeout(() => {
    form.submit()
  }, 100)
}

export function flattenObject (data, c) {
  const result = {}
  for (const i in data) {
    if (typeof data[i] === 'object') Object.assign(result, flattenObject(data[i], c + '.' + i))
    else result[(c + '.' + i).replace(/^\./, '')] = data[i]
  }
  return result
}

export function expandObject (obj) {
  const result = {}
  for (const objectPath in obj) {
    const parts = objectPath.split('.')
    let target = result
    while (parts.length > 1) {
      const part = parts.shift()
      target = target[part] = target[part] || {}
    }
    target[parts[0]] = obj[objectPath]
  }
  return result
}

export function areEqualShallow (a, b) {
  if ((a && !b) || (b && !a)) {
    return false
  }

  for (const key in a) {
      if (!(key in b) || a[key] !== b[key]) {
          return false
      }
  }
  for (const key in b) {
      if (!(key in a) || a[key] !== b[key]) {
          return false
      }
  }
  return true
}

export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

export function mergeDeep (source, target) {
  for (const key in target) {
    const sourceProperty = source[key]
    const targetProperty = target[key]

    // Only continue deep merging if
    // both properties are objects
    if (
      isObject(sourceProperty) &&
      isObject(targetProperty)
    ) {
      source[key] = mergeDeep(sourceProperty, targetProperty)

      continue
    }

    source[key] = targetProperty
  }

  return source
}

export function toEnglishDigits (str) {
  if (!str) return str

  let e = '۰'.charCodeAt(0)
  str = str.replace(/[۰-۹]/g, t => {
      return t.charCodeAt(0) - e
  })
  e = '٠'.charCodeAt(0)
  str = str.replace(/[٠-٩]/g, t => {
      return t.charCodeAt(0) - e
  })
  return str
}
