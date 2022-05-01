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
        themeRoot () {
          return this.previewTheme ?? this.$store.getters['theme/theme']
        },
        theme () {
          return this.$vuetify.theme.isDark ? this.themeRoot.dark : this.themeRoot.light
        },
    },
    methods: {
      $dim (value) {
        if (typeof value === 'object') {
          switch (this.$vuetify.breakpoint.name) {
            case 'xs': return value.xs ?? value.default ?? value
            case 'sm': return value.sm ?? value.default ?? value
            case 'md': return value.md ?? value.default ?? value
            case 'lg': return value.lg ?? value.default ?? value
            case 'xl': return value.xl ?? value.default ?? value
          }
        }

        return value
      },
      $brush (value) {
        return value
      },
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
