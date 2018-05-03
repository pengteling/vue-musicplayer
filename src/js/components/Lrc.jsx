
import { parseLrc } from '@/js/components/utils'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import jsonp from 'jsonp'
import axios from 'axios'
export default {
  name: 'Lrc',
  data() {
    return {
      // currentTime: 0,
      // lrc: [],
      curli: 0
    }
  },
  computed: {
    ...mapGetters({
      // currentItem: 'currentMusicItem',
      lrc: 'lrc'
    }),
    ...mapState({
      currentTime: 'currentTime'
    })
  },
  methods:{
    ...mapActions([
      'setLrc'
    ])
  },
  watch: {
    currentTime(time) {
      if (time === 0) { this.curli = 0 }

      if (document.querySelector('.cur')) {
        // console.log(document.getElementById('cur').offsetTop)
        let h = document.querySelector('.cur').offsetTop - 143 - 200
        document.getElementById('lrcUl').scrollTop = h
      }

      /* 也可以在播放页面时获取 */
      // if(!this.lrc){
      //   console.log("获取歌词")
      //   this.setLrc()
      // }
    }
  },
  created() {
    console.log("获取歌词")
    if(!this.lrc){
      this.setLrc()
    }

        //   g_tk: 5381,
        //   uin: 0,
        //   format: 'jsonp',
        //   inCharset: 'utf-8',
        //   outCharset: 'utf-8',
        //   notice: 0,
        //   platform: 'h5',
        //   nobase64: 1,
        //   musicid: 4962990,
        //   songtype: 0,
        //   _: +new Date(),
        //   jsonpCallback: 'jsonp1'
        // }

  },
  mounted() {
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
  updated() {
    if (document.querySelector('.cur')) {
      // console.log(document.getElementById('cur').offsetTop)
      let h = document.querySelector('.cur').offsetTop - 143 - 200
      document.getElementById('lrcUl').scrollTop = h
    }
  },
  render() {
    //console.log(this.lrc)
    let lrc = parseLrc(this.lrc)
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
