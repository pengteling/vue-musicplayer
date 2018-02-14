<template>
  <div>
    <ul>
      <MusicItem
        v-for="item in musicList"
        :key="item.id"
        :focus="item === currentItem"
        :musicItem ="item"
      />
    </ul>

  </div>
</template>

<script>
import './List.scss'
// import {EventBus} from '@/eventBus'
import MusicItem from '@/js/components/MusicItem.jsx'
export default {
  components: {
    MusicItem
  },
  data () {
    return {
      currentItem: {},
      musicList: {}
    }
  },
  mounted () {
    EventBus.$on('getList', (props) => {
      // console.log(currentItem)
      // this.currentItem = currentItem
      // console.log(props)
      this.currentItem = props.currentItem
      this.musicList = props.musicList
    })
  }

}
</script>
