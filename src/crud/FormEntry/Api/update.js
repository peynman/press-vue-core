export default function ($component) {
  return {
    method: 'POST',
    url: '/api/form-entries/{id}',
    permission: 'form-entries.update',
    bindings: [],
    autoValidate: true,
    form: [
    ],
  }
}
