<template>
  <div class="music-player">
    <audio
      :src="MusicList[0].file"
      :autoplay="auto"
      controls
      ref="audio"
    >
    </audio>
    <span class="play" @click="play">play</span>
    <!-- <span class="play" @click="play">play</span>
    <span class="play" @click="play">play</span>
    <span class="play" @click="play">play</span> -->
  </div>  
</template>
<script>
import {MUSIC_LIST} from '@/data/MusicList.js'
console.log(MUSIC_LIST)
export default {
  props: {
    autoplay: {
      type: Boolean,
      required: false
    },
    status:{
      type:String,
      required:false
    }
  },
  data () {
    return {
      MusicList: MUSIC_LIST,
      auto: this.autoplay
    }
  },
  methods: {
    play(){
      this.$refs.audio.play()
    }
  },
  mounted () {
    console.log(this.autoplay)
  },
  watch:{
    
  }

}
</script>
<style lang="scss" scoped>
audio{
  display: none
}
</style>
