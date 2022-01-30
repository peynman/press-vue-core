export default function ($component) {
  return {
    method: 'POST',
    url: '/api/groups/{id}',
    permission: 'groups.update',
    bindings: [],
    autoValidate: true,
    form: [
    ],
  }
}
