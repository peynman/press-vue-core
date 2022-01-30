export default function ($t) {
  return {
    method: 'POST',
    url: '/api/emails/export',
    permission: 'emails.query',
  }
}
