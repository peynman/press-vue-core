import Query from './query'
import Export from './export'
import Delete from './delete'

export default function ($t) {
  return {
    query: Query($t),
    delete: Delete($t),
    export: Export($t),
  }
}
