export default {
  data: vm => ({
    reportSettings: {
      timeRangeMode: vm.settings?.timeRangeMode ?? '1w',
      aggregateMode: vm.settings?.aggregateMode ?? '1d',
      dateRange: vm.settings?.dateRange,
      showAlternate: vm.settings?.showAlternate ?? true,
      alternateStart: vm.settings?.alternateStart,
      alternateMode: vm.settings?.alternateMode ?? 'same',
      cols: vm.settings?.cols ?? {},
    },
  }),
  computed: {
    alternateFrom () {
      const from = new Date()
      if (this.reportSettings?.alternateMode === 'custom') {
        return new Date(this.reportSettings.alternateStart)
      } else {
        if (this.reportSettings?.timeRangeMode === 'custom') {
          const start = new Date(this.reportSettings.dateRange[0])
          const end = new Date(this.reportSettings.dateRange[1])
          const diff = Math.abs(end.getTime() - start.getTime())
          start.setTime(start.getTime() - diff)
          return start
        } else {
          from.setTime(from.getTime() - this.getTimeFromString(this.reportSettings?.timeRangeMode) * 2)
        }
      }

      return from
    },
    alternateTo () {
      if (this.reportSettings?.alternateMode === 'custom') {
        const aStart = new Date(this.reportSettings.alternateStart)
        if (this.reportSettings?.timeRangeMode === 'custom') {
          const start = new Date(this.reportSettings.dateRange[0])
          const end = new Date(this.reportSettings.dateRange[1])
          const diff = Math.abs(end.getTime() - start.getTime())
          aStart.setTime(aStart.getTime() + diff)
        } else {
          aStart.setTime(aStart.getTime() + this.getTimeFromString(this.reportSettings?.timeRangeMode))
        }
        return aStart
      } else {
        const from = new Date()
        from.setTime(from.getTime() - this.getTimeFromString(this.reportSettings?.timeRangeMode))
        return from
      }
    },
    from () {
      const from = new Date()
      if (this.reportSettings?.timeRangeMode === 'custom') {
        return new Date(this.reportSettings.dateRange[0])
      } else {
        from.setTime(from.getTime() - this.getTimeFromString(this.reportSettings?.timeRangeMode))
      }

      return from
    },
    to () {
      if (this.reportSettings?.timeRangeMode === 'custom') {
        return new Date(this.reportSettings.dateRange[1])
      } else {
        return new Date()
      }
    },
    aggregate () {
      const agg = this.getTimeFromString(this.reportSettings?.aggregateMode)
      return agg > 0 ? Math.floor(agg / 1000) : 3600
    },
  },
  methods: {
    getTimeFromString (mode) {
      if (mode.endsWith('h')) {
        return parseInt(mode.slice(0, -1)) * 1000 * 60 * 60
      } else if (mode.endsWith('d')) {
        return parseInt(mode.slice(0, -1)) * 1000 * 60 * 60 * 24
      } else if (mode.endsWith('w')) {
        return parseInt(mode.slice(0, -1)) * 1000 * 60 * 60 * 24 * 7
      } else if (mode.endsWith('m')) {
        return parseInt(mode.slice(0, -1)) * 1000 * 60 * 60 * 24 * 30
      } else if (mode.endsWith('y')) {
        return parseInt(mode.slice(0, -1)) * 1000 * 60 * 60 * 24 * 30 * 12
      } else if (mode.endsWith('min')) {
        return parseInt(mode.slice(0, -3)) * 1000 * 60
      }

      return 0
    },
    onUpdateCrudReport (settings) {
      this.reportSettings = settings
      this.fetchReports()
    },
  },
}
