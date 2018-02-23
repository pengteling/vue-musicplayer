import Progress from '@/js/components/Progress.jsx'
import './Player.scss'

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Player',
  components: {
    Progress
  },
  data () {
    return {
      // currentItem: {},
      // leftTime: '',
      // currentPercentAbsolute: 0,
      // volume: 0,
      // paused: true,
      // repeatType: 'cycle'
    }
  },
  computed: {
    ...mapState('player', {
      volume: state => state.volume,
      paused: 'paused'

    }),
    ...mapState('list', {
      repeatType: state => state.repeatType
    }),
    ...mapGetters('player', {
      leftTime: 'leftTime',
      currentPercentAbsolute: 'currentPercentAbsolute'
    }),
    ...mapGetters('list', {
      currentItem: 'currentMusicItem'
    })
  },
  mounted () {

  },

  methods: {
    ...mapActions('player', {
      playPause: 'playPause'
    }),
    ...mapActions('list',{
      prevNext: 'prevNext'
    }),    
    changeVolume () {

    },
    changeProgress () {

    },
    // playPause () {

    // },
    changeRepeatType () {

    }
  },
  render () {
    // console.log(this.currentItem)
    if (!this.currentItem) return
    return (
      <div class="player-page">
        <h1 class="caption">
          <router-link to = {{path: '/list'}}>我的私人音乐坊 &gt;</router-link>
        </h1>
        <div class="mt20 row">
          <div class="controll-wrapper">
            <h2 class="music-title">
              <router-link to = {{path: '/lrc'}}>{this.currentItem.title}</router-link>
            </h2>
            <h3 class="music-artist mt10">{this.currentItem.artist}</h3>
            <div class="row mt20">
              <div class="left-time -col-auto">-{this.leftTime}</div>
              <div class="volume-container">
                <i class="icon-volume rt" style="top: 5px; left: -5px;"></i>
                <div class="volume-wrapper">
                  {/* <div class="components-progress">
                    <div class="progress" style="width: 80%; background: rgb(170, 170, 170);"></div>
                  </div> */}
                  <Progress progress={this.volume * 100} barColor="#2f9842" onChangeProgress = {this.changeVolume} />
                </div>
              </div>
            </div>
            <div style="height: 10px; line-height: 10px;">
              <Progress progress={this.currentPercentAbsolute * 100 } barColor="#2f9842" onChangeProgress = {this.changeProgress} />
            </div>
            <div class="mt35 row">
              <div>
                <i class="icon prev" onClick = {this.prevNext.bind(this, 'prev')}></i>
                <i class={`icon ml20 ${this.paused ? 'play' : 'icon ml20 pause'}`} onClick={this.playPause}></i>
                <i class="icon next ml20" onClick = {this.prevNext.bind(this, 'next')}></i>
              </div>
              <div class="-col-auto">
                <i class= {`icon repeat-${this.repeatType}`} title={this.repeatTypeStr} onClick = {this.changeRepeatType}></i>
              </div>
            </div>
          </div>
          <div class="-col-auto cover">
            <router-link to="/lrc">
              <img class={this.paused ? 'pause' : 'play'} src={this.currentItem.cover}
                alt={this.currentItem.title} />
            </router-link>
          </div>
        </div>
      </div>

    )
  }
}
