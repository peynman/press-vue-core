export function normalizeMissingDates (aggregate, from, to) {
  return json => {
    if (json.length === 0) {
      return json
    }
    const filled = []

    const fromUtc = from.getTime() - from.getTimezoneOffset() * 60 * 1000
    const toUtc = to.getTime() - to.getTimezoneOffset() * 60 * 1000

    let start = Math.floor(toUtc / (aggregate * 1000)) * aggregate * 1000
    const count = Math.floor((toUtc - fromUtc) / (aggregate * 1000))

    for (let i = 0; i < count; i++) {
      const v = json.filter(v => v._time === start)
      if (v.length > 0) {
        filled.push(...v)
      } else {
        filled.push({
          _value: 0,
          _time: start,
        })
      }
      start -= aggregate * 1000
    }

    return filled
  }
}

export function fetchAlternateAwareReports (
  $component,
  settings,
  bodyMain,
  bodyAlternate,
  formatCallback,
  normaliseMain,
  normaliseAlternate,
) {
  const promises = [
    $component.$store.dispatch('reports/fetchReports', bodyMain)
      .then(json => {
        if (normaliseMain) {
          return normaliseMain(json)
        }
        return json
      })
      .then(json => {
        return formatCallback(json)
      }),
  ]

  if (settings.showAlternate) {
    promises.push(
      $component.$store.dispatch('reports/fetchReports', bodyAlternate)
        .then(json => {
          if (normaliseAlternate) {
            return normaliseAlternate(json)
          }
          return json
        })
        .then(json => {
          return formatCallback(json)
        })
    )
  }

  return Promise.all(promises)
}
