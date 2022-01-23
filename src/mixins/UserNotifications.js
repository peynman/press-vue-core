import User from './User'

export const NotificationStatus = {
    Created: 1,
    Unseen: 2,
    Dismissed: 3,
    Seen: 4,
}

export default {
    mixins: [User],
    computed: {
        hasNotifications () {
            return this.targetUser?.notifications?.length > 0
        },
        unseenNotificationsCount () {
            return this.unseenNotifications?.length
        },
        unseenNotifications () {
            return this.targetUser?.notifications?.filter(n => n.status === NotificationStatus.Unseen)
        },
    },
}
