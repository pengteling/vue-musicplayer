// import Player from 'vue-simple-player'

// import {formatTime} from '@/js/components/utils'
import { mapState, mapGetters, mapActions } from 'vuex'

export default{  
  data () {
    return {
    }
  },

  name: 'LoadAudioPlayer',
  render () {
    return (
      <div>
        <audio          
          ref="audio"
          onTimeupdate={this.timeupdate}
          onLoadedmetadata = {this.loadedmetadata}
          onEnded = {this.ended}                
        />
      </div>
    )
  },
  methods: {
    ...mapActions({
      //timeupdate: 'updateTime',
      //loadedmetadata: 'getDuration',
      playPause: 'playPause',
      prevNext:'prevNext'
    }),
    ...mapActions({
      loadData: 'loadData'
    }),
    getVolume (volume) {
      this.$refs.audio.getVolume(volume)
    },
    /* 子组件的播放停止触发 */
    ended () {
      // console.log("ended")
      // 继续下一首
      // EventBus.$emit('prevNext', 'next')
      this.$store.dispatch('prevNext', 'next')
    },
    timeupdate(){
      this.$store.dispatch('updateTime', {
        currentTime: this.$refs.audio.currentTime
      })
    },
    loadedmetadata(){
      this.$store.dispatch('getDuration', {
        duration: this.$refs.audio.duration
      })
    }

  },
  computed: {
    ...mapState({
      paused: 'paused',
      volume: 'volume',
      currentTime : 'currentTime'
    }),
    ...mapGetters([
      'currentPercentAbsolute',
      'leftTime'
    ]),
    ...mapGetters([
      'currentMusicItem',
      'currentFile'
    ]),
    // ...mapGetters('list', {
    //   currentFile: this.$store.getters['list/currentMusicItem'].file
    // })
    // currentFile: currentMusicItem.file
  },
  watch: {
    currentFile () {
      console.log("发生变化")
      this.$refs.audio.src = this.currentMusicItem.file
      if(!this.paused){
        this.$refs.audio.play()
      }
      //this.$refs.audio.doPlayPause()
    },
    paused () {
      //console.log(this.paused)
      //console.log(this.$refs.audio)
      if(this.$refs.audio.paused){
        this.$refs.audio.play()      
      }else{
        this.$refs.audio.pause()      
      }
    },
    volume (volume) {
      this.$refs.audio.volume = volume
    },
    currentTime (to, from) {
      // console.log(to)
      // console.log(from)
      /* 观察当前时间改变，大于阀值1则实际改变播放进度 */
      if(Math.abs(to - from) >1){
        this.$refs.audio.currentTime = to
      }
    }
  },

  mounted () {

    this.loadData()
      .then(()=>{
        //  console.log("then")
          this.playPause()
          //this.$refs.audio.doPlayPause()
          //console.log(this.$store.getters['list/currentMusicItem'].file)
          // this.$store.dispatch('player/playPause',{
            
          // })
      })
      
    
    

    /* 监听从播放页传来的调整音量 */
  }
}
