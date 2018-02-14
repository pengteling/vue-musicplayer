// import {EventBus} from '@/eventBus'
export default{
  props: {
    musicItem: {
      type: Object,
      required: true
    },
    focus: {
      type: Boolean
    }
  },
  name: 'MusicItem',
  mounted () {
    // console.log(this.focus)
  },

  methods: {
    changMusicItem (musicItem) {
      console.log(musicItem.title)
      EventBus.$emit('setMedia', musicItem)
      EventBus.$emit('changeMusic', musicItem)
    },
    deleteMusicItem (musicItem) {
      EventBus.$emit('deleteMusic', musicItem)
    }
  },
  render () {
    return (
      <li class={`components-listitem row ${this.focus ? 'focus' : ''}`} onClick={() => {
        if (!this.focus) // 防止点击当前歌曲 重新开始
        { this.changMusicItem(this.musicItem) }
      }}>
        <p>{this.musicItem.title} - {this.musicItem.artist}</p>
        <p class="lrclink -col1"><router-link to="/lrc">歌词</router-link></p>
        <p class="-col-auto delete" onClick={(e) => {
          e.stopPropagation()
          return this.deleteMusicItem(this.musicItem)
        }}></p>
      </li>
    )
  }

}
