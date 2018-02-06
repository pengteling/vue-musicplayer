<template>
  <div id="app">
    <router-view name="header"></router-view>
    <router-view name="Loadplayer"></router-view>
    <router-view/>
  </div>
</template>

<script>
import {EventBus} from '@/eventBus'
import {MUSIC_LIST} from './data/MusicList'

export default {
  name: 'App',
  data () {
    return {
      musicList: MUSIC_LIST,
      currentItem: MUSIC_LIST[4],
      repeatType: 'cycle'
    }
  },
  mounted () {
    // console.log(this.$data)
    // EventBus.$emit('', this.$data)
    EventBus.$emit('setMedia', this.currentItem)
    // EventBus.$emit()
    EventBus.$on('prevNext', type => {
      console.log(type)
      this.pervNextHandler(type)
      EventBus.$emit('setMedia', this.currentItem)
    })
    // EventBus.$on('initRepeat')
    EventBus.$on('repeatType', () => {
      this.changeRepeatType()
      EventBus.$emit('changeRepeatType', this.repeatType)
    })
  },
  updated () {

  },
  methods: {
    pervNextHandler (type) {
      /* eslint-disable no-unused-vars */
      let currentIndex = this.musicList.indexOf(this.currentItem)
      let num = this.musicList.length
      let repeatType = this.repeatType
      if (repeatType === 'cycle') {
        if (type === 'prev') {
          currentIndex = (currentIndex - 1 + num) % num
        } else {
          currentIndex = (currentIndex + 1) % num
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
      this.currentItem = MUSIC_LIST[currentIndex]
    },
    changeRepeatType () {
      let oldRepeatType = this.repeatType
      let newRepeatType = 'cycle'
      if (oldRepeatType === 'cycle') {
        newRepeatType = 'once'
      } else if (oldRepeatType === 'once') {
        newRepeatType = 'random'
      }
      this.repeatType = newRepeatType
    }
  }
}
</script>

<style lang="scss">

</style>
