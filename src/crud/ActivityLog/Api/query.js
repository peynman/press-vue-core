export default function ($component) {
  return {
    method: 'POST',
    url: '/api/activity-logs/query',
    permission: 'activity-logs.query',
    form: [
    ],
  }
}
