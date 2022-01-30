export default function ($t) {
  return {
    method: 'DELETE',
    url: '/api/file-upload/{id}',
    permission: 'file-upload.destroy',
  }
}
