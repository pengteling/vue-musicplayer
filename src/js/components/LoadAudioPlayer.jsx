import Player from 'vue-simple-player'
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
          opt={ {} }
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
      loadedmetadata: 'getDuration'
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
    ...mapGetters('player', [
      'currentPercentAbsolute',
      'leftTime'
    ]),
    ...mapGetters('list', {
      opt: 'currentMusicItem'
    })

  },

  mounted () {
    this.loadData()

    /* 监听从播放页传来的调整音量 */
  }
}
