import {EventBus} from '@/eventBus'
import {formatTimeStr,parseLrc} from '@/js/components/utils'
export default{
  name:'Lrc',
  data(){
    return{
      currentTime:0
    }
  },
  mounted(){
    EventBus.$on('lrcTime', (time)=>{
      //console.log(time)
      this.currentTime = formatTimeStr(time)
    })
    // EventBus.$on('timeupdate',(t)=>{
    //   console.log(t)
    // })
  },
  render(){
    //console.log(this.props)
    // let curTime = this.props.jPlayers.AudioPlayer.currentTimeText +'.'+ (this.props.jPlayers.AudioPlayer.currentTime+'').split('.')[1]
    // //console.log(curTime)
    // //let n=0
    // let curClass=""
    // //let prevTime=""
    // let lrclist= this.lrc.map((item,i) => {

    //     if((item.time_end>=curTime||!item.time_end) && item.time<=curTime){
    //       curClass="cur"
    //       this.curli =i

    //     }else{
    //       curClass="normal"
    //     }
    //      //prevTime=item.time
    //   return( <li className={curClass} id={curClass} key={i} > {item.txt} </li>)
    // })
    return(
      <div className="lrc-component">
        {/* <ul id="lrcUl" ref={(node)=>{this.lrcUl = node}}>{lrclist}</ul> */}
      </div>
    )
  }
}