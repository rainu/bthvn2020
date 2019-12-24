import Vue from 'vue'
import VueI18n from 'vue-i18n'
import i18n from '../i18n'

Vue.use(VueI18n)

export default ({app}) => {

  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    fallbackLocale: i18n.defaultLocale,
    messages: i18n.localeMappings
  })
}
