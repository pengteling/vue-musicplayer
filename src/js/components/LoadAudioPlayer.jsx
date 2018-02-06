import Player from 'vue-simple-player'
import {EventBus} from '@/eventBus'
import {formatTime} from '@/js/components/utils'
export default{
  components: {
    Player
  },
  data () {
    return {
      opt: {
      },
      currentTime: 0,
      duration: 0,
      volume: 80,
      paused:true
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
    timeupdate (currentTime) {
      // console.log(currentTime)
      this.currentTime = currentTime
      this.paused = this.$refs.audio.getPaused()
      EventBus.$emit('timeupdate', this.leftTime, this.currentPercentAbsolute ,this.paused)
    },
    loadedmetadata (duration) {
      this.duration = duration
      this.volume = this.$refs.audio.getVolume()
      EventBus.$emit('getVolume', this.volume)
      //console.log(this.$refs.audio.getPaused())
    },
    getVolume(volume){
      this.$refs.audio.getVolume(volume)
    },
    /* 子组件的播放停止触发 */
    ended(){
      //console.log("ended")
      //继续下一首
      EventBus.$emit('prevNext','next')

    }
    
   
  },
  computed: {
    currentPercentAbsolute () {
      return (this.currentTime / this.duration * 100)
    },
    leftTime () {
      return formatTime(this.duration - this.currentTime)
    }

  },

  mounted () {
    EventBus.$on('setMedia', currentItem => {
      // console.log(currentItem)
      // this.opt.url = currentItem.file
      this.$refs.audio.setSrc(currentItem.file)
    })
    /* 监听从播放页传来的调整音量 */
    EventBus.$on('changeVolume',volume =>{      
      //执行音量调整
      this.$refs.audio.setVolume(volume) 
      //将返回的页面再通过事件总线传递回播放页
      EventBus.$emit('getVolume',volume)
    })
    /* 监听从播放页传来的进度调节 */
    EventBus.$on('changeProgress',progress =>{      
      //执行音量调整
      this.$refs.audio.setCurrentTime(progress * this.duration) 
      //timeupdate时会自动回传回播放页 
      //暂停时还是需要回传一次
      EventBus.$emit('timeupdate', this.leftTime, this.currentPercentAbsolute)
      
    })
    /* 监听 播放暂停事件 */
    EventBus.$on('playPause',()=>{
      this.$refs.audio.doPlayPause()
    })    
  }
}
