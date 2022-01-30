
export function imageUploadProperty ($component, item, attr) {
  if (item.tag === 'VImg' && attr.name === 'src') {
    return () => $component.$press?.importAsyncComponent('FilePathInput')
  }
  return null
}

export function makeSelectFromTranslationKeys (trs) {
  return Object.keys(trs).reduce((items, k) => {
    items.push({
      text: trs[k],
      value: k,
    })
    return items
  }, [])
}
