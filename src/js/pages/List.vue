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
import { mapState, mapGetters, mapActions } from 'vuex'
// import {EventBus} from '@/eventBus'
import MusicItem from '@/js/components/MusicItem.jsx'
export default {
  components: {
    MusicItem
  },
  computed: {
    ...mapState({
      musicList: 'musicList'
    }),
    ...mapGetters({
      currentItem: 'currentMusicItem'
    })
  },
  methods: {
    ...mapActions(['loadData'])
  },
  watch: {
    '$route.params.id' () {
      if (this.$route.params.id) {
        console.log(this.$route.params.id)
        this.loadData(this.$route.params.id)
      }
    }
  }
}
</script>
