// import Player from 'vue-simple-player'

// import {formatTime} from '@/js/components/utils'
import { mapState, mapGetters, mapActions } from 'vuex'
import axios from 'axios'
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
      loadData: 'loadData',
      setLrc : 'setLrc'
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

      // let songurl= `http://dl.stream.qqmusic.qq.com/C400${this.currentFile.songmid}/${this.currentFile.songid}.m4a?guid=263427534&fromtag=66`
      // this.$refs.audio.src = songurl
      //https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?g_tk=5381&jsonpCallback=MusicJsonCallback41947488562419744&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&cid=205361747&callback=MusicJsonCallback41947488562419744&uin=0&songmid=004b2hd01Ddhpl&filename=C400002EWz1t2pc6KC.m4a&guid=1044092206
      axios.get('/api/getVkey',{
        params:{
          g_tk:5381,
          //jsonpCallback:'MusicJsonCallback41947488562419744',

          loginUin:0,
          hostUin:0,
          format:'json',
          inCharset: 'utf-8',
          outCharset: 'utf-8',
          notice:0,
          platform:'yqq',
          needNewCode:0,
          cid:205361747,
          //callback:'MusicJsonCallback41947488562419744',
          uin:0,
          songmid:this.currentFile.songmid,
          filename:this.currentFile.filename,
          guid:1044092206
        }
      }).then(response=>{
        let songinfo =response.data.data.items[0]
        let songurl =
        `http://dl.stream.qqmusic.qq.com/${songinfo.filename}?vkey=${songinfo.vkey}&guid=1044092206&uin=0&fromtag=66`
        this.$refs.audio.src = songurl        
        //this.playPause()
        this.$refs.audio.oncanplay = ()=>{
          console.log("canplay")
          if(!this.paused){

            this.$refs.audio.play()
          }
        }
        
        // if(!this.paused){
        //   this.$refs.audio.oncanplay = ()=>{
        //     //this.$refs.audio.play()
        //   }
        // }
      })

      //this.$refs.audio.doPlayPause()
      // if(!this.lrc){
      //   console.log("获取歌词")
      //   this.setLrc()
      // }
      this.setLrc()
    },
    paused (to) {
      //console.log(this.paused)
      //console.log(this.$refs.audio)
      if(!to){
        this.$refs.audio.play()
        // this.$refs.audio.oncanplay = ()=>{
        //   this.$refs.audio.play()
        // }
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
    /* 默认载入 */
    this.loadData(26)
      .then(()=>{
        
        //  console.log("then")
          // this.playPause()
          //this.$refs.audio.doPlayPause()
          //console.log(this.$store.getters['list/currentMusicItem'].file)
          // this.$store.dispatch('player/playPause',{

          // })
      })




    /* 监听从播放页传来的调整音量 */
  }
}
