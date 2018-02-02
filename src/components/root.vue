<template>
  <div class="music-player" >
    <music-player :options='opt' ref="m1" @timeupdate="timeupdate"></music-player>
    <span @click="changeProgress(100)">改变进度</span>
    <ul>
      <li v-for="item in MUSIC_LIST" :id="item.id" :key="item.id" @click="select(item)">
        {{item.title}}
      </li>
    </ul>
  </div>
</template>
<script>
import MusicPlayer from './MusicPlayer'
import { MUSIC_LIST } from '@/data/MusicList.js'
let url = MUSIC_LIST[0].file
export default {
  components: {
    MusicPlayer
  },
  data () {
    return {
      // MUSIC_LIST: MUSIC_LIST,
      // currentItem: MUSIC_LIST[0],
      MUSIC_LIST: MUSIC_LIST,
      opt: {
        url: url,
        autoplay: false,
        status: 'pause',
        volume: 80
      }
    }
  },
  methods: {
    changeProgress (time) {
      this.$refs.m1.changeProgress(time)
    },
    select (item) {
      console.log(item)
      this.currentItem = item
      this.opt = {...this.opt, url: this.currentItem.file}
    },
    timeupdate (time) {
      console.log(time)
    }
  }
}
</script>

<style>
</style>
