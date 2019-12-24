import Vue from "vue";

export const state = () => ({
  program: {},
})

export const mutations = {
  setProgram(state, program) {
    for(let p of program) {
      Vue.set(state.program, p.id, p)
    }
  }
}

export const actions = {
  init(ctx){
    //do not return the promise to ensure that the program will loading in background!
    this.$axios.get(`/program.json`).then(response => {
      ctx.commit('setProgram', response.data)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
