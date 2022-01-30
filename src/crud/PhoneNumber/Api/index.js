import Create from './create'
import Query from './query'
import Update from './update'
import Export from './export'
import Delete from './delete'

export default function ($t) {
  return {
    create: Create($t),
    query: Query($t),
    delete: Delete($t),
    edit: Update($t),
    export: Export($t),
  }
}
