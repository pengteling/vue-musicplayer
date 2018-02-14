import {evil} from '@/js/components/utils'
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
  loadData ({ commit }) {
    fetch('http://music.henshui.com/api/musicList.js?!234')
      .then(response => response.text())
      .then(response => {
        let musicList = evil(response)
        commit('getMusicList', musicList)
      })
  }
}
const mutations = {
  getMusicList (state, musicList) {
    state.musicList = musicList
  },
  changeRepeatType (state) {
    let oldRepeatType = state.repeatType
    let newRepeatType = 'cycle'
    if (oldRepeatType === 'cycle') {
      newRepeatType = 'once'
    } else if (oldRepeatType === 'once') {
      newRepeatType = 'random'
    }
    state.repeatType = newRepeatType
  },
  prevNext (state, type) {
    let currentIndex
    let num = state.musicList.length
    let repeatType = state.repeatType
    if (repeatType === 'cycle') {
      if (type === 'prev') {
        currentIndex = (currentIndex - 1 + num) % num
      } else {
        currentIndex = (currentIndex + 1) % num
        // console.log(currentIndex)
      }
    } else if (repeatType === 'once') {
      // 不变
    } else {
      /* 随机 */
      let rd = (currentIndex) => {
        let newIndex = Math.floor(Math.random() * num)
        if (newIndex === currentIndex) { // 保证随机后 不能与当前歌曲相同
          return rd(currentIndex)
        } else {
          return newIndex
        }
      }
      currentIndex = rd(currentIndex)
    }
    state.currentIndex = currentIndex
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
