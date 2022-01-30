export default function ($component) {
  return {
    method: 'DELETE',
    url: '/api/groups/{id}',
    permission: 'groups.destroy',
  }
}
