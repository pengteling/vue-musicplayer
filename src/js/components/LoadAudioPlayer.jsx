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
      duration: 0
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

        />
      </div>
    )
  },
  methods: {
    timeupdate (currentTime) {
      // console.log(currentTime)
      this.currentTime = currentTime
      EventBus.$emit('timeupdate', this.leftTime, this.currentPercentAbsolute)
    },
    loadedmetadata (duration) {
      this.duration = duration
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
  }
}
