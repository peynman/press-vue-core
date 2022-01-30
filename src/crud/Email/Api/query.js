export default function ($t) {
  return {
    method: 'POST',
    url: '/api/emails/query',
    permission: 'emails.query',
    form: [
    ],
  }
}
