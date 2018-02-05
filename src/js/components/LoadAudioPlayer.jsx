import Player from 'vue-simple-player'
import {EventBus} from '@/eventBus'
export default{
  components:{
    Player
  },  
  data(){
    return{
      opt:{

      }
    }
  },
  name:'LoadAudioPlayer',
  render(){
    return (
      <div>
        <player 
          opt={ this.opt }
          ref="audio" 
          onTimeupdate={this.timeupdate}

        />
      </div>
    )
  },
  methods:{
    timeupdate(currentTime){
      console.log(currentTime)
    }
  }
  ,
  mounted(){
    EventBus.$on('setMedia',currentItem => {
      // console.log(currentItem)
      // this.opt.url = currentItem.file
      this.$refs.audio.setSrc(currentItem.file)
    })
  }
}