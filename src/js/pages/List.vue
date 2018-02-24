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
import { mapState, mapGetters } from 'vuex'
// import {EventBus} from '@/eventBus'
import MusicItem from '@/js/components/MusicItem.jsx'
export default {
  components: {
    MusicItem
  },
  computed: {
    ...mapState('list', {
      musicList: 'musicList'
    }),
    ...mapGetters('list', {
      currentItem: 'currentMusicItem'
    })
  },
  mounted () {

  }

}
</script>
