<template>
  <div class="music-player">
    <audio
      :src="url"
      ref="audio"
      @timeupdate="timeupdate"
      @seektime = "seekTime"
    >
    </audio>

    <!-- <span class="play" @click="play">play</span>
    <span class="play" @click="play">play</span>
    <span class="play" @click="play">play</span> -->
  </div>
</template>
<script>

export default {
  props: {
    autoplay: {
      type: Boolean,
      required: false
    },
    url: {
      type: String,
      required: true
    },
    seekTime: {
      type: Number,
      required: false
    },
    status: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      // auto: this.autoplay
    }
  },
  methods: {
    play () {
      this.$refs.audio.play()
    },
    pause () {
      this.$refs.audio.pause()
    },
    timeupdate () {
      // console.log(this.$refs.audio.currentTime)
      this.$emit('timeupdate', this.$refs.audio.currentTime)
      // this.seekTime =
    }
  },
  mounted () {
    // console.log(this.autoplay)
    if (this.autoplay) {
      this.play()
      // console.log('autoplay')
    }
  },
  updated () {
    this.$nextTick(
      () => {
        // console.log(this.seekTime)
      }
    )
  },
  watch: {
    status (newVal, oldVal) {
      // console.log(newVal)
      newVal === 'play' ? this.play() : this.pause()
    },
    seekTime (newVal, oldVal) {
      if (newVal > 0) {
        this.$refs.audio.currentTime = newVal
      }
    },
    url (newVal, oldVal) {
      // console.log(newVal + 'audio')
      if (this.status === 'play') {
        this.$refs.audio.onloadeddata = () => this.$refs.audio.play() // 异步
      }
    }

  }

}
</script>
<style lang="scss" scoped>
audio{
  display: none
}
</style>
