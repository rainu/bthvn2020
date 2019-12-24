import Vuex from "vuex";
import i18n from './i18n'
import program from './program'
import favorites from './favorites'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      i18n, program, favorites
    },
  })
}

export default createStore;
