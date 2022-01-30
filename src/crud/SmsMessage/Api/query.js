export default function ($t) {
  return {
    method: 'POST',
    url: '/api/sms-messages/query',
    permission: 'sms-messages.query',
    form: [
    ],
  }
}
