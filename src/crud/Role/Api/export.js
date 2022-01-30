export default function ($component) {
  return {
    method: 'POST',
    url: '/api/roles/export',
    permission: 'roles.query',
  }
}
