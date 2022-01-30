import Query from './query'
import Export from './export'

export default function ($component) {
  return {
    query: Query($component),
    export: Export($component),
  }
}
