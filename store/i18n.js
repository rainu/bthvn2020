import i18n from '../i18n'

export const state = () => ({
  locales: i18n.locales,
  locale: i18n.defaultLocale
})

export const mutations = {
  setLang(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
