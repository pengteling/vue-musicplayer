import Vue from 'vue'
import Vuex from 'vuex'
import {evil, formatTime} from '@/js/components/utils'
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
  getters: {
    currentMusicItem: (state, getters) => {
      return state.musicList[state.currentIndex]
    },
    currentFile: (state, getters) => {
      return state.musicList[state.currentIndex] ? state.musicList[state.currentIndex].file : ''
    },
    lrc: (state, getters) => {
      return state.musicList[state.currentIndex] ? state.musicList[state.currentIndex].lrc : ''
    },
    currentPercentAbsolute (state) {
      return state.currentTime / state.duration
    },
    leftTime (state) {
      return formatTime(state.duration - state.currentTime)
    }
  },
  mutations: {
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
    },
    updateTime (state, payload) {
      state.currentTime = payload.currentTime
    },
    getDuration (state, payload) {
      state.duration = payload.duration
    },
    playPause (state) {
      if (state.paused) {
        state.paused = false
      } else {
        state.paused = true
      }
    },
    changeVolume (state, volume) {
      state.volume = volume
    },
    changeProgress (state, progress) {
      // console.log(process)
      state.currentTime = state.duration * progress
    }
  },
  actions: {
    loadData ({ commit }) {
      // return fetch('http://music.henshui.com/api/musicList.js?!234')
      return fetch('/api/list', {
        method: 'GET',
        body: {
          g_tk: 5381,
          uin: 0,
          format: 'json',
          inCharset: 'utf-8',
          outCharset: 'utf-8',
          notice: 0,
          platform: 'h5',
          needNewCode: 1,
          tpl: 3,
          page: 'detail',
          type: 'top',
          topid: 26,
          _: new Date()
        }
      })
        .then(response => response.text())
        .then(response => {
          // console.log(response.songlist)
          let musicList = evil(response)
          console.log(musicList.songlist[0].data)
          // commit('getMusicList', musicList)
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
    },
    updateTime ({commit}, time) {
      commit('updateTime', time)
    },
    getDuration ({commit}, time) {
      commit('getDuration', time)
    },
    playPause ({commit}) {
      commit('playPause')
    },
    changeVolume ({commit}, volume) {
      commit('changeVolume', volume)
    },
    changeProgress ({commit}, progress) {
      commit('changeProgress', progress)
    }
  }
})
