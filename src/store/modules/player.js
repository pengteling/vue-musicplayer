import {formatTime} from '@/js/components/utils'
const state = {
  paused: true,
  volume: 0.8,
  currentTime: 0,
  duration: 0

}
const getters = {
  currentPercentAbsolute (state) {
    return state.currentTime / state.duration
  },
  leftTime (state) {
    return formatTime(state.duration - state.currentTime)
  }
}
const actions = {
  updateTime ({commit}, time) {
    commit('updateTime', time)
  },
  getDuration ({commit}, time) {
    commit('getDuration', time)
  }
}

const mutations = {
  updateTime (state, time) {
    state.currentTime = time
  },
  getDuration (state, time) {
    state.duration = time
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
