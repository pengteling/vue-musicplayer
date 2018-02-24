import {evil} from '@/js/components/utils'
const state = {

  musicList: [],
  currentIndex: 0,
  repeatType: 'cycle'

}
// const state = () => {
//   return {
//     musicList: [],
//     currentIndex: 0,
//     repeatType: 'cycle'
//   }
// }
const getters = {
  currentMusicItem: (state, getters) => {
    return state.musicList[state.currentIndex]
  },
  currentFile: (state, getters) => {
    return state.musicList[state.currentIndex] ? state.musicList[state.currentIndex].file : ''
  },
  lrc: (state, getters) => {
    return state.musicList[state.currentIndex] ? state.musicList[state.currentIndex].lrc : ''
  }
}

const actions = {
  loadData ({ commit }) {
    return fetch('http://music.henshui.com/api/musicList.js?!234')
      .then(response => response.text())
      .then(response => {
        let musicList = evil(response)
        commit('getMusicList', musicList)
      })
  },
  prevNext ({ commit }, type) {
    commit('prevNext', type)
  },
  changMusicItem ({ commit }, musicItem) {
    commit('changMusicItem', musicItem)
  },
  deleteMusicItem ({ commit }, musicItem) {
    commit('deleteMusicItem', musicItem)
  },
  changeRepeatType ({ commit }) {
    commit('changeRepeatType')
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
    let currentIndex = state.currentIndex
    let num = state.musicList.length
    let repeatType = state.repeatType
    if (repeatType === 'cycle' || repeatType === 'once') {
      if (type === 'prev') {
        currentIndex = (currentIndex - 1 + num) % num
      } else {
        currentIndex = (currentIndex + 1) % num
        // console.log(currentIndex)
      }
    // } else if (repeatType === 'once') {
    //   // 不变
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
  },
  changMusicItem (state, musicItem) {
    let currentIndex = state.musicList.indexOf(musicItem)
    state.currentIndex = currentIndex
  },
  deleteMusicItem (state, musicItem) {
    // if (state.musicList[state.currentIndex] === musicItem) {
    //   console.log('删除正在播放的歌曲')
    // }
    if (state.musicList.length > 1) {
      state.musicList = state.musicList.filter((item) => item !== musicItem)
    }
    /* 删除后因为list总数发生变化， currentIndex 重置 */
    let currentIndex = state.currentIndex % state.musicList.length
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
