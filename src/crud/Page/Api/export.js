export default function ($component) {
  return {
    method: 'POST',
    url: '/api/pages/export',
    permission: 'pages.query',
  }
}
