<template>
  <div class="hello">
    <h1>播放器</h1>
    <music-player
      :url = "url"
      :autoplay = "autoplay"
      ref = "player"
      :status = "status"
      :seekTime = "seekTime"
      @timeupdate = "timeupdate"
      @changeProgress = "changeProgress"

    >

    </music-player>
    <span class="play" @click="playPause">{{ status ==="play"? "pause":"play"}}</span>
  </div>
</template>

<script>
import MusicPlayer from './MusicPlayer/index'

export default {
  name: 'HelloWorld',
  components: {
    MusicPlayer
  },
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      autoplay: this.options.autoplay,
      status: this.options.status,
      url: this.options.url,
      currentTime: 0,
      seekTime: 0
    }
  },
  watch: {
    options (newVal, oldVal) {
      console.log(newVal)
      this.url = this.options.url
    }
  },
  methods: {
    playPause () {
      this.status = this.status === 'play' ? 'pause' : 'play'
    },
    timeupdate (time) {
      // console.log('timeupdate')
      this.currentTime = time
      this.seekTime = -1 // 设置跳转后马上置为-1 防止再次点击同样的进度无反应
      this.$emit('timeupdate', time)
    },
    changeProgress (time) {
      this.seekTime = time
    }
  },
  mounted () {
    // 自动播放
    if (this.autoplay) {
      this.status = 'play'
    }
    /// 直接调用子组件里面的方法
    // this.$refs.player.play()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
