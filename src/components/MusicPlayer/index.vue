<template>
  <audio
    :src="MusicList[0].file"
    :autoplay="auto"
    controls

  >
  </audio>
</template>
<script>
import {MUSIC_LIST} from '@/data/MusicList.js'
console.log(MUSIC_LIST)
export default {
  props: {
    autoplay: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      MusicList: MUSIC_LIST,
      auto: this.autoplay
    }
  },
  methods: {

  },
  mounted () {
    console.log(this.autoplay)
  }

}
</script>
<style lang="scss" scoped>
audio{
  display: none
}
</style>
