export default function ($component) {
  return {
    method: 'POST',
    url: '/api/users/{id}',
    permission: 'users.update',
    bindings: [],
    autoValidate: true,
    form: [],
  }
}
