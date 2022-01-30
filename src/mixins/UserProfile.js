import User from './User'
import UserProfileMethods from './UserProfileMethods'

export default {
  mixins: [User, UserProfileMethods],
  computed: {
    userId () {
      return this.getUserId(this.targetUser)
    },
    userName () {
      return this.getUsername(this.targetUser)
    },
    hasProfile () {
      return this.getHasProfile(this.targetUser)
    },
    firstname () {
      return this.getFirstname(this.targetUser)
    },
    lastname () {
      return this.getLastname(this.targetUser)
    },
    gender () {
      return this.getGender(this.targetUser)
    },
    contactEmail () {
      return this.getContactEmail(this.targetUser)
    },
    contactPhone () {
      return this.getContactPhone(this.targetUser)
    },
    contactAddress () {
      return this.getContactAddress(this.targetUser)
    },
    addresses () {
      return this.getAddresses(this.targetUser)
    },
    phones () {
      return this.getPhones(this.targetUser)
    },
    emails () {
      return this.getEmails(this.targetUser)
    },
    userHighRole () {
      return this.getUserHighRole(this.targetUser)
    },
    userDomain () {
      return this.getUserDomain(this.targetUser)
    },
    userSegmentColor () {
      return this.getUserSegmentColor(this.targetUser)
    },
    userSegment () {
      return this.getUserSegment(this.targetUser)
    },
    userSegmentScore () {
      return this.getUserSegmentScore(this.targetUser)
    },
    userGroup () {
      return this.getUserGroup(this.targetUser)
    },
    userBadgeStatus () {
      return this.getUserBadgeStatus(this.targetUser)
    },
    userBadgeValue () {
      return this.getUserBadgeValue(this.targetUser)
    },
    userBadgeColor () {
      return this.getUserBadgeColor(this.targetUser)
    },
    userBalanceString () {
      return this.getUserBalanceString(this.targetUser)
    },
    userBalanceCurrencyString () {
      return this.getUserBalanceCurrencyString(this.targetUser)
    },
    userProfilePic () {
      return this.getUserProfilePic(this.targetUser)
    },
  },
}
