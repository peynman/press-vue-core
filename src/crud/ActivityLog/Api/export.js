export default function ($component) {
  return {
    method: 'POST',
    url: '/api/activity-logs/export',
    permission: 'activity-logs.query',
  }
}
