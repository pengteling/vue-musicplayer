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
  },
  updated () {

  },
  methods: {
    pervNextHandler (type) {
      /* eslint-disable no-unused-vars */
      let currentIndex = this.musicList.indexOf(this.currentItem)
      let num = this.musicList.length
      let repeatType = this.repeatType
      if (repeatType === 'cycle' || repeatType === 'once') {
        if (type === 'prev') {
          currentIndex = (currentIndex - 1 + num) % num
        } else {
          currentIndex = (currentIndex + 1) % num
        }
      } else {
        currentIndex = Math.floor(Math.random() * num)
      }
    }
  }
}
</script>

<style lang="scss">

</style>
