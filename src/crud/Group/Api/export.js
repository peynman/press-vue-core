export default function ($component) {
  return {
    method: 'POST',
    url: '/api/groups/export',
    permission: 'groups.query',
  }
}
