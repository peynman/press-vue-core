export default {
  methods: {
    getNestedValue (object, path, def) {
      const parts = path?.split('.') ?? []
      let ref = object
      for (let index = 0; index < parts.length; index++) {
        const part = parts[index]
        if (ref[part]) {
          ref = ref[part]
        } else {
          return def
        }
      }
      return ref
    },
    calculateLabel (
      label,
      decorateMap,
      value) {
      if (label && value) {
        let calcLabel = label
        Object.entries(decorateMap).forEach(entry => {
          calcLabel = calcLabel.replace(':' + entry[0], this.getNestedValue(value, entry[1], ':' + entry[0]))
        })
        return calcLabel
      }

      return label ?? ''
    },
  },
}
