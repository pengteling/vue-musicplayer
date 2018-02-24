// import Player from 'vue-simple-player'
import Player from './mplayer.vue'
// import {formatTime} from '@/js/components/utils'
import { mapState, mapGetters, mapActions } from 'vuex'

export default{
  components: {
    Player
  },
  data () {
    return {

    }
  },

  name: 'LoadAudioPlayer',
  render () {
    return (
      <div>
        <player
          opt={ this.opt }
          ref="audio"
          onTimeupdate={this.timeupdate}
          onLoadedmetadata = {this.loadedmetadata}
          onEnded = {this.ended}
          
        />
      </div>
    )
  },
  methods: {
    ...mapActions('player', {
      timeupdate: 'updateTime',
      loadedmetadata: 'getDuration',
      playPause: 'playPause'
    }),
    ...mapActions('list', {
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
    }

  },
  computed: {
    ...mapState('player', {
      paused: 'paused',
      volume: 'volume',
      currentTime : 'currentTime'
    }),
    ...mapGetters('player', [
      'currentPercentAbsolute',
      'leftTime'
    ]),
    ...mapGetters('list', [
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
      this.$refs.audio.setSrc(this.currentMusicItem.file)
      
      //this.$refs.audio.doPlayPause()
    },
    paused () {
      //console.log(this.paused)
      //console.log(this.$refs.audio)
      this.$refs.audio.doPlayPause()      
    },
    volume (volume) {
      this.$refs.audio.setVolume(volume)
    },
    currentTime (to, from) {
      // console.log(to)
      // console.log(from)
      /* 观察当前时间改变，大于阀值1则实际改变播放进度 */
      if(Math.abs(to - from) >1){
        this.$refs.audio.setCurrentTime(to)
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
