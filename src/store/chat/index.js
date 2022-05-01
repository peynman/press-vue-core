export default {
  namespaced: true,

  state: {},

  actions: {
    fetchChatRooms (context, { closed, page }) {
      return context.dispatch('fetchApiSources', [
        {
          resource: 'repository',
          class: '\\Larapress\\Chat\\Services\\Chat\\IChatRepository',
          method: closed ? 'getClosedRoomsPaginated' : 'getJoinedRoomsPaginated',
          path: 'rooms',
          args: [
            {
              index: 1,
              value: page,
            },
          ],
        },
      ], { root: true })
        .then(json => {
          return Promise.resolve(json.rooms)
        })
    },

    fetchRoomMessages (context, { roomId, page }) {
      return context.dispatch('fetchApiSources', [
        {
          resource: 'repository',
          class: '\\Larapress\\Chat\\Services\\Chat\\IChatRepository',
          method: 'getRoomMessagesPaginated',
          path: 'messages',
          args: [
            {
              index: 1,
              value: roomId,
            },
            {
              index: 2,
              value: page,
            },
          ],
        },
      ], { root: true })
        .then(json => {
          return Promise.resolve(json.messages)
        })
    },

    sendMessage (context, { roomId, message }) {
      return context.dispatch('apiCall', {
        method: 'POST',
        url: '/api/chat/post-message',
        body: {
          room_id: roomId,
          message,
        },
      }, { root: true })
    },

    addParticipant (context, { roomId, userId, flags, data }) {
      return context.dispatch('apiCall', {
        method: 'POST',
        url: '/api/chat/add-room-participant',
        body: {
          room_id: roomId,
          user_id: userId,
          flags,
          data,
        },
      }, { root: true })
    },

    submitSupportIssue (context, { message, data }) {
      return context.dispatch('apiCall', {
        method: 'POST',
        url: '/api/chat/create-room',
        body: {
          data,
          message: {
            message,
          },
        },
      }, { root: true })
    },
  },
}
