<template>
  <div id="app">
    <router-view name="header"></router-view>
    <router-view name="Loadplayer"></router-view>
    <router-view/>
  </div>
</template>

<script>
import './assets/Comm.scss'
import {EventBus} from '@/eventBus'
import {MUSIC_LIST} from './data/MusicList'

export default {
  name: 'App',
  data () {
    return {
      musicList: MUSIC_LIST,
      currentItem: MUSIC_LIST[0],
      repeatType: 'cycle'
    }
  },
  mounted () {
    // console.log(this.$data)
    // EventBus.$emit('', this.$data)
    EventBus.$emit('setMedia', this.currentItem)
    // EventBus.$emit()
    EventBus.$on('prevNext', type => {
      console.log(type)
      this.pervNextHandler(type)
      EventBus.$emit('setMedia', this.currentItem)
    })
    // EventBus.$on('initRepeat')
    EventBus.$on('repeatType', () => {
      this.changeRepeatType()
      EventBus.$emit('changeRepeatType', this.repeatType)
    })
    // EventBus.$on('fetchData', () => {
    //   console.log('fetchData')
    // })
    /* List页获取数据 */
    EventBus.$emit('getList', this.$data)
    EventBus.$on('changeMusic', (currentItem) => {
      this.currentItem = currentItem
      /* List页获取数据 */
      EventBus.$emit('getList', this.$data)
    })
    EventBus.$on('deleteMusic', (currentItem) => {
      if (this.musicList.length > 1) {
        let currentIndex = this.musicList.indexOf(currentItem)
        this.musicList = this.musicList.filter((item) => (item !== currentItem))

        if (this.currentItem === currentItem) {
          // 默认播放 第一首
          // this.pervNextHandler('next')
          // console.log(this.musicList)
          currentIndex = currentIndex % this.musicList.length
          this.currentItem = this.musicList[currentIndex]
          EventBus.$emit('setMedia', this.currentItem)
        }
        EventBus.$emit('getList', this.$data)
      }
    })
    /* LRC页面获取数据 */
    EventBus.$emit('sendLrc', this.currentItem)
  },
  watch: {
    '$route' (to, from) {
      console.log(to.name)
      if (to.name === 'Player') {
      // EventBus.$emit('setMedia', this.currentItem)
      // console.log('test')
      /* 一定要异步，因为切换路由 子组件player 还未mounted则无法响应 $on('setDate') */

        setTimeout(() => EventBus.$emit('setData', this.currentItem, this.repeatType), 0)
      } else if (to.name === 'List') {
        setTimeout(() => EventBus.$emit('getList', this.$data), 0)
      } else if (to.name === 'Lrc') {
        setTimeout(() => EventBus.$emit('sendLrc', this.currentItem), 500)
      }
    },
    currentItem () {
      //  console.log('test')
      EventBus.$emit('sendLrc', this.currentItem)
    }
    // : 'fetchData' //改变路由后重新获取数据

  },
  // beforeRouteEnter (to, from, next) {
  //   console.log(to)
  // },
  methods: {
    pervNextHandler (type) {
      /* eslint-disable no-unused-vars */
      let currentIndex = this.musicList.indexOf(this.currentItem)
      // console.log(currentIndex)
      let num = this.musicList.length
      let repeatType = this.repeatType
      if (repeatType === 'cycle') {
        if (type === 'prev') {
          currentIndex = (currentIndex - 1 + num) % num
        } else {
          currentIndex = (currentIndex + 1) % num
          // console.log(currentIndex)
        }
      } else if (repeatType === 'once') {
        // 不变
      } else {
        /* 随机 */
        let rd = (currentIndex) => {
          let newIndex = Math.floor(Math.random() * num)
          if (newIndex === currentIndex) { // 保证随机后 不能与当前歌曲相同
            return rd(currentIndex)
          } else {
            return newIndex
          }
        }
        currentIndex = rd(currentIndex)
      }
      this.currentItem = this.musicList[currentIndex]
    },
    changeRepeatType () {
      let oldRepeatType = this.repeatType
      let newRepeatType = 'cycle'
      if (oldRepeatType === 'cycle') {
        newRepeatType = 'once'
      } else if (oldRepeatType === 'once') {
        newRepeatType = 'random'
      }
      this.repeatType = newRepeatType
    }
  }
}
</script>

<style lang="scss">

</style>
