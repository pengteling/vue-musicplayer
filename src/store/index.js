import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  strict: debug,
  state: {
    musicList: [],
    currentIndex: 0,
    paused: true,
    volume: 0.8,
    currentTime: 0,
    duration: 0,
    repeatType: 'cycle'
  },
  getters: {},
  mutations: {},
  actions: {}
})
