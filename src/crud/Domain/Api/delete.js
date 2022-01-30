export default function ($t) {
  return {
    method: 'DELETE',
    url: '/api/domains/{id}',
    permission: 'domains.destroy',
  }
}
