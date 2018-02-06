import React from 'react'

class Lrc extends React.Component{
  constructor(props){
    super(props)
  }
  componentWillMount(){
    //console.log('componentWillMount')
    let arr = this.props.list.currentMusicItem.lrc.split("[")
    let lrc = arr.map((item,i)=>{
      return {
        time: item.split("]")[0],
        txt:item.split("]")[1],
        time_end: arr[i+1]?arr[i+1].split("]")[0]:undefined
      }
    })
    lrc.shift()
    this.lrc = lrc
    //console.log(lrc)

  }
  componentWillRecieveProps(nextProps){

  }
  componentWillUpdate(nextProps){
    //console.log(this.props.jPlayers.AudioPlayer.currentTime)
    //console.log(this.props.jPlayers.AudioPlayer.currentTimeText)
    //在歌词页 下一首后也需要更新歌词
    if(nextProps.list.currentMusicItem != this.props.list.currentMusicItem){
      let arr = nextProps.list.currentMusicItem.lrc.split("[")
      let lrc = arr.map((item,i)=>{
        return {
          time: item.split("]")[0],
          txt:item.split("]")[1],
          time_end: arr[i+1]?arr[i+1].split("]")[0]:undefined
        }
      })
      lrc.shift()
      this.lrc = lrc
      console.log(lrc)
    }


  }
  componentDidUpdate(){
    if(document.getElementById('cur')){
      //console.log(document.getElementById('cur').offsetTop)
      let h = document.getElementById('cur').offsetTop -143 -200
      document.getElementById('lrcUl').scrollTop = h
    }


    //console.log(document.getElementById('cur').offsetTop)
    // document.getElementById('cur').offsetTop
  }
  render(){
    //console.log(this.props)
    let curTime = this.props.jPlayers.AudioPlayer.currentTimeText +'.'+ (this.props.jPlayers.AudioPlayer.currentTime+'').split('.')[1]
    //console.log(curTime)
    //let n=0
    let curClass=""
    //let prevTime=""
    let lrclist= this.lrc.map((item,i) => {

        if((item.time_end>=curTime||!item.time_end) && item.time<=curTime){
          curClass="cur"
          this.curli =i

        }else{
          curClass="normal"
        }
         //prevTime=item.time
      return( <li className={curClass} id={curClass} key={i} > {item.txt} </li>)
    })
    return(
      <div className="lrc-component">
        <ul id="lrcUl" ref={(node)=>{this.lrcUl = node}}>{lrclist}</ul>
      </div>
    )
  }

}
export default Lrc