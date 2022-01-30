import TimestampFormatter from './TimestampFormatter'

export default {
  mixins: [TimestampFormatter],
  computed: {
    room () {
      return this.value
    },
    roomTitle () {
      return this.room?.data?.title
    },
    roomTypes () {
      return this.$press?.getAvailableChatRoomTypes(this) ?? []
    },
    roomUnseenMessagesCount () {
      return this.room?.unseen_messages_count ?? this.room?.unseen_messages?.count ?? 0
    },
    roomUnseenMessagesCountString () {
      return this.$n(this.roomUnseenMessagesCount, 'decimal')
    },
    roomMessagesCount () {
      return this.room?.messages_count ?? this.room?.messages?.count ?? 0
    },
    roomMessagesCountString () {
      return this.$n(this.roomMessagesCount, 'decimal')
    },
    roomTypeString () {
      return this.roomTypes.find(t => t.value === this.room?.data?.type)?.text
    },
    roomTimestamp () {
      return this.getRelativeTimestamp(Date.parse(this.room?.created_at ?? new Date()))
    },
    roomMessages () {
      return this.room?.messages ?? []
    },
  },
}
