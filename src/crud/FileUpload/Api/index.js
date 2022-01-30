import Query from './query'
import Upload from './upload'
import Export from './export'
import Delete from './delete'

export default function ($t) {
  return {
    create: Upload($t),
    query: Query($t),
    delete: Delete($t),
    export: Export($t),
  }
}
