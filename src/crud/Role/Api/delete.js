export default function ($component) {
  return {
    method: 'DELETE',
    url: '/api/roles/{id}',
    permission: 'roles.destroy',
  }
}
