export default function ($component) {
  return {
    method: 'POST',
    url: '/api/roles/query',
    permission: 'roles.query',
    form: [
    ],
  }
}
