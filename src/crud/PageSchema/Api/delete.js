export default function ($component) {
  return {
    method: 'DELETE',
    url: '/api/page-schemas/{id}',
    permission: 'page-schemas.destroy',
  }
}
