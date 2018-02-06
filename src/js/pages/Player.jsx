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
      currentPercentAbsolute: 0,
      volume: 0,
      paused:true,
      repeatType: 'cycle'
    }
  },
  computed:{
    repeatTypeStr(){
      switch (this.repeatType){
        case "cycle":
          return "顺序播放"
        case "once":
          return "单次循环"
        case "random":
          return "随机播放"
      }
    }
  },
  mounted () {
    EventBus.$on('setMedia', currentItem => {
      // console.log(currentItem)
      // this.opt.url = currentItem.file
      // this.$refs.audio.setSrc(currentItem.file)
      this.currentItem = currentItem
    })
    EventBus.$on('timeupdate', (leftTime, currentPercentAbsolute ,paused) => {
      this.leftTime = leftTime
      this.currentPercentAbsolute = currentPercentAbsolute
      this.paused = paused
    })
    /* 获取实际播放音量大小 */
    EventBus.$on('getVolume', (volume) => {
      this.volume = volume  *100    
      //console.log("getVolume")
    })
    /* 获取repeatType */
    EventBus.$on('changeRepeatType',(repeatType)=>{
      this.repeatType = repeatType
    })
  },
  // updated(){
  //   EventBus.$on('getVolume', (volume) => {
  //     this.volume = volume  *100    
  //   })
  // },
  methods:{
    changeVolume(volume){
      EventBus.$emit('changeVolume',volume)
    },
    changeProgress(progress){
      EventBus.$emit('changeProgress',progress)
    },
    playPause(){
      EventBus.$emit('playPause')
    },
    prevNext(type){ //type 为 prev或next
      EventBus.$emit('prevNext', type)
    },
    changeRepeatType(){
      EventBus.$emit('repeatType')
    }
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
                  <Progress progress={this.volume}  barColor="#2f9842" onChangeProgress = {this.changeVolume} />
                </div>
              </div>
            </div>
            <div style="height: 10px; line-height: 10px;">
              <Progress progress={this.currentPercentAbsolute }  barColor="#2f9842" onChangeProgress = {this.changeProgress} />
            </div>
            <div class="mt35 row">
              <div>
                <i class="icon prev" onClick = {this.prevNext.bind(this,"prev")}></i>
                <i class={`icon ml20 ${this.paused? "play":"icon ml20 pause"}`} onClick={this.playPause}></i>
                <i class="icon next ml20" onClick = {this.prevNext.bind(this,"next")}></i>
              </div>
              <div class="-col-auto">
                <i class= {`icon repeat-${this.repeatType}`} title={this.repeatTypeStr} onClick = {this.changeRepeatType}></i>
              </div>
            </div>
          </div>
          <div class="-col-auto cover">
            <a href="/lrc">
              <img class={this.paused?"pause":"play"} src={this.currentItem.cover}
                alt={this.currentItem.title} />
            </a>
          </div>
        </div>
      </div>

    )
  }
}
