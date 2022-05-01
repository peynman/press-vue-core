export default {
  methods: {
    getUserId (targetUser) {
      return targetUser?.id
    },
    getUsername (targetUser) {
      return targetUser?.name
    },
    getHasProfile (targetUser) {
      return targetUser?.form_profile_default?.data?.values ?? false
    },
    getFirstname (targetUser) {
      return targetUser?.form_profile_default?.data?.values?.firstname
    },
    getLastname (targetUser) {
      return targetUser?.form_profile_default?.data?.values?.lastname
    },
    getFullname (targetUser) {
      return this.getHasProfile(targetUser) ? this.getFirstname(targetUser) + ' ' + this.getLastname(targetUser) : this.getUsername(targetUser)
    },
    getGender (targetUser) {
      return targetUser?.form_profile_default?.data?.values?.gender
    },
    getContactEmail (targetUser) {
      return targetUser?.emails?.[0]?.email
    },
    getContactPhone (targetUser) {
      return targetUser?.phones?.[0]?.number
    },
    getContactAddress (targetUser) {
      return targetUser?.addresses?.[0]?.number
    },
    getAddresses (targetUser) {
      return targetUser?.addresses
    },
    getPhones (targetUser) {
      return targetUser?.phones
    },
    getEmails (targetUser) {
      return targetUser?.emails
    },
    getUserHighRole (targetUser) {
      return targetUser?.roles?.[0]?.title
    },
    getUserDomain (targetUser) {
      return targetUser?.domains?.[0]?.domain
    },
    getUserSegmentColor (targetUser) {
      return targetUser?.segments?.[0]?.data?.color ?? 'primary'
    },
    getUserSegment (targetUser) {
      return targetUser?.segments?.[0]?.data?.title
    },
    getUserSegmentScore (targetUser) {
      return targetUser?.segments?.[0]?.score
    },
    getUserGroup (targetUser) {
      return (
        targetUser?.groups?.[0]?.data?.title ?? targetUser?.groups?.[0]?.name
      )
    },
    getUserBadgeStatus (targetUser) {
      return true
    },
    getUserBadgeValue (targetUser) {
      return 1
    },
    getUserBadgeColor (targetUser) {
      return 'red'
    },
    getUserBalanceString (targetUser) {
      return this.$n(targetUser?.balance?.amount ?? 0, 'decimal')
    },
    getUserBalanceCurrencyString (targetUser) {
      return 'تومان'
    },
    getUserProfilePic (targetUser) {
      if (targetUser?.form_profile_default?.data?.values?.profilePic?.startsWith('http')) {
        return targetUser?.form_profile_default?.data?.values?.profilePic
      }

      if (targetUser?.form_profile_default?.data?.values?.profilePic) {
        return this.$store.getters.getUrl(targetUser.form_profile_default.data.values.profilePic)
      }

      return undefined
    },
  },
}
