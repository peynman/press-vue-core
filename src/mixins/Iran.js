import IranJSON from './iran.json'

export default {
  computed: {
    provinces () {
      return Object.keys(IranJSON).sort((a, b) => a.localeCompare(b)).map((c, index) => ({
        text: c,
        value: IranJSON[c].id,
        lat: IranJSON[c].lat,
        lng: IranJSON[c].lng,
        cities: IranJSON[c].cities,
      }))
    },
    cities () {
      return this.getCitiesForProvince(this.province?.value)
    },
  },
  methods: {
    getProvinceById (province) {
      return this.provinces?.find(p => parseInt(p.value) === parseInt(province))
    },
    getNormalizedCities (cities) {
      return cities?.sort((a, b) => a.name.localeCompare(b.name)).map((c, index) => ({
        text: c.name,
        value: c.id,
        lat: c.lat,
        lng: c.lng,
      })) ?? []
    },
    getCitiesForProvince (province) {
      if (province?.value !== undefined) {
        return this.getNormalizedCities(this.getProvinceById(province.value)?.cities)
      } else if (!isNaN(province)) {
        return this.getNormalizedCities(this.getProvinceById(province)?.cities)
      }
      return []
    },
    getCityById (province, city) {
      return this.getCitiesForProvince(province)?.find(c => parseInt(c.value) === parseInt(city))
    },
  },
}
