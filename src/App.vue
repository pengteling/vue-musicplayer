<template>
  <div id="app">
    <router-view name="header"></router-view>
    <router-view name="Loadplayer"></router-view>
    <router-view/>
  </div>
</template>

<script>

import './assets/comm.scss'
export default {
  name: 'App'
}
</script>

<style lang="scss">

</style>
