import Vue from 'vue'
import Vuex from 'vuex'
import list from './modules/list'
import player from './modules/player'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  namespaced: true,
  modules: {
    list,
    player
  },
  strict: debug
})
