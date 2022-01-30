export default function ($component) {
  return {
    method: 'DELETE',
    url: '/api/users/{id}',
    permission: 'users.destroy',
  }
}
