export default function (props = []) {
  return {
    data: () => ({
      formAlertValidations: null,
      formAlertErrorList: null,
      formAlertMessage: null,
      formAlertType: 'warning',
      ...props.reduce((d, prop) => {
        d[prop] = null
        return d
      }, {}),
    }),
    watch: {
      ...props.reduce((w, prop) => {
        w[prop] = function (n) {
          if (this.formAlertValidations?.[prop]) {
            this.formAlertValidations[prop] = null
          }
        }
        return w
      }, {}),
    },
    methods: {
      getRequiredRule () {
        return v => !!v || this.$t('components.admin.rules.required')
      },
      getRequiredOrZeroRule () {
        return v => !!v || v === 0 || this.$t('components.admin.rules.required')
      },
      getUsernameRule () {
        return v => ((v && v.search(/^[a-zA-Z0-9-_]+$/) !== -1) || this.$t('components.admin.rules.username'))
      },
      getMinRule (min) {
        return v => v >= min || this.$t('components.admin.rules.min', [min])
      },
      getMaxRule (max) {
        return v => v <= max || this.$t('components.admin.rules.max', [max])
      },
      getMaxLengthRule (max) {
        return v => (!v || v.length <= max) || this.$t('components.admin.rules.maxString', [max])
      },
      getMinLengthRule (min) {
        return v => (!v || v.length >= min) || this.$t('components.admin.rules.minString', [min])
      },
      getPhoneNumberRule () {
        return v => (v && v.length === 11 && v.substr(0, 2) === '09') || this.$t('components.admin.rules.phone')
      },
      getEmailRule () {
        return v => /.+@.+\..+/.test(v) || this.$t('components.admin.rules.email')
      },
      getRegexRule (regex, msg) {
        return v => regex.test(v) || msg
      },
      getNumericRule () {
        return v => ((!isNaN(v) && !isNaN(parseFloat(v))) || v === undefined) || this.$t('components.admin.rules.numeric')
      },
      getPropertyErrorMessages (prop) {
        return this.formAlertValidations?.[prop] ?? []
      },
      resetFormValidations () {
        this.formAlertType = 'success'
        this.formAlertMessage = null
        this.formAlertErrorList = null
        this.formAlertValidations = null
      },
      updateFormSuccessMessage (message) {
        this.formAlertType = 'success'
        this.formAlertMessage = message
        this.formAlertErrorList = []
        this.formAlertValidations = null
      },
      updateFormValidationErrors (error) {
        this.formAlertMessage = error.message
        this.formAlertValidations = error.validations
        this.formAlertErrorList = Object.keys(error.validations ?? []).reduce((err, key) => {
          if (Array.isArray(error.validations[key])) {
            err.push(...error.validations[key])
            return err
          }
        }, [])
        if (!this.formAlertValidations) {
          this.formAlertType = 'error'
        } else {
          this.formAlertType = 'warning'
        }
        if (error.captcha) {
          this.$store.commit('captcha/setCaptcha', error.captcha)
        }
      },
    },
  }
}
