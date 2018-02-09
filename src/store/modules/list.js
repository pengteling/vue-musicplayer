const state = {
  musicList: {},
  currentIndex: 0,
  repeatType: 'cycle'
}
const getters = {
  currentMusicItem: (state, getters) => {
    return state.musicList[state.currentIndex]
  }
}
const actions = {

}

export default {
  state,
  getters,
  actions,
  mutations
}
