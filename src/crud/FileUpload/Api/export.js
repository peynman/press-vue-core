export default function ($t) {
  return {
    method: 'POST',
    url: '/api/file-upload/export',
    permission: 'file-upload.query',
  }
}
