export default {
    props: {
        user: Object,
    },
    computed: {
        targetUser () {
            return this.authUser
        },
        authUserId () {
          return this.authUser?.id
        },
        authUser () {
            return this.user ?? this.$store.getters['profile/user']
        },
        authUserName () {
            return this.authUser?.name ?? ''
        },
        authUserContact () {
            return this.authUser?.emails?.[0]?.email ?? ''
        },
        authUserRoles () {
            return this.authUser?.roles ?? []
        },
        authUserRoleIds () {
            return this.authUserRoles?.map(r => (r.id))
        },
        authUserHightRole () {
            return this.authUserRoles?.sort((a, b) => a.priority - b.priority)?.[0]
        },
        authUserPermissions () {
            return this.authUser?.permissions ?? []
        },
        isLoggedIn () {
            return this.authUser !== null
        },
        isAdmin () {
            return this.isLoggedIn && (this.authUserRoleIds.includes(1) || this.authUserHightRole?.priority >= 10)
        },
    },
    methods: {
        authUserHasPermission (permission) {
            return this.authUserPermissions?.map?.(p => p.name)?.includes?.(permission)
        },
    },
}
