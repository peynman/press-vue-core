import Themeable from './Themeable'

export default {
  mixins: [Themeable],
  computed: {
    relativeFormatter () {
      return new Intl.RelativeTimeFormat(this.theme.formatting.locale, {
        numeric: 'auto',
      })
    },
    timestampFormatter () {
      return Intl.DateTimeFormat(
        this.theme.formatting.locale,
        this.theme.formatting.timestampFormat
      )
    },
    timeFormatter () {
      return new Intl.DateTimeFormat(
        this.theme.formatting.locale,
        this.theme.formatting.timeFormat
      )
    },
    dateFormatter () {
      return new Intl.DateTimeFormat(
        this.theme.formatting.locale,
        this.theme.formatting.dateFormat
      )
    },
    relativeTimeDivisions () {
      return [{
          amount: 60,
          name: 'seconds',
          div: 60,
        },
        {
          amount: 60,
          name: 'minutes',
          div: 60,
        },
        {
          amount: 12,
          name: 'hours',
          div: 24,
        },
        {
          amount: 7,
          name: 'days',
          div: 7,
          time: true,
        },
      ]
    },
  },
  methods: {
    getDateFromatted (date) {
      if (typeof date === 'string') {
        date = Date.parse(date)
      }

     return this.dateFormatter.format(date)
    },
    getRelativeDate (date) {
      if (typeof date === 'string') {
        date = Date.parse(date)
      }

      let duration = (date - new Date()) / 1000

      for (let i = 0; i < this.relativeTimeDivisions.length; i++) {
        const division = this.relativeTimeDivisions[i]
        if (Math.abs(duration) < division.amount) {
          return this.relativeFormatter.format(Math.round(duration), division.name)
        }
        duration /= division.div
      }

      if (date) {
        try {
          return this.dateFormatter.format(date)
        } catch (e) {
          console.error(e)
        }
      }

      return ''
    },
    getRelativeTimestamp (date) {
      if (typeof date === 'string') {
        date = Date.parse(date)
      }

      let duration = (date - new Date()) / 1000

      for (let i = 0; i < this.relativeTimeDivisions.length; i++) {
        const division = this.relativeTimeDivisions[i]
        if (Math.abs(duration) < division.amount) {
          let str = this.relativeFormatter.format(Math.round(duration), division.name)
          if (division.time) {
            str += ' ' + this.timeFormatter.format(date)
          }
          return str
        }
        duration /= division.div
      }

      if (date) {
        try {
          return this.timestampFormatter.format(date)
        } catch (e) {
          console.error(e)
        }
      }

      return ''
    },
  },
}
