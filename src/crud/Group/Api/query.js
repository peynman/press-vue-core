export default function ($component) {
  return {
    method: 'POST',
    url: '/api/groups/query',
    permission: 'groups.query',
    form: [
    ],
  }
}
