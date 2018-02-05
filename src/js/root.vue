<template>
  <div>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import '@/assets/sass/comm.scss'
import Header from './components/Header.vue'

export default {
  components: {
    Header
  }
}
</script>
<style lang="scss">
body{
  margin:0
}
</style>

