import Progress from '@/js/components/Progress.jsx'
import './Player.scss'
import {EventBus} from '@/eventBus'
export default {
  name: 'Player',
  components: {
    Progress
  },
  data () {
    return {
      currentItem: {},
      leftTime: '',
      currentPercentAbsolute: 0
    }
  },
  mounted () {
    EventBus.$on('setMedia', currentItem => {
      // console.log(currentItem)
      // this.opt.url = currentItem.file
      // this.$refs.audio.setSrc(currentItem.file)
      this.currentItem = currentItem
    })
    EventBus.$on('timeupdate', (leftTime, currentPercentAbsolute) => {
      this.leftTime = leftTime
      this.currentPercentAbsolute = currentPercentAbsolute
    })
  },
  render () {
    return (
      <div class="player-page">
        <h1 class="caption">
          <a href="/list">我的私人音乐坊 &gt;</a>
        </h1>
        <div class="mt20 row">
          <div class="controll-wrapper">
            <h2 class="music-title">
              <a href="/lrc">{this.currentItem.title}</a>
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
                  <Progress progress={this.currentPercentAbsolute * 100} barColor="#2f9842" />
                </div>
              </div>
            </div>
            <div style="height: 10px; line-height: 10px;">
              <div class="components-progress">
                <div class="progress" style="width: 61.4333%; background: rgb(47, 152, 66);"></div>
              </div>
            </div>
            <div class="mt35 row">
              <div>
                <i class="icon prev"></i>
                <i class="icon ml20 pause"></i>
                <i class="icon next ml20"></i>
              </div>
              <div class="-col-auto">
                <i class="icon repeat-cycle"></i>
              </div>
            </div>
          </div>
          <div class="-col-auto cover">
            <a href="/lrc">
              <img class="play" src={this.currentItem.cover}
                alt={this.currentItem.title} />
            </a>
          </div>
        </div>
      </div>

    )
  }
}
