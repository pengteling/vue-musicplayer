
import {parseLrc} from '@/js/components/utils'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default{
  name: 'Lrc',
  data () {
    return {
      // currentTime: 0,
      // lrc: [],
      curli: 0
    }
  },
  computed:{
    ...mapGetters({
      // currentItem: 'currentMusicItem',
      lrc: 'lrc'
    }),
    ...mapState({
      currentTime : 'currentTime'
    })
  },
  watch:{
    currentItem (time) {
      if (time === 0) { this.curli = 0 }

      if (document.querySelector('.cur')) {
        // console.log(document.getElementById('cur').offsetTop)
        let h = document.querySelector('.cur').offsetTop - 143 - 200
        document.getElementById('lrcUl').scrollTop = h
      }
    }
  },
  mounted () {
    // EventBus.$on('lrcTime', (time) => {
    //   // console.log(time)
    //   this.currentTime = (time)
    //   if (time === 0) { this.curli = 0 }
    // })
    // EventBus.$on('sendLrc', (currentMusic) => {
    //   // console.log(currentMusic)
    this.curli = 0
    // if(this.currentItem){
    //   this.lrc = parseLrc(this.currentItem.lrc)
    // }

    //   // console.log('触电')
    // })
    // EventBus.$on('timeupdate',(t)=>{
    //   console.log(t)
    // })
  },
  updated () {
    if (document.querySelector('.cur')) {
      // console.log(document.getElementById('cur').offsetTop)
      let h = document.querySelector('.cur').offsetTop - 143 - 200
      document.getElementById('lrcUl').scrollTop = h
    }
  },
  render () {
    //console.log(this.lrc)
    let lrc =  parseLrc(this.lrc)
    //console.log(lrc)
    // let curTime = this.props.jPlayers.AudioPlayer.currentTimeText +'.'+ (this.props.jPlayers.AudioPlayer.currentTime+'').split('.')[1]
    // //console.log(curTime)
    // //let n=0
    let curClass = ''
    // //let prevTime=""
    let curTime = this.currentTime
    // console.log(this.lrc)
    let lrclist = lrc.map((item, i) => {
      // console.log(this.currentTime)
      // console.log(item[0])
      if (item[0] <= curTime && i >= this.curli) {
        curClass = 'cur'
        this.curli = i
      } else {
        curClass = 'normal'
      }
      // console.log(this.curli)
      // prevTime=item.time
      return (<li class={curClass} key={i} id={i} data-time={item[0]}> {item[1]} </li>)
    })
    return (
      <div class="lrc-component">
        <ul id="lrcUl" ref="lrcul">{lrclist}</ul>
      </div>
    )
  }
}
