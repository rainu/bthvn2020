import Vue from 'vue'

export const state = () => ({
  favorites: {},
})

export const mutations = {
  setFavorites(state, favorites) {
    for(let f of favorites) {
      Vue.set(state.favorites, f.id, f)
    }
  },
  addFavorite(state, favorite) {
    Vue.set(state.favorites, favorite.id, favorite)
    this.$localStore.setFavorite(favorite.id, favorite)
  },
  removeFavorite(state, favoriteId){
    Vue.delete(state.favorites, favoriteId)
    this.$localStore.removeFavorite(favoriteId)
  },
}

export const actions = {
  init(ctx){
    return this.$localStore.getAllFavorites()
      .then(favorites => {
        return ctx.commit('setFavorites', favorites)
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
