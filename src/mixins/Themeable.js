export default {
    name: 'themeable',
    computed: {
        previewTheme () {
          const themeStr = localStorage.getItem('theme-preview')
          if (themeStr) {
            try {
              return JSON.parse(themeStr)
            } catch (e) {
              console.log('Error in theme', e)
            }
          }

          return null
        },
        theme () {
          const theme = this.previewTheme ?? this.$store.getters['theme/theme']
          return this.$vuetify.theme.isDark ? theme.dark : theme.light
        },
    },
    methods: {
      updateVuetifyThemeColors (colors) {
        if (colors) {
          Object.keys(colors).forEach(k => {
            if (this.$vuetify.theme.isDark) {
              this.$vuetify.theme.themes.dark[k] = colors[k]
            } else {
              this.$vuetify.theme.themes.light[k] = colors[k]
            }
          })
        }
    },
    },
}
