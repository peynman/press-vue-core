import Create from './create'
import Query from './query'
import Update from './update'
import Export from './export'
import Delete from './delete'

export default function ($component) {
  return {
    create: Create($component),
    query: Query($component),
    delete: Delete($component),
    edit: Update($component),
    export: Export($component),
  }
}
