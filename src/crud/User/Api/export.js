export default function ($component) {
  return {
    method: 'POST',
    url: '/api/users/export',
    permission: 'users.query',
  }
}
